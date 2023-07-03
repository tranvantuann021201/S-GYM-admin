/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState } from "react";
import { login } from "../controllers/LoginController";
import "../styles/Login.css"

function LoginScreen({ onLogin }) {
    // React States
    const [errorMessages, setErrorMessages] = useState({});

    const handleSubmit = (event) => {
        //Prevent page reload
        event.preventDefault();

        var { uname, pass } = document.forms[0];

        const result = login(uname.value, pass.value);

        if (result.success) {
            onLogin();
        } else {
            setErrorMessages({ message: result.error });
        }
    };

    // Generate JSX code for error message
    const renderErrorMessage = () =>
        errorMessages.message && <div className="error">{errorMessages.message}</div>;

    return (
        <div className="form">
            <form onSubmit={handleSubmit}>
                <div className="input-container">
                    <label>Tài khoản </label>
                    <input type="text" name="uname" required />
                    {renderErrorMessage()}
                </div>
                <div className="input-container">
                    <label>Mật khẩu </label>
                    <input type="password" name="pass" required />
                    {renderErrorMessage()}
                </div>
                <a href="#" className="text-color">Đăng ký</a>
                <a href="#" className="text-color" style={{ marginLeft: 80 }}>Quên mật khẩu?</a>
                <div className="button-container">
                    <input type="submit" value="Đăng nhập" />
                </div>

            </form>
        </div>
    );
}

export default LoginScreen;
