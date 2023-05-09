import { useEffect } from "react";
import PopupWithForm from "./PopupWithForm";
import { useForm } from "../hooks/useForm"
import '../index.css'

function AddPlacePopup({ isOpened, onClose, onAddCard, status }) {

  const { values, handleChange, setValues } = useForm({});

  useEffect(() => {
    if (isOpened) {
      setValues({});
    }
  }, [isOpened]);

  function handleSubmit(e) {
    e.preventDefault();

    onAddCard({
      name: values.name,
      link: values.link,
    });
  }

  return (
    <PopupWithForm
      name='cards'
      title='Новое место'
      buttonText={status ? 'Создание...' : 'Создать'}
      isOpen={isOpened}
      onClose={onClose}
      onSubmit={handleSubmit}
    >
      <input id="title-input" type="text" className="form__input" name="name" placeholder="Название" required
        minLength="2" maxLength="30" value={values.name || ""} onChange={handleChange} />
      <span id="title-input-error" className="form__error form__error-visible"></span>
      <input id="link-input" type="url" className="form__input" name="link" placeholder="Ссылка на картинку"
        required value={values.link || ""} onChange={handleChange} />
      <span id="link-input-error" className="form__error form__error-visible"></span>
    </PopupWithForm>
  );
}

export default AddPlacePopup;