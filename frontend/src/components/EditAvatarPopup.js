import { useEffect } from "react";
import { useForm } from "../hooks/useForm"
import PopupWithForm from "./PopupWithForm";
import '../index.css'

function EditAvatarPopup({ isOpened, onClose, onUpdateAvatar, status }) {
    const { values, handleChange, setValues } = useForm({});

    useEffect(() => {
        if (isOpened) {
          setValues({});
        }
      }, [isOpened]);


    function handleSubmit(e) {
        e.preventDefault();

        onUpdateAvatar({
            avatar: values.avatar,
        });
    }

    return (
        <PopupWithForm
            name='avatar'
            title='Обновить аватар'
            buttonText={status ? 'Сохранение...' : 'Сохранить'}
            isOpen={isOpened}
            onClose={onClose}
            onSubmit={handleSubmit}
        >
            <input id="avatar-input" type="url" className="form__input" name="avatar" placeholder="Ссылка на картинку"
                required value={values.avatar || ""} onChange={handleChange} />
            <span id="avatar-input-error" className="form__error form__error-visible"></span>
        </PopupWithForm>
    );
}

export default EditAvatarPopup;