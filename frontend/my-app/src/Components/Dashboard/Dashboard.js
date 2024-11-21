import React, { useEffect } from 'react';
import styled from 'styled-components';
import { useGlobalContext } from '../../context/globalContext';
import History from '../../History/History';
import { InnerLayout } from '../../styles/Layouts';
import { dollar } from '../../utils/Icons';
import Chart from '../Chart/Chart';

function Dashboard() {
    const { totalExpenses, incomes, expenses, totalIncome, totalBalance, getIncomes, getExpenses } = useGlobalContext();

    useEffect(() => {
        getIncomes();
        getExpenses();
    }, []);
    
    return (
        <DashboardStyled>
            <InnerLayout>
                <h1>Активність</h1>
                <div className="stats-con">
                    <ChartSection totalIncome={totalIncome} totalExpenses={totalExpenses} totalBalance={totalBalance} />
                    <HistorySection incomes={incomes} expenses={expenses} />
                </div>
            </InnerLayout>
        </DashboardStyled>
    );
}

const ChartSection = ({ totalIncome, totalExpenses, totalBalance }) => (
    <div className="chart-con">
        <Chart />
        <div className="amount-con">
            <div className="income">
                <h2>Загальні доходи</h2>
                <p>{dollar} {totalIncome()}</p>
            </div>
            <div className="expense">
                <h2>Загальні витрати</h2>
                <p>{dollar} {totalExpenses()}</p>
            </div>
            <div className="balance">
                <h2>Баланс</h2>
                <p>{dollar} {totalBalance()}</p>
            </div>
        </div>
    </div>
);

const HistorySection = ({ incomes, expenses }) => (
    <div className="history-con">
        <History />
        <MinMaxSection title="Дохід" data={incomes} />
        <MinMaxSection title="Витрата" data={expenses} />
    </div>
);

const MinMaxSection = ({ title, data }) => (
    <>
        <h2 className="salary-title">мінімальний <span>{title}</span> максимальний</h2>
        <div className="salary-item">
            <p>₴{data.length > 0 ? Math.min(...data.map(item => item.amount)) : ''}</p>
            <p>₴{data.length > 0 ? Math.max(...data.map(item => item.amount)) : ''}</p>
        </div>
    </>
);

const DashboardStyled = styled.div`
    .stats-con{
        display: grid;
        grid-template-columns: repeat(5, 1fr);
        gap: 2rem;
        .chart-con{
            grid-column: 1 / 4;
            height: 400px;
            .amount-con{
                display: grid;
                grid-template-columns: repeat(4, 1fr);
                gap: 2rem;
                margin-top: 2rem;
                .income, .expense, .balance{
                    background: #FCF6F9;
                    border: 2px solid #FFFFFF;
                    box-shadow: 0px 1px 15px rgba(0, 0, 0, 0.06);
                    border-radius: 20px;
                    padding: 1rem;
                    p{
                        font-size: 3.5rem;
                        font-weight: 700;
                    }
                }
                .balance{
                    grid-column: 2 / 4;
                    display: flex;
                    flex-direction: column;
                    justify-content: center;
                    align-items: center;
                    p{
                        color: var(--color-green);
                        opacity: 0.6;
                        font-size: 4.5rem;
                    }
                }
            }
        }
        .history-con{
            grid-column: 4 / -1;
            .salary-title{
                font-size: 1.2rem;
                span{
                    font-size: 1.8rem;
                }
            }
            .salary-item{
                background: #FCF6F9;
                border: 2px solid #FFFFFF;
                box-shadow: 0px 1px 15px rgba(0, 0, 0, 0.06);
                padding: 1rem;
                border-radius: 20px;
                display: flex;
                justify-content: space-between;
                align-items: center;
                p{
                    font-weight: 600;
                    font-size: 1.6rem;
                }
            }
        }
    }
`;

export default Dashboard;
