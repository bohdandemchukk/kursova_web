// routes/transactions.js
const { addExpense, getExpense, deleteExpense } = require('../controllers/expense');
const { addIncome, getIncomes, deleteIncome } = require('../controllers/income');
const router = require('express').Router();
const auth = require('../middleware/auth');

router.post('/add-income', auth, addIncome)
    .get('/get-incomes', auth, getIncomes)
    .delete('/delete-income/:id', auth, deleteIncome)
    .post('/add-expense', auth, addExpense)
    .get('/get-expenses', auth, getExpense)
    .delete('/delete-expense/:id', auth, deleteExpense);

module.exports = router;
