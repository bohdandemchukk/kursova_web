// income.js

import React, { useEffect } from 'react';
import styled from 'styled-components';
import { useGlobalContext } from '../../context/globalContext';
import { InnerLayout } from '../../styles/Layouts';
import Form from '../Form/Form';
import IncomeItem from '../IncomeItem/IncomeItem';

function Income() {
    const { addIncome, incomes, getIncomes, deleteIncome, totalIncome } = useGlobalContext();
    const userId = localStorage.getItem('userId'); 

    useEffect(() => {
        getIncomes(userId);
    }, [userId]);

    return (
        <IncomeStyled className="transparent-background">
            <InnerLayout>
                <h1 style={{ color: '#ffffff' }}>Доходи</h1>
                <h2 className="total-income" style={{ color: '#ffffff' }}>Загальні доходи: <span>${totalIncome()}</span></h2>
                <div className="income-content">
                    <div className="form-container">
                        <Form />
                    </div>
                    <div className="incomes">
                        {incomes.map((income) => {
                            const { _id, title, amount, date, category, description, type } = income;
                            return <IncomeItem
                                key={_id}
                                id={_id}
                                title={title}
                                description={description}
                                amount={amount}
                                date={date}
                                type={type}
                                category={category}
                                indicatorColor="#00ffcc"
                                deleteItem={deleteIncome}
                            />
                        })}
                    </div>
                </div>
            </InnerLayout>
        </IncomeStyled>
    );
}

const IncomeStyled = styled.div`
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

export default Income;
