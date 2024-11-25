import React from 'react';
import styled from 'styled-components';
import { dateFormat } from '../../utils/dateFormat';
import { bitcoin, book, calender, card, circle, clothing, comment, dollar, food, freelance, medical, money, piggy, stocks, takeaway, trash, tv, users, yt, pencil } from '../../utils/Icons'; // Додаємо іконку олівця
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
    type,
    isEditing,
    newAmount,
    setNewAmount,
    handleEditClick,
    saveUpdate
}) {

    const categoryIcon = () => {
        switch(category) {
            case 'зарплата':
                return money;
            case 'фріланс':
                return freelance;
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
                return '';
        }
    };

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
                return '';
        }
    };

    return (
        <IncomeItemStyled indicator={indicatorColor}>
            <div className="icon">
                {type === 'expense' ? expenseCatIcon() : categoryIcon()}
            </div>
            <div className="content">
                <h5>{title}</h5>
                <div className="inner-content">
                    <div className="text">
                        <p>{dollar} {isEditing ? (
                            <input
                                type="number"
                                value={newAmount}
                                onChange={(e) => setNewAmount(e.target.value)}
                                
                            />
                        ) : (
                            amount
                        )}</p>
                        <p>{calender} {dateFormat(date)}</p>
                        <p>
                            {comment} {description}
                        </p>
                    </div>
                    <div className="btn-con">
                        <Button 
                            icon={trash}
                            bPad={'1rem'}
                            bRad={'50%'} // Робимо кнопку круглою
                            bg={'#ff6347'} 
                            color={'#fff'}
                            iColor={'#fff'}
                            hColor={'#ff4500'} 
                            onClick={() => deleteItem(id)}
                        />
                        {isEditing ? (
                            <Button 
                                name={'Save'}
                                bPad={'1rem'}
                                bRad={'30px'}
                                bg={'#00ffcc'} 
                                color={'#fff'}
                                iColor={'#fff'}
                                hColor={'#00ffaa'} 
                                onClick={() => saveUpdate(id)}
                            />
                        ) : (
                            <Button 
                                icon={pencil} // Замість тексту "Edit" використовуємо іконку олівця
                                bPad={'1rem'}
                                bRad={'30px'}
                                bg={'#00ffcc'} 
                                color={'#fff'}
                                iColor={'#fff'}
                                hColor={'#00ffaa'} 
                                onClick={handleEditClick}
                            />
                        )}
                    </div>
                </div>
            </div>
        </IncomeItemStyled>
    );
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
                    input {
                        width: 100px;
                        background: #1e1e2f;
                        border: 1px solid #2e2e3f;
                        color: #fff;
                        padding: 5px;
                        border-radius: 5px;
                        text-align: center;
                    }
                }
            }
        }
    }

    .btn-con {
        display: flex;
        gap: 0.5rem;
    }
`;

export default IncomeItem;
