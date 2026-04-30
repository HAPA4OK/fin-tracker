const fs = require('fs');
const path = require('path');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const { Decimal128 } = mongoose.Types;
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const multer = require('multer');

dotenv.config({ path: path.resolve(__dirname, '../.env') });

const app = express();
app.use(cors({
  origin: 'http://localhost:5173', // Порт вашего Vite/React
  exposedHeaders: ['Content-Disposition'] // Пропуск для заголовка с именем файла
}));
app.use(bodyParser.json());

mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log('Connected to MongoDB Atlas');
    return syncUploadsDirectoryToMongo();
  })
  .then(() => {
    watchUploadsDirectory();
    console.log('Uploads directory sync is enabled');
  })
  .catch((err) => console.error('Connection error:', err));

const userSchema = new Schema({
  fullname: { type: String, trim: true },
  login: { type: String, trim: true, required: true, unique: true },
  email: { type: String, trim: true, lowercase: true, required: true, unique: true },
  password: String,
  gender: String,
});

const User = mongoose.model('User', userSchema);

const transactionSchema = new Schema({
  date: Date,
  amount: Decimal128,
  balance: Decimal128,
  category: String,
  bank: String,
  commentary: String,
});

const fileSchema = new mongoose.Schema({
  originalName: { type: String, required: true },
  filename: { type: String, required: true },
  path: { type: String, required: true },
  mimetype: { type: String, required: true },
  size: { type: Number, required: true },
  uploadDate: { type: Date, default: Date.now },
});

const FileModel = mongoose.models.File || mongoose.model('File', fileSchema);

const uploadsDir = path.resolve(__dirname, '../uploads');
fs.mkdirSync(uploadsDir, { recursive: true });

function getModelbyCategoryName(categoryName) {
  return mongoose.models[categoryName] || mongoose.model(categoryName, transactionSchema, categoryName);
}

function buildSafePdfName(originalName) {
  const extension = path.extname(originalName).toLowerCase() || '.pdf';
  const baseName = path.basename(originalName, path.extname(originalName))
    .toLowerCase()
    .replace(/[^a-z0-9-_]+/g, '-')
    .replace(/^-+|-+$/g, '') || 'file';

  return `${Date.now()}-${baseName}${extension}`;
}

function isPdfFileName(fileName) {
  return path.extname(fileName).toLowerCase() === '.pdf';
}

async function syncFileToMongo(fileName) {
  if (!fileName || !isPdfFileName(fileName)) {
    return null;
  }

  const absolutePath = path.join(uploadsDir, fileName);
  if (!fs.existsSync(absolutePath)) {
    return null;
  }

  const stats = fs.statSync(absolutePath);
  if (!stats.isFile()) {
    return null;
  }

  const existingFile = await FileModel.findOne({ path: absolutePath });
  if (existingFile) {
    return existingFile;
  }

  return FileModel.create({
    originalName: fileName,
    filename: fileName,
    path: absolutePath,
    mimetype: 'application/pdf',
    size: stats.size,
    uploadDate: stats.birthtime || new Date(),
  });
}

async function syncUploadsDirectoryToMongo() {
  const files = fs.readdirSync(uploadsDir);

  for (const fileName of files) {
    try {
      await syncFileToMongo(fileName);
    } catch (error) {
      console.error(`Sync Error for ${fileName}:`, error);
    }
  }
}

function watchUploadsDirectory() {
  fs.watch(uploadsDir, async (_eventType, fileName) => {
    try {
      await syncFileToMongo(fileName);
    } catch (error) {
      console.error(`Watch Error for ${fileName}:`, error);
    }
  });
}

const storage = multer.diskStorage({
  destination: (_req, _file, cb) => {
    cb(null, uploadsDir);
  },
  filename: (_req, file, cb) => {
    cb(null, buildSafePdfName(file.originalname));
  },
});

const upload = multer({
  storage,
  fileFilter: (_req, file, cb) => {
    const isPdfMime = file.mimetype === 'application/pdf';
    const isPdfExt = path.extname(file.originalname).toLowerCase() === '.pdf';

    if (!isPdfMime || !isPdfExt) {
      return cb(new Error('Разрешены только PDF-файлы'));
    }

    cb(null, true);
  },
  limits: {
    fileSize: 20 * 1024 * 1024,
  },
});

app.post('/register', async (req, res) => {
  try {
    const { fullname, login, email, password, gender } = req.body;

    if (!fullname || !login || !email || !password || !gender) {
      return res.status(400).json({ message: 'Все поля обязательны для заполнения' });
    }

    const cleanLogin = login.trim();
    const cleanEmail = email.toLowerCase().trim();
    const existingUser = await User.findOne({
      $or: [{ login: cleanLogin }, { email: cleanEmail }],
    });

    if (existingUser) {
      return res.status(400).json({ message: 'Логин или email уже заняты' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      fullname: fullname.trim(),
      login: cleanLogin,
      email: cleanEmail,
      password: hashedPassword,
      gender,
    });

    await newUser.save();
    res.status(201).json({ message: 'Пользователь успешно зарегистрирован' });
  } catch (error) {
    console.error('Registration Error:', error);
    res.status(500).json({ message: 'Ошибка сервера при регистрации' });
  }
});

app.post('/login', async (req, res) => {
  try {
    const { login, password } = req.body;

    if (!login || !password) {
      return res.status(400).json({ message: 'Логин и пароль обязательны' });
    }

    const user = await User.findOne({ login: login.trim() });
    if (!user) {
      return res.status(400).json({ message: 'Неверный логин или пароль' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Неверный логин или пароль' });
    }

    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '24h' });
    res.json({ token });
  } catch (error) {
    console.error('Login Error:', error);
    res.status(500).json({ message: 'Ошибка сервера при входе' });
  }
});

app.post('/files/upload', upload.single('file'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: 'Файл не был загружен' });
    }

    const savedFile = await syncFileToMongo(req.file.filename);

    res.status(201).json({
      message: 'PDF-файл успешно загружен',
      file: savedFile,
    });
  } catch (error) {
    console.error('Upload Error:', error);
    res.status(500).json({ message: 'Ошибка сервера при сохранении файла' });
  }
});

app.get('/files', async (_req, res) => {
  try {
    const files = await FileModel.find().sort({ uploadDate: -1 }).lean();
    res.json(files);
  } catch (error) {
    console.error('Files List Error:', error);
    res.status(500).json({ message: 'Не удалось получить список файлов' });
  }
});

app.get('/files/:id/download', async (req, res) => {
  try {
    const file = await FileModel.findById(req.params.id);

    if (!file) {
      return res.status(404).json({ message: 'Файл не найден в базе данных' });
    }

    if (!fs.existsSync(file.path)) {
      return res.status(404).json({ message: 'Файл отсутствует в uploads' });
    }

    res.download(file.path, file.originalName);
  } catch (error) {
    console.error('Download Error:', error);
    res.status(500).json({ message: 'Не удалось скачать файл' });
  }
});

app.use((error, _req, res, _next) => {
  if (error instanceof multer.MulterError) {
    return res.status(400).json({ message: error.message });
  }

  if (error) {
    return res.status(400).json({ message: error.message || 'Ошибка обработки файла' });
  }

  res.status(500).json({ message: 'Внутренняя ошибка сервера' });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Test server is running on http://localhost:${PORT}`);
});
