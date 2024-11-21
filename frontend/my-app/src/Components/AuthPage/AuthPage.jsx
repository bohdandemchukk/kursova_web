import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import "./AuthPage.scss";

const Login = () => {
    const [form, setForm] = useState({
        email: '',
        password: ''
    });
    const navigate = useNavigate();

    const changeHandler = (event) => {
        setForm({ ...form, [event.target.name]: event.target.value });
        console.log(form); // Додано для дебаггінгу
    };

    const loginHandler = async () => {
        console.log("Login handler called"); // Додано для дебаггінгу
        try {
            const response = await axios.post('/api/auth/login', { ...form }, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            console.log(response.data); // Додано для дебаггінгу
            localStorage.setItem('token', response.data.token);
            localStorage.setItem('userEmail', response.data.email);
            navigate('/dashboard');
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div className="container">
            <div className="auth-page">
                <h3>Авторизація</h3>
                <form className="form form-login" onSubmit={e => e.preventDefault()}>
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
                            onClick={loginHandler}
                        >
                            Ввійти
                        </button>
                        <Link to="/register" className="btn-outline btn-reg">Немає акаунта?</Link>
                    </div>
                </form>
            </div>
        </div>
    );
};

const Register = () => {
    const [form, setForm] = useState({
        email: '',
        password: ''
    });
    const navigate = useNavigate();

    const changeHandler = (event) => {
        setForm({ ...form, [event.target.name]: event.target.value });
        console.log(form); // Додано для дебаггінгу
    };

    const registerHandler = async () => {
        console.log("Register handler called"); // Додано для дебаггінгу
        try {
            await axios.post('/api/auth/register', { ...form }, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            navigate('/login');
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div className="container">
            <div className="auth-page">
                <h3>Реєстрація</h3>
                <form className="form form-login" onSubmit={e => e.preventDefault()}>
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
                            onClick={registerHandler}
                        >
                            Зареєструватись
                        </button>
                        <Link to="/login" className="btn-outline btn-reg">Вже є акаунт?</Link>
                    </div>
                </form>
            </div>
        </div>
    );
};

export { Login, Register };
