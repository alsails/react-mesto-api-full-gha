import { useContext, useEffect } from "react";
import PopupWithForm from "./PopupWithForm";
import { useForm } from "../hooks/useForm"
import { CurrentUserContext } from "../contexts/CurrentUserContext.js";
import '../index.css'

function EditProfilePopup({onUpdateUser, isOpened, onClose, status }) {
    const currentUser = useContext(CurrentUserContext)

    const { values, handleChange, setValues } = useForm({});

    useEffect(() => {
        if (isOpened) {
            setValues({
                name: currentUser.name,
                description: currentUser.about
            });
        }
      }, [isOpened, currentUser]);

    function handleSubmit(e) {
        e.preventDefault();

        onUpdateUser({
            name: values.name,
            about: values.description
        });
    }

    return (
        <PopupWithForm
            name='profile'
            title='Редактировать профиль'
            buttonText={status ? 'Сохранение...' : 'Сохранить'}
            isOpen={isOpened}
            onClose={onClose}
            onSubmit={handleSubmit}
        >
            <input type="text" id="name-input" className="form__input" name="name" placeholder="Ваше Имя" required
                minLength="2" maxLength="40" value={values.name || ""} onChange={handleChange} />
            <span id="name-input-error" className="form__error form__error-visible"></span>
            <input id="description-input" type="text" className="form__input" name="description" placeholder="О вас"
                required minLength="2" maxLength="200" value={values.description || ""} onChange={handleChange} />
            <span id="description-input-error" className="form__error form__error-visible"></span>
        </PopupWithForm>
    );
}

export default EditProfilePopup;
