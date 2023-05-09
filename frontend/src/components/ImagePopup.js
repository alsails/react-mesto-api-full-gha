import React from "react";
import '../index.css'

function ImagePopup({isOpened, onClose, card}) {
    return (
        <div className={`popup popup_type_photos  ${isOpened ? `popup_opened` : ""}`} id="photo">
            <div className="popup__photo ">
                <button type="button" id="photo-close" className="popup__close-button popup__close-button_photo" onClick={onClose}></button>
                <img src={card.link} alt={card.name} className="popup__img" />
                <p className="popup__description">{card.name}</p>
            </div>
        </div>
    );
}

export default ImagePopup;