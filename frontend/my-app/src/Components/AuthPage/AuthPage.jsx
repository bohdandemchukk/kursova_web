import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import "./AuthPage.scss";
import { useGlobalContext } from '../../context/globalContext'

const Register = () => {
    const [form, setForm] = useState({
        email: '',
        password: ''
    });
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const changeHandler = (event) => {
        setForm({ ...form, [event.target.name]: event.target.value });
    };

    const registerHandler = async (event) => {
        event.preventDefault();
        try {
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
        } catch (error) {
            console.error("Registration error:", error);
            setError(error.response?.data?.message || 'Не вдалося зареєструватися. Будь ласка, спробуйте ще раз.');
        }
    };

    return (
        <div className="container">
            <div className="auth-page">
                <h3>Реєстрація</h3>
                <form className="form form-login" onSubmit={registerHandler}>
                    <div className="row">
                        <div className="input-field col s12">
                            <input
                                type="email"
                                name="email"
                                className="validate"
                                onChange={changeHandler}
                            />
                            <label htmlFor="email">Email</label>
                        </div>
                        <div className="input-field col s12">
                            <input
                                type="password"
                                name="password"
                                className="validate"
                                onChange={changeHandler}
                            />
                            <label htmlFor="password">Password</label>
                        </div>
                    </div>
                    <div className="row">
                        <button
                            className="waves-effect waves-light btn blue"
                            type="submit"
                        >
                            Зареєструватись
                        </button>
                        <Link to="/login" className="btn-outline btn-reg">Вже є акаунт?</Link>
                    </div>
                    {error && <div className="error">{error}</div>}
                </form>
            </div>
        </div>
    );
};


const Login = () => {
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

    const loginHandler = async (event) => {
        event.preventDefault();
        try {
            const response = await axios.post('http://localhost:8080/api/auth/login', form, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            localStorage.setItem('token', response.data.token);
            localStorage.setItem('userId', response.data.userId); // Збереження ID користувача
            setIncomes([]); // Очищення стану
            setExpenses([]); // Очищення стану
            getIncomes(response.data.userId); // Завантаження нових даних
            getExpenses(response.data.userId); // Завантаження нових даних
            navigate('/dashboard');
        } catch (error) {
            console.error("Login error:", error);
            setError('Не вдалося ввійти. Будь ласка, перевірте свої дані.');
        }
    };

    return (
        <div className="container">
            <div className="auth-page">
                <h3>Авторизація</h3>
                <form className="form form-login" onSubmit={loginHandler}>
                    <div className="row">
                        <div className="input-field col s12">
                            <input
                                type="email"
                                name="email"
                                className="validate"
                                onChange={changeHandler}
                            />
                            <label htmlFor="email">Email</label>
                        </div>
                        <div className="input-field col s12">
                            <input
                                type="password"
                                name="password"
                                className="validate"
                                onChange={changeHandler}
                            />
                            <label htmlFor="password">Password</label>
                        </div>
                    </div>
                    <div className="row">
                        <button
                            className="waves-effect waves-light btn blue"
                            type="submit"
                        >
                            Ввійти
                        </button>
                        <Link to="/register" className="btn-outline btn-reg">Немає акаунта?</Link>
                    </div>
                    {error && <div className="error">{error}</div>}
                </form>
            </div>
        </div>
    );
};


export { Login, Register };
