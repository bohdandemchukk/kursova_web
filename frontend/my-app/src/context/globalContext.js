import React, { useContext, useState, useEffect } from "react";
import axios from 'axios';
const BASE_URL = "http://localhost:8080/api/v1/";
const GlobalContext = React.createContext();

export const GlobalProvider = ({children}) => {
    const [incomes, setIncomes] = useState([]);
    const [expenses, setExpenses] = useState([]);
    const [error, setError] = useState(null);

    const token = localStorage.getItem('token');

    const config = {
        headers: { Authorization: `Bearer ${token}` }
    };

    const addIncome = async (income) => {
        try {
            const response = await axios.post(`${BASE_URL}add-income`, {...income}, config);
            getIncomes();
        } catch (err) {
            setError(err.response.data.message);
        }
    };

    const getIncomes = async () => {
        try {
            const userId = localStorage.getItem('userId');
            const response = await axios.get(`${BASE_URL}get-incomes`, {
                ...config,
                params: { userId }
            });
            setIncomes(response.data);
        } catch (err) {
            setError(err.response.data.message);
        }
    };

    const deleteIncome = async (id) => {
        try {
            await axios.delete(`${BASE_URL}delete-income/${id}`, config);
            getIncomes();
        } catch (err) {
            setError(err.response.data.message);
        }
    };

    const updateIncome = async (id, amount) => {
        try {
            const response = await axios.put(`${BASE_URL}update-income/${id}`, { amount }, config);
            getIncomes(); 
        } catch (err) {
            setError(err.response.data.message);
        }
    };

    const totalIncome = () => {
        let totalIncome = 0;
        incomes.forEach((income) => {
            totalIncome += income.amount;
        });
        return totalIncome;
    };

    const addExpense = async (expense) => {
        try {
            const response = await axios.post(`${BASE_URL}add-expense`, {...expense}, config);
            getExpenses();
        } catch (err) {
            setError(err.response.data.message);
        }
    };

    const getExpenses = async () => {
        try {
            const userId = localStorage.getItem('userId');
            const response = await axios.get(`${BASE_URL}get-expenses`, {
                ...config,
                params: { userId }
            });
            setExpenses(response.data);
        } catch (err) {
            setError(err.response.data.message);
        }
    };

    const deleteExpense = async (id) => {
        try {
            await axios.delete(`${BASE_URL}delete-expense/${id}`, config);
            getExpenses();
        } catch (err) {
            setError(err.response.data.message);
        }
    };

    const updateExpense = async (id, amount) => {
        try {
            const response = await axios.put(`${BASE_URL}update-expense/${id}`, { amount }, config);
            getExpenses();
        } catch (err) {
            setError(err.response.data.message);
        }
    };

    const totalExpenses = () => {
        let totalExpenses = 0;
        expenses.forEach((expense) => {
            totalExpenses += expense.amount;
        });
        return totalExpenses;
    };

    const totalBalance = () => {
        return totalIncome() - totalExpenses();
    };

    const transactionHistory = () => {
        const history = [...incomes, ...expenses];
        history.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        return history.slice(0, 3);
    };

    useEffect(() => {
        if (token) {
            const fetchData = async () => {
                try {
                    await getIncomes();
                    await getExpenses();
                } catch (error) {
                    console.error('Failed to fetch data', error);
                }
            };
            fetchData();
        }
    }, [token]);

    return (
        <GlobalContext.Provider value={{
            addIncome,
            getIncomes,
            setIncomes,
            incomes,
            deleteIncome,
            updateIncome, 
            expenses,
            setExpenses,
            totalIncome,
            addExpense,
            getExpenses,
            deleteExpense,
            updateExpense, 
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
