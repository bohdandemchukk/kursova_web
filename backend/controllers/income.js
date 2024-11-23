const IncomeSchema = require("../models/IncomeModel");

exports.addIncome = async (req, res) => {
    const {title, amount, category, description, date} = req.body;
    const userId = req.user._id;

    const income = IncomeSchema({
        title,
        amount,
        category,
        description,
        date,
        userId
    });

    try {
        
        if (!title || !category || !description || !date) {
            return res.status(400).json({ message: "Всі поля обов'язкові" });
        }
        if (amount <= 0 || !amount === 'number') {
            return res.status(400).json({ message: "Сума має бути додатнім числом" });
        }
        await income.save();
        res.status(200).json({ message: "Дохід доданий" });
    } catch (error) {
        res.status(500).json({ message: "Помилка сервера" });
    }

    console.log(income);
};

exports.getIncomes = async (req, res) => {
    const userId = req.user._id; 

    try {
        const incomes = await IncomeSchema.find({ userId }).sort({ createdAt: -1 });
        res.status(200).json(incomes);
    } catch (error) {
        res.status(500).json({ message: "Помилка сервера" });
    }
};

exports.deleteIncome = async (req, res) => {
    const { id } = req.params;
    IncomeSchema.findByIdAndDelete(id)
        .then((income) => {
            res.status(200).json({ message: 'Дохід видалений' });
        })
        .catch((err) => {
            res.status(500).json({ message: 'Помилка сервера' });
        });
};
