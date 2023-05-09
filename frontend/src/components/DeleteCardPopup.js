import React from "react";
import PopupWithForm from "./PopupWithForm";
import '../index.css'

function DeleteCardPopup({isOpened, onClose, card, status, onDelCard}) {
    function handleSubmit(e) {
        e.preventDefault();

        onDelCard(card)
    }

    return (
        <PopupWithForm
            name='delete'
            title='Вы уверены?'
            buttonText={status ? 'Удаление' : 'Удалить'}
            isOpen={isOpened}
            onClose={onClose}
            onSubmit={handleSubmit}
        >
        </PopupWithForm>
    );
}

export default DeleteCardPopup;