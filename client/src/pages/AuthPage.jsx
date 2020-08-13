import React, {useState} from 'react';
import { Titles } from '../constants/Titles';

const AuthPage = () => {
    const [form, setForm] = useState({
        email: '',
        password: ''
    })

    const handleChange = e => {
        setForm({ ...form, [e.target.name]: e.target.value })
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
                                    placeholder="Enter email"
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
                                    placeholder="Enter password"
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
                        <button className="waves-effect btn yellow darken-4" style={{ margin: "3px" }}>
                            {Titles.logIn}
                        </button>
                        <button className="waves-effect btn grey lighten-1 black-text" style={{ margin: "3px" }}>
                            {Titles.signUp}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AuthPage;