import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import styled from 'styled-components';
import { useGlobalContext } from '../../context/globalContext';

const AuthPage = ({ mode }) => {
    const { getIncomes, getExpenses, setIncomes, setExpenses } = useGlobalContext();
    const [form, setForm] = useState({
        email: '',
        password: ''
    });
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const changeHandler = (event) => {
        setForm({ ...form, [event.target.name]: event.target.value });
    };

    const submitHandler = async (event) => {
        event.preventDefault();
        try {
            if (mode === 'register') {
                const response = await axios.post('http://localhost:8080/api/auth/register', form, {
                    headers: {
                        'Content-Type': 'application/json'
                    }
                });
                if (response.status === 201) {
                    navigate('/login');
                } else {
                    setError('Не вдалося зареєструватися. Будь ласка, спробуйте ще раз.');
                }
            } else {
                const response = await axios.post('http://localhost:8080/api/auth/login', form, {
                    headers: {
                        'Content-Type': 'application/json'
                    }
                });
                localStorage.setItem('token', response.data.token);
                localStorage.setItem('userId', response.data.userId); 
                localStorage.setItem('userEmail', response.data.email);
                setIncomes([]); 
                setExpenses([]); 
                getIncomes(response.data.userId); 
                getExpenses(response.data.userId); 
                navigate('/dashboard');
            }
        } catch (error) {
            console.error(`${mode === 'register' ? 'Registration' : 'Login'} error:`, error);
            setError(error.response?.data?.message || `Не вдалося ${mode === 'register' ? 'зареєструватися' : 'ввійти'}. Будь ласка, спробуйте ще раз.`);
        }
    };

    return (
        <AuthPageStyled>
            <div className="container">
                <div className="auth-page">
                    <h3>{mode === 'register' ? 'Реєстрація' : 'Авторизація'}</h3>
                    <form className="form form-login" onSubmit={submitHandler}>
                        <div className="row">
                            <div className="input-field col s12">
                                <input
                                    type="email"
                                    name="email"
                                    className="validate"
                                    placeholder="Email"
                                    onChange={changeHandler}
                                />
                            </div>
                            <div className="input-field col s12">
                                <input
                                    type="password"
                                    name="password"
                                    className="validate"
                                    placeholder="Password"
                                    onChange={changeHandler}
                                />
                            </div>
                        </div>
                        <div className="row buttons">
                            <button className="btn" type="submit">
                                {mode === 'register' ? 'Зареєструватись' : 'Ввійти'}
                            </button>
                            <Link to={mode === 'register' ? '/login' : '/register'} className="btn-outline btn-reg">
                                {mode === 'register' ? 'Вже є акаунт?' : 'Немає акаунта?'}
                            </Link>
                        </div>
                        {error && <div className="error">{error}</div>}
                    </form>
                </div>
            </div>
        </AuthPageStyled>
    );
};




const AuthPageStyled = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
    background: rgba(30, 30, 47, 0.8); /* Змінюємо фон для відповідності стилю основної сторінки */
    .container {
        background: rgba(30, 30, 47, 0.8);
        border: 2px solid rgba(46, 46, 63, 0.8); /* Додаємо прозорість до рамки */
        border-radius: 20px;
        padding: 2rem;
        box-shadow: 0px 1px 15px rgba(0, 0, 0, 0.06);
        max-width: 450px; /* Збільшуємо максимальну ширину */
        h3 {
            color: #ffffff; /* Білий текст */
            margin-bottom: 1rem;
            text-align: center; /* Центруємо заголовок */
            font-size: 1.5rem; /* Додаємо відповідний розмір шрифту */
        }
        form {
            display: flex;
            flex-direction: column;
            gap: 1rem;
            .input-field {
                display: flex;
                flex-direction: column;
                input {
                    padding: 0.7rem;
                    border-radius: 5px;
                    border: 1px solid rgba(46, 46, 63, 0.8);
                    background: rgba(46, 46, 63, 0.5); /* Додаємо прозорість до фону */
                    color: #ffffff; /* Білий текст */
                    margin-bottom: 1rem; /* Додаємо відступ між полями */
                }
            }
            .buttons {
                display: flex;
                gap: 0.5rem;
                button, .btn-outline {
                    flex: 1;
                    padding: 0.4rem; /* Зменшуємо розмір кнопок */
                    border-radius: 5px;
                    cursor: pointer;
                    text-align: center;
                    transition: background 0.3s ease;
                    font-size: 0.9rem; /* Зменшуємо шрифт */
                }
                button {
                    background: #00ffcc; /* Зелений акцент */
                    color: #1e1e2f;
                    border: none;
                    &:hover {
                        background: #00ccaa;
                    }
                }
                .btn-outline {
                    background: transparent;
                    color: #00ffcc; /* Зелений акцент */
                    border: 2px solid #00ffcc;
                    text-decoration: none; /* Видаляємо підкреслювання */
                    &:hover {
                        background: rgba(0, 255, 204, 0.1);
                    }
                }
            }
            .error {
                color: red;
                margin-top: 1rem;
                text-align: center; /* Центруємо текст помилки */
            }
        }
    }
`;

export const Login = () => <AuthPage mode="login" />;
export const Register = () => <AuthPage mode="register" />;
