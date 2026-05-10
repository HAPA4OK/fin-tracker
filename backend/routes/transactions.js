const express = require('express');
const router = express.Router();
const Transaction = require('../models/Transaction');

// GET /api/transactions
router.get('/', async (req, res) => {
    try {
        // 1. Извлекаем параметры из query-строки (URL)
        const { 
            sortBy = 'date',    // По какому полю сортируем
            order = 'desc',     // Порядок: desc (новые) или asc (старые)
            limit = 50,         // Сколько записей отдаем за раз
            category,           // Фильтр по категории
            bank                // Фильтр по банку
        } = req.query;

        // 2. Формируем объект фильтрации
        const query = {};
        if (category) query.categoryInfo = category; // Фильтр по трансформированной категории
        if (bank) query.bank = new RegExp(bank, 'i'); // Регистронезависимый поиск банка

        // 3. Выполняем запрос к БД
        const transactions = await Transaction.find(query)
            .sort({ [sortBy]: order === 'desc' ? -1 : 1 }) // Динамическая сортировка
            .limit(parseInt(limit))
            .lean();

        res.json({
            count: transactions.length,
            data: transactions
        });

    } catch (error) {
        console.error('Fetch Transactions Error:', error);
        res.status(500).json({ message: 'Ошибка при получении списка транзакций' });
    }
});

router.get('/stats', async (req, res) => {
    try {
        const stats = await Transaction.aggregate([
            { $group: { _id: "$categoryInfo", total: { $sum: "$amount" } } },
            { $sort: { total: -1 } }
        ]);
        res.json(stats);
    } catch (error) {
        res.status(500).json({ message: 'Ошибка при расчете статистики' });
    }
});

module.exports = router;