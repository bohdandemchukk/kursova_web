// incomeitem.js

import React from 'react'
import styled from 'styled-components'
import { dateFormat } from '../../utils/dateFormat';
import { bitcoin, book, calender, card, circle, clothing, comment, dollar, food, freelance, medical, money, piggy, stocks, takeaway, trash, tv, users, yt } from '../../utils/Icons';
import Button from '../Button/Button';

function IncomeItem({
    id,
    title,
    amount,
    date,
    category,
    description,
    deleteItem,
    indicatorColor,
    type
}) {

    const categoryIcon = () =>{
        switch(category) {
            case 'зарплата':
                return money;
            case 'фріланс':
                return freelance
            case 'стипендія':
                return stocks;
            case 'від батьків':
                return users;
            case 'криптовалюта':
                return bitcoin;
            case 'депозит':
                return card;
            case 'інше':
                return piggy;
            default:
                return ''
        }
    }

    const expenseCatIcon = () => {
        switch (category) {
            case 'навчання':
                return book;
            case 'продукти':
                return food;
            case "здоров'я":
                return medical;
            case 'підписки':
                return tv;
            case 'прогулянка':
                return takeaway;
            case 'одяг':
                return clothing;
            case 'подорожі':
                return freelance;
            case 'інше':
                return circle;
            default:
                return ''
        }
    }

    console.log('type', type)

    return (
        <IncomeItemStyled indicator={indicatorColor}>
            <div className="icon">
                {type === 'expense' ? expenseCatIcon() : categoryIcon()}
            </div>
            <div className="content">
                <h5>{title}</h5>
                <div className="inner-content">
                    <div className="text">
                        <p>{dollar} {amount}</p>
                        <p>{calender} {dateFormat(date)}</p>
                        <p>
                            {comment}
                            {description}
                        </p>
                    </div>
                    <div className="btn-con">
                        <Button 
                            icon={trash}
                            bPad={'1rem'}
                            bRad={'50%'}
                            bg={'#00ffcc'} 
                            color={'#fff'}
                            iColor={'#fff'}
                            hColor={'#00ffaa'} 
                            onClick={() => deleteItem(id)}
                        />
                    </div>
                </div>
            </div>
        </IncomeItemStyled>
    )
}

const IncomeItemStyled = styled.div`
    background: #1e1e2f; /* Темний фон */
    border: 2px solid #2e2e3f; /* Злегка світліший темний колір */
    box-shadow: 0px 1px 15px rgba(0, 0, 0, 0.06);
    border-radius: 20px;
    padding: 1rem;
    margin-bottom: 1rem;
    display: flex;
    align-items: center;
    gap: 1rem;
    width: 100%;
    color: #ffffff; /* Білий текст */
    .icon {
        width: 80px;
        height: 80px;
        border-radius: 20px;
        background: #2e2e3f; /* Злегка світліший темний колір */
        display: flex;
        align-items: center;
        justify-content: center;
        border: 2px solid #00ffcc; /* Зелений акцент */
        i {
            font-size: 2.6rem;
        }
    }

    .content {
        flex: 1;
        display: flex;
        flex-direction: column;
        gap: .2rem;
        h5 {
            font-size: 1.3rem;
            padding-left: 2rem;
            position: relative;
            color: #00ffcc; /* Зелений акцент */
            &::before {
                content: '';
                position: absolute;
                left: 0;
                top: 50%;
                transform: translateY(-50%);
                width: .8rem;
                height: .8rem;
                border-radius: 50%;
                background: ${props => props.indicator};
            }
        }

        .inner-content {
            display: flex;
            justify-content: space-between;
            align-items: center;
            .text {
                display: flex;
                align-items: center;
                gap: 1.5rem;
                p {
                    display: flex;
                    align-items: center;
                    gap: 0.5rem;
                    color: #ffffff; /* Білий текст */
                    opacity: 0.8;
                }
            }
        }
    }
`;

export default IncomeItem;
