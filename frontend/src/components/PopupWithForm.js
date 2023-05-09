import React from "react";
import '../index.css'

function PopupWithForm({name, title, children, buttonText, isOpen, onClose, onSubmit}) {
    return (
        <div className={`popup popup_type_${name} ${isOpen ? `popup_opened` : ""}`} id={`${name}`}>
            <div className="popup__container">
                <button type="button" id="profile-close" className="popup__close-button" onClick={onClose}></button>
                <h2 className="popup__title">{title}</h2>
                <form action="submit" className="form" name={`${name}`} onSubmit={onSubmit}>
                    {children}
                    <button type="submit" className="form__save-button">{buttonText || 'Сохранить'}</button>
                </form>
            </div>
        </div>
    );
}

export default PopupWithForm;