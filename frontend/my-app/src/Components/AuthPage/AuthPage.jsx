import React, {useState} from 'react';
import {BrowserRouter, Routes, Route, Link} from 'react-router-dom';
import axios from 'axios';
import "./AuthPage.scss";

const AuthPage = () => {
    const [form, setForm] = useState({
        email: '',
        password: ''
    });

    const changeHandler = (event) => {
        setForm({...form, [event.target.name]: event.target.value});
        console.log(form);
    };

    const registerHandler = async () => {
        try {
            await axios.post('api/auth/register', {...form}, {
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            .then(response => console.log(response));
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <BrowserRouter>
            <Routes>
                <React.Fragment>
                    <div className="container">
                        <div className="auth-page">
                            <Route path="/login">
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
                                        >
                                            Ввійти
                                        </button>
                                        <Link to="/register" className="btn-outline btn-reg">Немає акаунта?</Link>
                                    </div>
                                </form>
                            </Route>

                            <Route path="/register">
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
                            </Route>
                        </div>
                    </div>
                </React.Fragment>
            </Routes>
            </BrowserRouter>
    );
};

export default AuthPage;
