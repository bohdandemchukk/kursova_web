const ExpenseSchema = require("../models/ExpenseModel");

exports.addExpense = async (req, res) => {
    const { title, amount, category, description, date } = req.body;
    const userId = req.user._id; // Отримання userId

    const expense = ExpenseSchema({
        title,
        amount,
        category,
        description,
        date,
        userId // Збереження userId
    });

    try {
        // validations
        if (!title || !category || !description || !date) {
            return res.status(400).json({ message: 'All fields are required!' });
        }
        if (amount <= 0 || !amount === 'number') {
            return res.status(400).json({ message: 'Amount must be a positive number!' });
        }
        await expense.save();
        res.status(200).json({ message: 'Expense Added' });
    } catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }

    console.log(expense);
};

exports.getExpense = async (req, res) => {
    const userId = req.user._id; // Отримання userId

    try {
        const expenses = await ExpenseSchema.find({ userId }).sort({ createdAt: -1 });
        res.status(200).json(expenses);
    } catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }
};

exports.deleteExpense = async (req, res) => {
    const { id } = req.params;
    ExpenseSchema.findByIdAndDelete(id)
        .then((expense) => {
            res.status(200).json({ message: 'Expense Deleted' });
        })
        .catch((err) => {
            res.status(500).json({ message: 'Server Error' });
        });
};
