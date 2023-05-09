import React from "react";
import logo from '../images/logo.svg';
import '../index.css'
import { Link } from "react-router-dom";

function Header({buttonText, email, linkTo, onClick}) {
    return (
        <header className="header">
            <img src={logo} alt="Логотип" className="header__logo" />
            <div className="header__info">
                <p className="header__email">{email}</p>
                <Link to={linkTo} className="header__button" onClick={onClick}>
                    {buttonText} 
                </Link>
            </div>
        </header>
    );
}

export default Header;