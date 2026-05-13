const express = require('express');
const router = express.Router();
const Transaction = require('../models/Transaction');

// GET /api/transactions
router.get('/', async (req, res) => {
    try {
        // 1. Параметры пагинации и сортировки
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 50;
        const sortBy = req.query.sortBy || 'transactionNum'; 
        const order = req.query.order === 'desc' ? -1 : 1; 

        const safePage = Math.max(1, page);
        const safeLimit = Math.max(1, Math.min(100, limit));
        const skip = (safePage - 1) * safeLimit;

        // 2. Формирование фильтра (Query) по датам
        const { dateFrom, dateTo } = req.query;
        const query = {};

        if (dateFrom || dateTo) {
            query.date = {};
            if (dateFrom) query.date.$gte = new Date(dateFrom);
            if (dateTo) query.date.$lte = new Date(dateTo);
        }

        // 3. Запрос списка транзакций
        const transactions = await Transaction.find(query)
            .sort({ 
                [sortBy]: order,
                // Вторичная сортировка по номеру для стабильности списка
                ...(sortBy !== 'transactionNum' && { transactionNum: order })
            })
            .skip(skip)
            .limit(safeLimit)
            .lean();

        // 4. Подсчет общего количества документов (с учетом фильтра!)
        const total = await Transaction.countDocuments(query);

        // 5. АГРЕГАЦИЯ: Подсчет Баланса, Доходов и Расходов
        const aggregation = await Transaction.aggregate([
            { $match: query }, // Считаем только для выбранного периода
            {
                $group: {
                    _id: null,
                    // Суммируем только положительные числа
                    income: { 
                        $sum: { $cond: [{ $gt: ["$amount", 0] }, "$amount", 0] } 
                    },
                    // Суммируем только отрицательные числа
                    expenses: { 
                        $sum: { $cond: [{ $lt: ["$amount", 0] }, "$amount", 0] } 
                    }
                }
            }
        ]);

        // Извлекаем результаты или ставим 0, если данных нет
        const resultStats = aggregation[0] || { income: 0, expenses: 0 };

        // 6. Формирование финального ответа
        res.json({
            total,
            page: safePage,
            limit: safeLimit,
            totalPages: Math.ceil(total / safeLimit),
            stats: {
                income: resultStats.income,
                expenses: Math.abs(resultStats.expenses), // Делаем расход положительным для фронта
                balance: resultStats.income + resultStats.expenses // Итоговая сумма
            },
            data: transactions
        });
    } catch (error) {
        console.error('Full Error:', error);
        res.status(500).json({ 
            message: 'Ошибка сервера при получении транзакций', 
            error: error.message 
        });
    }
});

// Роут для детальной статистики по категориям (например, для графиков)
router.get('/stats', async (req, res) => {
    try {
        const { dateFrom, dateTo } = req.query;
        const query = {};

        if (dateFrom || dateTo) {
            query.date = {};
            if (dateFrom) query.date.$gte = new Date(dateFrom);
            if (dateTo) query.date.$lte = new Date(dateTo);
        }

        const stats = await Transaction.aggregate([
            { $match: query },
            { $group: { _id: "$categoryInfo", total: { $sum: "$amount" } } },
            { $sort: { total: -1 } }
        ]);
        res.json(stats);
    } catch (error) {
        res.status(500).json({ message: 'Ошибка при расчете статистики по категориям' });
    }
});

module.exports = router;