const { addExpense, getExpense, deleteExpense, updateExpense } = require('../controllers/expense');
const { addIncome, getIncomes, deleteIncome, updateIncome } = require('../controllers/income');
const router = require('express').Router();
const auth = require('../middleware/auth');

router.post('/add-income', auth, addIncome)
    .get('/get-incomes', auth, getIncomes)
    .delete('/delete-income/:id', auth, deleteIncome)
    .put('/update-income/:id', auth, updateIncome)
    .post('/add-expense', auth, addExpense)
    .get('/get-expenses', auth, getExpense)
    .delete('/delete-expense/:id', auth, deleteExpense)
    .put('/update-expense/:id', auth, updateExpense);

module.exports = router;
