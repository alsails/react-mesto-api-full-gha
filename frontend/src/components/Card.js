import {useContext} from "react";
import { CurrentUserContext } from '../contexts/CurrentUserContext.js'
import '../index.css'

function Card({card, onCardClick, onCardLike, onDeleteCard}) {
    const currentUser = useContext(CurrentUserContext)
    const isOwn = card.owner._id === currentUser._id
    const isLiked = card.likes.some(i => i._id === currentUser._id)
    const cardLikeButtonClassName = ( 
        `card__like ${isLiked && 'card__like_active'}` 
    )

    function handleClick() {
        onCardClick(card);
    }  

    function handleLikeClick() {
        onCardLike(card);
    } 

    function handleDeleteClick() {
        onDeleteCard(card);
    } 

    return (
        <li className="card">
            {isOwn &&  <button type="button" className="card__trash" onClick={handleDeleteClick}/>}
            <img src={card.link} alt={card.name} className="card__img" onClick={handleClick}/>
            <div className="card__info">
                <h2 className="card__name">{card.name}</h2>
                <div className="card__likes">
                    <button type="button" className={cardLikeButtonClassName} onClick={handleLikeClick}/>
                    <p className="card__like-number">{card.likes.length}</p>
                </div>
            </div>
        </li>
    );
}

export default Card;