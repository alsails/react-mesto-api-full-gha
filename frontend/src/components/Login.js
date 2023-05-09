import React from 'react';
import AuthenticationForm from "./AuthenticationForm";
import { useForm } from "../hooks/useForm"
import '../index.css'

function Login({ handleLogin }) {

    const { values, handleChange } = useForm({});

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!values.email || !values.password) {
            return;
        }
        handleLogin(values.email, values.password)
    }

    return (
        <AuthenticationForm
            title="Вход"
            buttonText="Войти"
            loginLink={false}
            values = {values}
            handleChange={handleChange}
            onSubmit={handleSubmit}
        />
    );
}

export default Login;