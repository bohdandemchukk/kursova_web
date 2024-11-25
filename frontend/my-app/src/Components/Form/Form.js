
import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import { useGlobalContext } from '../../context/globalContext';
import Button from '../Button/Button';
import { plus } from '../../utils/Icons';

function Form() {
    const { addIncome, getIncomes, error, setError } = useGlobalContext();
    const userId = localStorage.getItem('userId'); 

    useEffect(() => {
        getIncomes(userId);
    }, [userId]);

    const [inputState, setInputState] = useState({
        title: '',
        amount: '',
        date: '',
        category: '',
        description: '',
    });

    const { title, amount, date, category, description } = inputState;

    const handleInput = name => e => {
        setInputState({ ...inputState, [name]: e.target.value });
        setError('');
    };

    const handleSubmit = e => {
        e.preventDefault();
        addIncome(inputState);
        setInputState({
            title: '',
            amount: '',
            date: '',
            category: '',
            description: '',
        });
    };

    return (
        <FormStyled onSubmit={handleSubmit}>
            {error && <p className='error'>{error}</p>}
            <div className="input-control">
                <input
                    type="text"
                    value={title}
                    name={'title'}
                    placeholder="Назва доходу"
                    onChange={handleInput('title')}
                />
            </div>
            <div className="input-control">
                <input 
                    type="text" 
                    value={amount}  
                    name={'amount'} 
                    placeholder={'Сума доходу'}
                    onChange={handleInput('amount')} 
                />
            </div>
            <div className="input-control">
                <DatePicker 
                    id='date'
                    placeholderText='Дата'
                    selected={date}
                    dateFormat="dd/MM/yyyy"
                    onChange={(date) => {
                        setInputState({ ...inputState, date: date });
                    }}
                />
            </div>
            <div className="selects input-control">
                <select required value={category} name="category" id="category" onChange={handleInput('category')}>
                    <option value="" disabled>Виберіть опцію</option>
                    <option value="зарплата">Зарплата</option>
                    <option value="фріланс">фріланс</option>
                    <option value="стипендія">стипендія</option>
                    <option value="від батьків">від батьків</option>
                    <option value="криптовалюта">криптовалюта</option>
                    <option value="депозит">депозит</option>   
                    <option value="інше">інше</option>  
                </select>
            </div>
            <div className="input-control">
                <textarea 
                    name="description" 
                    value={description} 
                    placeholder='Додаткова інформація' 
                    id="description" 
                    cols="30" 
                    rows="4" 
                    onChange={handleInput('description')}
                ></textarea>
            </div>
            <div className="submit-btn">
                <Button 
                    name={'Додати дохід'}
                    icon={plus}
                    bPad={'.8rem 1.6rem'}
                    bRad={'30px'}
                    bg={'#00ffcc'} 
                    color={'#fff'}
                />
            </div>
        </FormStyled>
    );
}

const FormStyled = styled.form`
    display: flex;
    flex-direction: column;
    gap: 2rem;
    input, textarea, select {
        font-family: inherit;
        font-size: inherit;
        outline: none;
        border: none;
        padding: .5rem 1rem;
        border-radius: 5px;
        border: 2px solid #2e2e3f; /* Злегка світліший темний колір */
        background: #1e1e2f; /* Темний фон */
        resize: none;
        box-shadow: 0px 1px 15px rgba(0, 0, 0, 0.06);
        color: #ffffff; /* Білий текст */
        &::placeholder {
            color: #7d7d7d; /* Світло-сірий текст для підказок */
        }
    }
    .input-control {
        input {
            width: 100%;
        }
    }

    .selects {
        display: flex;
        justify-content: flex-end;
        select {
            color: #7d7d7d; /* Світло-сірий текст для підказок */
            &:focus, &:active {
                color: #ffffff; /* Білий текст */
            }
        }
    }

    .submit-btn {
        button {
            box-shadow: 0px 1px 15px rgba(0, 0, 0, 0.06);
            &:hover {
                background: #00ffaa !important; /* Світло-зелений колір при наведенні */
            }
        }
    }
`;

export default Form;
