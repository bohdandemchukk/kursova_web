// dashboard.js

import React, { useEffect } from 'react';
import styled from 'styled-components';
import { useGlobalContext } from '../../context/globalContext';
import History from '../../History/History';
import { InnerLayout } from '../../styles/Layouts';
import { dollar } from '../../utils/Icons';
import Chart from '../Chart/Chart';
import Orb from '../Orb/Orb';

function Dashboard() {
    const { totalExpenses, incomes, expenses, totalIncome, totalBalance, getIncomes, getExpenses } = useGlobalContext();
    const userId = localStorage.getItem('userId'); // Отримання ID користувача

    useEffect(() => {
        getIncomes(userId);
        getExpenses(userId);
    }, [userId]);

    return (
        <DashboardStyled>
            <InnerLayout>
                <h1 style={{ color: '#ffffff' }}>Активність</h1>
                <div className="stats-con">
                    <div className="chart-con">
                        <Chart />
                        <div className="amount-con">
                            <div className="income">
                                <h2 style={{ color: '#ffffff' }}>Усі доходи</h2>
                                <p style={{ color: '#00ffcc' }}>
                                    {dollar} {totalIncome()}
                                </p>
                            </div>
                            <div className="expense">
                                <h2 style={{ color: '#ffffff' }}>Усі витрати</h2>
                                <p style={{ color: '#00ffcc' }}>
                                    {dollar} {totalExpenses()}
                                </p>
                            </div>
                            <div className="balance">
                                <h2 style={{ color: '#ffffff' }}>Баланс</h2>
                                <p style={{ color: '#00ffcc' }}>
                                    {dollar} {totalBalance()}
                                </p>
                            </div>
                        </div>
                    </div>
                    <div className="history-con">
                        <History />
                        <h2 className="salary-title" style={{ color: '#ffffff' }}>мінімальний <span>Дохід</span> максимальний</h2>
                        <div className="salary-item">
                            <p style={{ color: '#00ffcc' }}>
                                ₴{incomes.length > 0 ? Math.min(...incomes.map(item => item.amount)) : ''}
                            </p>
                            <p style={{ color: '#00ffcc' }}>
                                ₴{incomes.length > 0 ? Math.max(...incomes.map(item => item.amount)) : ''}
                            </p>
                        </div>
                        <h2 className="salary-title" style={{ color: '#ffffff' }}>мінімальна <span>Витрата</span> максимальна</h2>
                        <div className="salary-item">
                            <p style={{ color: '#00ffcc' }}>
                                ₴{expenses.length > 0 ? Math.min(...expenses.map(item => item.amount)) : ''}
                            </p>
                            <p style={{ color: '#00ffcc' }}>
                                ₴{expenses.length > 0 ? Math.max(...expenses.map(item => item.amount)) : ''}
                            </p>
                        </div>
                    </div>
                </div>
                <Orb />
            </InnerLayout>
        </DashboardStyled>
    );
}

const DashboardStyled = styled.div`
    .stats-con {
        display: grid;
        grid-template-columns: repeat(5, 1fr);
        gap: 1rem; /* Зменшуємо відступи між елементами */
        .chart-con {
            grid-column: 1 / 4;
            height: 300px; /* Зменшуємо висоту графіка */
            .amount-con {
                display: grid;
                grid-template-columns: repeat(3, 1fr); /* Збільшуємо кількість колонок до трьох */
                gap: 1rem; /* Зменшуємо відступи між елементами */
                margin-top: 1rem; /* Зменшуємо верхній відступ */
                .income, .expense, .balance {
                    background: #1e1e2f; /* Темний фон */
                    border: 2px solid #2e2e3f; /* Злегка світліший темний колір */
                    box-shadow: 0px 1px 15px rgba(0, 0, 0, 0.06);
                    border-radius: 20px;
                    padding: 0.5rem; /* Зменшуємо відступ всередині елементів */
                    p {
                        font-size: 2rem; /* Зменшуємо розмір тексту */
                        font-weight: 700;
                        color: #00ffcc; /* Зелений акцент */
                    }
                }
            }
        }

        .history-con {
            grid-column: 4 / -1;
            height: auto; /* Забезпечує висоту відповідно до вмісту */
            align-self: start; /* Піднімає блок угору */
            background: #1e1e2f; /* Темний фон */
            border: 3.5px solid #2e2e3f; /* Злегка світліший темний колір */
            box-shadow: 0px 1px 15px rgba(0, 0, 0, 0.06);
            border-radius: 20px;
            padding: 0.5rem; /* Зменшуємо відступ всередині елементів */
            h2 {
                margin: 1rem 0;
                display: flex;
                align-items: center;
                justify-content: space-between;
                color: #ffffff; /* Білий текст */
            }
            .salary-title {
                font-size: 1.2rem;
                span {
                    font-size: 1.8rem;
                }
            }
            .salary-item {
                background: #1e1e2f; /* Темний фон */
                border: 3px solid #2e2e3f; /* Злегка світліший темний колір */
                box-shadow: 0px 1px 15px rgba(0, 0, 0, 0.06);
                padding: 0.5rem; /* Зменшуємо відступ всередині елементів */
                border-radius: 20px;
                display: flex;
                justify-content: space-between;
                align-items: center;
                p {
                    font-weight: 600;
                    font-size: 1.2rem; /* Зменшуємо розмір тексту */
                    color: #00ffcc; /* Зелений акцент */
                }
            }
        }
    }
`;

export default Dashboard;
