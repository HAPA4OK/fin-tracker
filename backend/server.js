const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const { Decimal128 } = mongoose.Types;
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');   
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
dotenv.config();


const app = express();
app.use(cors());
app.use(bodyParser.json());



mongoose.connect(process.env.MONGO_URI)
  .then(() => {console.log("Connected to MongoDB Atlas")

        runTest();
  })
  .catch(err => console.error("Connection error:", err));

// Схемы

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




// -----------------------------------------


// Маршруты и прочая лабуба

function getModelbyCategoryName(categoryName) {
    return mongoose.models[categoryName] || mongoose.model(categoryName, transactionSchema, categoryName);
}



app.post('/register', async (req, res) => {
    try {
        const { fullname, login, email, password, gender } = req.body;

        if (!fullname || !login || !email || !password || !gender) {
            return res.status(400).json({ message: 'Все поля обязательны для заполнения' });
        }

        const cleanLogin = login.trim();
        const cleanEmail = email.toLowerCase().trim();
        const existingUser = await User.findOne({ 
            $or: [{ login: cleanLogin }, { email: cleanEmail }] 
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
            gender 
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


// -----------------------------------------


// Тест

async function runTest() {
    try {
        const data = { 
            date: new Date(), 
            amount: 100.50, 
            balance: 1000.00, 
            category: 'pharmacy',
            bank: 'Sberbank',
            commentary: 'Анальгин',
        };

        const Model = getModelbyCategoryName(data.category);
        const transaction = new Model(data);
        
        await transaction.save(); 
        console.log(' Test: Transaction saved in collection:', data.category);

    } catch (error) {
        console.error('Test Error:', error);
    }

}

// -----------------------------------------





const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});