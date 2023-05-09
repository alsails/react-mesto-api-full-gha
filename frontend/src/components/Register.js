import React from 'react';
import AuthenticationForm from "./AuthenticationForm";
import { useForm } from "../hooks/useForm"
import '../index.css'



function Register({handleRegister}) {
    const { values, handleChange } = useForm({});

    const handleSubmit = (e) => {
        e.preventDefault();
        handleRegister(values)
    }

    return (
        <AuthenticationForm
            title="Регистрация"
            buttonText="Зарегистрироваться"
            loginLink={true}
            values = {values}
            handleChange={handleChange}
            onSubmit={handleSubmit}
        />
    );
}

export default Register;