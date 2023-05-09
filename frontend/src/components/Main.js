import { useContext } from "react";
import Card from "./Card.js";
import { CurrentUserContext } from "../contexts/CurrentUserContext.js";
import "../index.css";

function Main({
  onEditAvatar,
  onEditProfile,
  onAddPlace,
  onCardClick,
  cards,
  onCardLike,
  onDeleteCard,
}) {
  const currentUser = useContext(CurrentUserContext);

  console.log(cards)
  return (
    <main>
      <section className="profile">
        <div className="profile__img-container" onClick={onEditAvatar}>
          <img
            src={currentUser.avatar}
            alt={currentUser.name}
            className="profile__img"
          />
        </div>
        <div className="profile__info">
          <h1 className="profile__name">{currentUser.name}</h1>
          <p className="profile__description">{currentUser.about}</p>
          <button
            type="button"
            className="profile__edit-button"
            onClick={onEditProfile}
          />
        </div>
        <button
          type="button"
          className="profile__add-button"
          onClick={onAddPlace}
        />
      </section>
      <section className="places">
        <ul className="cards">
          {cards.map((card) => (
            <Card
              key={card._id}
              card={card}
              onCardClick={onCardClick}
              onCardLike={onCardLike}
              onDeleteCard={onDeleteCard}
            />
          ))}
        </ul>
      </section>
    </main>
  );
}

export default Main;
