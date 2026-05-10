const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const FileModel = require('../models/File');


const uploadsDir = path.resolve(__dirname, '../uploads');
if (!fs.existsSync(uploadsDir)) fs.mkdirSync(uploadsDir, { recursive: true });


function buildSafePdfName(originalName) {
    const extension = path.extname(originalName).toLowerCase() || '.pdf';
    const baseName = path.basename(originalName, path.extname(originalName))
        .toLowerCase()
        .replace(/[^a-z0-9-_]+/g, '-')
        .replace(/^-+|-+$/g, '') || 'file';
    return `${Date.now()}-${baseName}${extension}`;
}

const storage = multer.diskStorage({
    destination: (_req, _file, cb) => { cb(null, uploadsDir); },
    filename: (_req, file, cb) => { cb(null, buildSafePdfName(file.originalname)); },
});

const upload = multer({
    storage,
    fileFilter: (_req, file, cb) => {
        const isPdfMime = file.mimetype === 'application/pdf';
        const isPdfExt = path.extname(file.originalname).toLowerCase() === '.pdf';
        if (!isPdfMime || !isPdfExt) return cb(new Error('Разрешены только PDF-файлы'));
        cb(null, true);
    },
    limits: { fileSize: 20 * 1024 * 1024 },
});

// РОУТЫ
router.post('/upload', upload.single('file'), async (req, res) => {
    try {
        if (!req.file) return res.status(400).json({ message: 'Файл не был загружен' });

        const newFile = await FileModel.create({
            originalName: req.file.originalname,
            filename: req.file.filename,
            path: req.file.path,
            mimetype: req.file.mimetype,
            size: req.file.size,
            uploadDate: new Date()
        });

        res.status(201).json({ message: 'PDF-файл успешно загружен', file: newFile });
    } catch (error) {
        if (error.code === 11000) return res.status(400).json({ message: 'Этот файл уже зарегистрирован' });
        res.status(500).json({ message: 'Ошибка сервера' });
    }
});

router.get('/', async (_req, res) => {
    try {
        const files = await FileModel.find().sort({ uploadDate: -1 }).lean();
        res.json(files);
    } catch (error) {
        res.status(500).json({ message: 'Не удалось получить список файлов' });
    }
});

router.get('/:id/download', async (req, res) => {
    try {
        const file = await FileModel.findById(req.params.id);
        if (!file || !fs.existsSync(file.path)) return res.status(404).json({ message: 'Файл не найден' });
        res.download(file.path, file.originalName);
    } catch (error) {
        res.status(500).json({ message: 'Ошибка скачивания' });
    }
});

// Обработка ошибок Multer
router.use((error, _req, res, _next) => {
    if (error instanceof multer.MulterError) return res.status(400).json({ message: error.message });
    if (error) return res.status(400).json({ message: error.message || 'Ошибка обработки файла' });
    res.status(500).json({ message: 'Внутренняя ошибка сервера' });
});

module.exports = router;