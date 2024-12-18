
import React, { useEffect } from 'react';
import styled from 'styled-components';
import { useGlobalContext } from '../context/globalContext';

function History() {
    const { transactionHistory } = useGlobalContext();
    const { addExpense, expenses, getExpenses, deleteExpense, totalExpenses } = useGlobalContext();
    const userId = localStorage.getItem('userId');

    useEffect(() => {
        getExpenses(userId);
    }, [userId]);

    const [...history] = transactionHistory();

    return (
        <HistoryStyled>
            <h2>Недавня активність</h2>
            {history.map((item) => {
                const { _id, title, amount, type } = item;
                return (
                    <div key={_id} className="history-item">
                        <p style={{
                            color: type === 'expense' ? '#ff6347' : '#00ffcc'
                        }}>
                            {title}
                        </p>

                        <p style={{
                            color: type === 'expense' ? '#ff6347' : '#00ffcc'
                        }}>
                            {type === 'expense' ? `-${amount <= 0 ? 0 : amount}` : `+${amount <= 0 ? 0 : amount}`}
                        </p>
                    </div>
                );
            })}
        </HistoryStyled>
    );
}

const HistoryStyled = styled.div`
    display: flex;
    flex-direction: column;
    gap: 1rem;
    .history-item {
        background: #1e1e2f; /* Темний фон */
        border: 2px solid #2e2e3f; /* Злегка світліший темний колір */
        box-shadow: 0px 1px 15px rgba(0, 0, 0, 0.06);
        padding: 1rem;
        border-radius: 20px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        color: #ffffff; /* Білий текст */
    }
`;

export default History;
