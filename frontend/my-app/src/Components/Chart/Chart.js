// chart.js

import React from 'react';
import {
    Chart as ChartJs,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    ArcElement,
} from 'chart.js';

import { Line } from 'react-chartjs-2';
import styled from 'styled-components';
import { useGlobalContext } from '../../context/globalContext';
import { dateFormat } from '../../utils/dateFormat';

ChartJs.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    ArcElement,
);

function Chart() {
    const { incomes, expenses } = useGlobalContext();

    // Поєднання доходів та витрат для упорядкування за датою
    const combinedData = [...incomes.map(inc => ({ ...inc, type: 'income' })), 
                          ...expenses.map(exp => ({ ...exp, type: 'expense' }))];

    // Сортування за датою
    combinedData.sort((a, b) => new Date(a.date) - new Date(b.date));

    // Отримання унікальних міток (дат) у хронологічному порядку
    const labels = [...new Set(combinedData.map(item => dateFormat(item.date)))];

    // Створення масивів для доходів та витрат
    const incomeData = labels.map(label => {
        const item = combinedData.find(
            data => dateFormat(data.date) === label && data.type === 'income'
        );
        return item ? item.amount : 0;
    });

    const expenseData = labels.map(label => {
        const item = combinedData.find(
            data => dateFormat(data.date) === label && data.type === 'expense'
        );
        return item ? item.amount : 0;
    });

    const data = {
        labels,
        datasets: [
            {
                label: 'Доходи',
                data: incomeData,
                backgroundColor: '#00ffcc', // Зелений акцент
                borderColor: '#00ffcc', // Зелений акцент
                fill: false, // Для лінійного графіка
                tension: 0.2,
            },
            {
                label: 'Витрати',
                data: expenseData,
                backgroundColor: '#ff6347', // Червоний акцент
                borderColor: '#ff6347', // Червоний акцент
                fill: false, // Для лінійного графіка
                tension: 0.2,
            },
        ],
    };

    return (
        <ChartStyled>
            <Line data={data} />
        </ChartStyled>
    );
}

const ChartStyled = styled.div`
    background: #1e1e2f; /* Темний фон */
    border: 4px solid #2e2e3f; /* Злегка світліший темний колір */
    box-shadow: 0px 1px 15px rgba(0, 0, 0, 0.06);
    padding: 1rem;
    border-radius: 20px;
    height: 100%;
    color: #ffffff; /* Білий текст */
`;

export default Chart;
