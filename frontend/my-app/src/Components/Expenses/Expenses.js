// expenses.js

import React, { useEffect } from 'react';
import styled from 'styled-components';
import { useGlobalContext } from '../../context/globalContext';
import { InnerLayout } from '../../styles/Layouts';
import ExpenseForm from './ExpenseForm';
import IncomeItem from '../IncomeItem/IncomeItem';

function Expenses() {
    const { addExpense, expenses, getExpenses, deleteExpense, totalExpenses } = useGlobalContext();
    const userId = localStorage.getItem('userId'); 

    useEffect(() => {
        getExpenses(userId);
    }, [userId]);

    return (
        <ExpenseStyled className="transparent-background">
            <InnerLayout>
                <h1 style={{ color: '#ffffff' }}>Витрати</h1>
                <h2 className="total-income" style={{ color: '#ffffff' }}>Загальні витрати: <span>${totalExpenses()}</span></h2>
                <div className="income-content">
                    <div className="form-container">
                        <ExpenseForm />
                    </div>
                    <div className="incomes">
                        {expenses.map((income) => {
                            const { _id, title, amount, date, category, description, type } = income;
                            console.log(income);
                            return <IncomeItem
                                key={_id}
                                id={_id}
                                title={title}
                                description={description}
                                amount={amount}
                                date={date}
                                type={type}
                                category={category}
                                indicatorColor="var(--color-green)"
                                deleteItem={deleteExpense}
                            />
                        })}
                    </div>
                </div>
            </InnerLayout>
        </ExpenseStyled>
    );
}

const ExpenseStyled = styled.div`
    display: flex;
    flex-direction: column;
    height: 100vh; /* Задаємо висоту 100vh */
    .total-income {
        display: flex;
        justify-content: center;
        align-items: center;
        background: rgba(30, 30, 47, 0.8); /* Додаємо прозорість */
        border: 2px solid rgba(46, 46, 63, 0.8); /* Додаємо прозорість до рамки */
        box-shadow: 0px 1px 15px rgba(0, 0, 0, 0.06);
        border-radius: 20px;
        padding: 0.7rem;
        margin: 0.7rem 0;
        font-size: 1.5rem;
        gap: 0.5rem;
        span {
            font-size: 1.8rem;
            font-weight: 800;
            color: #00ffcc; /* Зелений акцент */
        }
    }
    .income-content {
        display: flex;
        gap: 1rem;
        height: calc(100% - 6rem);
        .form-container {
            flex: 1;
            form {
                display: flex;
                flex-direction: column;
                gap: 0.7rem;
                input, button, select, textarea {
                    width: 100%;
                    padding: 0.7rem;
                    font-size: 1rem;
                }
                select {
                    display: block;
                }
            }
        }
        .incomes {
            flex: 2;
            display: flex;
            flex-direction: column;
            gap: 0.7rem;
            overflow-y: auto;
            .income-item {
                padding: 0.7rem;
                font-size: 1rem;
            }
        }
    }
`;

export default Expenses;
