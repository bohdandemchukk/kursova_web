const ExpenseSchema = require("../models/ExpenseModel");

exports.addExpense = async (req, res) => {
    const { title, amount, category, description, date } = req.body;
    const userId = req.user._id; 

    const expense = ExpenseSchema({
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
            return res.status(400).json({ message: 'Сума має бути додатнім числом' });
        }
        await expense.save();
        res.status(200).json({ message: 'Витрата додана' });
    } catch (error) {
        res.status(500).json({ message: 'Помилка сервера' });
    }

    console.log(expense);
};

exports.getExpense = async (req, res) => {
    const userId = req.user._id; 

    try {
        const expenses = await ExpenseSchema.find({ userId }).sort({ createdAt: -1 });
        res.status(200).json(expenses);
    } catch (error) {
        res.status(500).json({ message: 'Помилка сервера' });
    }
};

exports.deleteExpense = async (req, res) => {
    const { id } = req.params;
    ExpenseSchema.findByIdAndDelete(id)
        .then((expense) => {
            res.status(200).json({ message: 'Витрата видалена' });
        })
        .catch((err) => {
            res.status(500).json({ message: 'Помилка сервера' });
        });
};

exports.updateExpense = async (req, res) => {
    const { id } = req.params;
    const { amount } = req.body;

    try {
        const updatedExpense = await ExpenseSchema.findByIdAndUpdate(id, { amount }, { new: true });
        if (!updatedExpense) {
            return res.status(404).json({ message: 'Витрату не знайдено' });
        }
        res.status(200).json(updatedExpense);
    } catch (error) {
        res.status(500).json({ message: 'Помилка сервера' });
    }
};
