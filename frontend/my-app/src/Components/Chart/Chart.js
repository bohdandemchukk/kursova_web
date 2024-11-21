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
                backgroundColor: 'green',
                borderColor: 'green',
                fill: false, // Для лінійного графіка
                tension: 0.2,
            },
            {
                label: 'Витрати',
                data: expenseData,
                backgroundColor: 'red',
                borderColor: 'red',
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
    background: #FCF6F9;
    border: 2px solid #FFFFFF;
    box-shadow: 0px 1px 15px rgba(0, 0, 0, 0.06);
    padding: 1rem;
    border-radius: 20px;
    height: 100%;
`;

export default Chart;