import React from "react";
import '../index.css'

import { Link } from "react-router-dom";

function AuthenticationForm({title, buttonText, loginLink, values, handleChange, onSubmit}) {
    return (
        <div className="authentication">
            <h2 className="authentication__title">{title}</h2>
            <form action="submit" className="authentication-form" onSubmit={onSubmit}>
                <input className="authentication-form__input" id="email-input" type="email" name="email" placeholder="Email"
                required value={values.email || ""} onChange={handleChange}/>
                <input className="authentication-form__input"  id="password-input" type="password" name="password" placeholder="Пароль"
                required value={values.password || ""} onChange={handleChange}/>
                <button className="authentication-form__save-button">{buttonText}</button>
                {loginLink && <Link to="/sign-in" className="authentication-form__login-link">
                    Уже зарегистрированы? Войти
                </Link>}
            </form>
        </div>
    );
}

export default AuthenticationForm;