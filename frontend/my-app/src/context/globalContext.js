import React, { useContext, useState } from "react";
import axios from 'axios';
const BASE_URL = "http://localhost:8080/api/v1/";
const GlobalContext = React.createContext();

export const GlobalProvider = ({children}) => {
    const [incomes, setIncomes] = useState([]);
    const [expenses, setExpenses] = useState([]);
    const [error, setError] = useState(null);

    const userId = localStorage.getItem('userId'); // Отримання ID користувача з localStorage
    const token = localStorage.getItem('token'); // Отримання токена з localStorage

    const config = {
        headers: { Authorization: `Bearer ${token}` }
    };

    // Додавання доходу
    const addIncome = async (income) => {
        const response = await axios.post(`${BASE_URL}add-income`, {...income, userId}, config)
            .catch((err) =>{
                setError(err.response.data.message);
            });
        getIncomes();
    };

    // Отримання доходів
    const getIncomes = async () => {
        const response = await axios.get(`${BASE_URL}get-incomes`, {
            ...config,
            params: { userId }
        });
        setIncomes(response.data);
        console.log(response.data);
    };

    // Видалення доходу
    const deleteIncome = async (id) => {
        const res  = await axios.delete(`${BASE_URL}delete-income/${id}`, config);
        getIncomes();
    };

    const totalIncome = () => {
        let totalIncome = 0;
        incomes.forEach((income) =>{
            totalIncome = totalIncome + income.amount;
        });
        return totalIncome;
    };

    // Додавання витрати
    const addExpense = async (expense) => {
        const response = await axios.post(`${BASE_URL}add-expense`, {...expense, userId}, config)
            .catch((err) =>{
                setError(err.response.data.message);
            });
        getExpenses();
    };

    // Отримання витрат
    const getExpenses = async () => {
        const response = await axios.get(`${BASE_URL}get-expenses`, {
            ...config,
            params: { userId }
        });
        setExpenses(response.data);
        console.log(response.data);
    };

    // Видалення витрати
    const deleteExpense = async (id) => {
        const res  = await axios.delete(`${BASE_URL}delete-expense/${id}`, config);
        getExpenses();
    };

    const totalExpenses = () => {
        let totalExpenses = 0;
        expenses.forEach((expense) =>{
            totalExpenses = totalExpenses + expense.amount;
        });
        return totalExpenses;
    };

    const totalBalance = () => {
        return totalIncome() - totalExpenses();
    };

    const transactionHistory = () => {
        const history = [...incomes, ...expenses];
        history.sort((a, b) => {
            return new Date(b.createdAt) - new Date(a.createdAt);
        });
        return history.slice(0, 3);
    };

    return (
        <GlobalContext.Provider value={{
            addIncome,
            getIncomes,
            incomes,
            deleteIncome,
            expenses,
            totalIncome,
            addExpense,
            getExpenses,
            deleteExpense,
            totalExpenses,
            totalBalance,
            transactionHistory,
            error,
            setError
        }}>
            {children}
        </GlobalContext.Provider>
    );
};

export const useGlobalContext = () => {
    return useContext(GlobalContext);
};
