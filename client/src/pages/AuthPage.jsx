import React, {useContext, useEffect, useState} from 'react';
import { Titles } from '../constants/Titles';
import {useHttp} from "../hooks/http.hook";
import {useMessage} from "../hooks/message.hook";
import {AuthContext} from "../context/AuthContext";
import Loader from "../components/Loader";

const AuthPage = () => {
    const auth = useContext(AuthContext);
    const message = useMessage();
    const { loading, clearError, error, request } = useHttp();
    const [form, setForm] = useState({
        email: '',
        password: ''
    })

    useEffect(() => {
        message(error);
        clearError();
    }, [error, message, clearError])

    const handleChange = e => {
        setForm({ ...form, [e.target.name]: e.target.value })
    }

    const handleRegister = async () => {
        try {
            const data = await request('api/auth/register', 'POST', {...form});
            if (data.message) {
                message(data.message);
            }
        } catch (e) {}
    }

    const handleLogin = async () => {
        try {
           const data = await request('api/auth/login', 'POST', {...form});
            auth.login(data.token, data.userId);
        } catch (e) {}
    }

    return (
        <div className="row">
            <div className="col s6 offset-s3">
                <h1>{Titles.appLogo}</h1>
                <div className="card blue-grey darken-1">
                    <div className="card-content white-text">
                            <span className="card-title auth-title">{Titles.auth}</span>
                        <div>
                            <div className="input-field">
                                <input
                                    id="email"
                                    type="text"
                                    name="email"
                                    className="yellow-input"
                                    onChange={handleChange}
                                />
                                    <label htmlFor="email">{Titles.email}</label>
                            </div>
                            <div className="input-field">
                                <input
                                    id="password"
                                    type="password"
                                    name="password"
                                    className="yellow-input"
                                    onChange={handleChange}
                                />
                                    <label htmlFor="password">{Titles.password}</label>
                            </div>
                        </div>
                    </div>
                    <div className="card-action">
                        {loading ? (
                            <Loader />
                        ) : (
                            <>
                                <button
                                    className="waves-effect btn yellow darken-4"
                                    style={{ margin: "3px" }}
                                    onClick={handleLogin}
                                >
                                    {Titles.logIn}
                                </button>
                                <button
                                className="waves-effect btn grey lighten-1 black-text"
                                style={{ margin: "3px" }}
                                onClick={handleRegister}
                                >
                                {Titles.signUp}
                                </button>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AuthPage;