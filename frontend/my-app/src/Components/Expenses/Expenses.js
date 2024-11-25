import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useGlobalContext } from '../../context/globalContext';
import { InnerLayout } from '../../styles/Layouts';
import ExpenseForm from './ExpenseForm';
import IncomeItem from '../IncomeItem/IncomeItem';

function Expenses() {
    const { addExpense, expenses, getExpenses, deleteExpense, totalExpenses, updateExpense } = useGlobalContext();
    const userId = localStorage.getItem('userId');

    useEffect(() => {
        getExpenses(userId);
    }, [userId]);

    const [editingId, setEditingId] = useState(null);
    const [newAmount, setNewAmount] = useState('');

    const handleUpdate = (id, amount) => {
        setEditingId(id);
        setNewAmount(amount);
    };

    const saveUpdate = (id) => {
        updateExpense(id, newAmount);
        setEditingId(null);
    };

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
                        {expenses.map((expense) => {
                            const { _id, title, amount, date, category, description, type } = expense;
                            return (
                                <IncomeItem
                                    key={_id}
                                    id={_id}
                                    title={title}
                                    description={description}
                                    amount={amount}
                                    date={date}
                                    type={type}
                                    category={category}
                                    indicatorColor="var(--color-red)"
                                    deleteItem={deleteExpense}
                                    isEditing={editingId === _id}
                                    newAmount={newAmount}
                                    setNewAmount={setNewAmount}
                                    handleEditClick={() => handleUpdate(_id, amount)}
                                    saveUpdate={saveUpdate}
                                />
                            );
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
    height: 100vh;
    .total-income {
        display: flex;
        justify-content: center;
        align-items: center;
        background: rgba(30, 30, 47, 0.8);
        border: 2px solid rgba(46, 46, 63, 0.8);
        box-shadow: 0px 1px 15px rgba(0, 0, 0, 0.06);
        border-radius: 20px;
        padding: 0.7rem;
        margin: 0.7rem 0;
        font-size: 1.5rem;
        gap: 0.5rem;
        span {
            font-size: 1.8rem;
            font-weight: 800;
            color: #00ffcc;
        }
    }
    .income-content {
        display: flex;
        gap: 2rem;
        .form-container {
            flex: 1;
        }
        .incomes {
            flex: 2;
        }
    }
`;

export default Expenses;
