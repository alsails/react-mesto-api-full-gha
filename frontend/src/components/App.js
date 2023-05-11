import { useEffect, useState } from 'react';
import { Route, Routes, useNavigate } from 'react-router-dom';
import '../index.css'
import Header from "./Header.js";
import Footer from "./Footer.js";
import Main from "./Main.js";
import Login from './Login.js'
import ImagePopup from "./ImagePopup.js";
import Api from '../utils/Api.js'
import { CurrentUserContext } from '../contexts/CurrentUserContext.js'
import EditProfilePopup from './EditProfilePopup';
import EditAvatarPopup from './EditAvatarPopup';
import AddPlacePopup from './AddPlacePopup';
import DeleteCardPopup from './DeleteCardPopup';
import Register from './Register';
import ProtectedRouteElement from "./ProtectedRoute";
import * as auth from '../utils/Auth'
import InfoTooltip from './InfoTooltip';

function App() {

  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false)
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false)
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false)
  const [isDeleteCardPopupOpen, setIsDeleteCardPopupOpen] = useState(false)
  const [isCardPopupOpen, setCardPopupOpen] = useState(false)
  const [selectedCard, setSelectedCard] = useState({})
  const [currentUser, setCurrentUser] = useState({})
  const [cards, setCards] = useState([])
  const [isStatus, setIsStatus] = useState(false)
  const [isRegisterStatus, setIsRegisterStatus] = useState(true)
  const [isLoginStatus, setIsLoginStatus] = useState(true)
  const [userEmail, setUserEmail] = useState("")

  const [isLoggedIn, setLoggedIn] = useState(false)

  const navigate = useNavigate();

  const [isInfoTooltip, setIsInfoTooltip] = useState(false)

  const isOpen = isEditAvatarPopupOpen || isEditProfilePopupOpen || isAddPlacePopupOpen || isCardPopupOpen

  
  useEffect(() => {
    if (isLoggedIn) {
      Promise.all([Api.getUserInfo(), Api.getInitialCards()])
        .then(([userData, cards]) => {
          setCurrentUser(userData);
          setCards(cards);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [isLoggedIn]);  

  useEffect(() => {
    function handleTokenCheck() {
      const token = localStorage.getItem('token');
      if (token) {
        auth.checkToken().then((res) => {
          if (res) {
            setLoggedIn(true);
            setUserEmail(res.email)
            navigate("/", { replace: true })
          }
        })
          .catch(err => {
            console.log(err);
          });
      }
    }

    handleTokenCheck();
  }, [navigate])

  function handleLogin(email, password) {
    auth.signin(email, password)
    .then(() => {
        setIsLoginStatus(true)
        setUserEmail(email)
        setLoggedIn(true)
        navigate('/')
    })
    .catch(err => {
      setIsLoginStatus(false)
      setIsInfoTooltip(true)
    })
  }

  function handleRegister(formValue) {
    auth.signup(formValue)
    .then((res) => {
        setIsRegisterStatus(true)
        navigate('/sign-in', { replace: true });
    }
    )
    .catch((err) => {
        setIsRegisterStatus(false)
    })
    .finally(() => {
        setIsInfoTooltip(true)
    })
  }

  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true)
  }

  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true)
  }

  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(true)
  }

  function handleDeleteCardClick(card) {
    setIsDeleteCardPopupOpen(true)
    setSelectedCard(card)
  }

  function handleCardClick(card) {
    setCardPopupOpen(true)
    setSelectedCard(card)
  }

  function closeAllPopups() {
    setIsEditAvatarPopupOpen(false)
    setIsEditProfilePopupOpen(false)
    setIsAddPlacePopupOpen(false)
    setCardPopupOpen(false)
    setIsDeleteCardPopupOpen(false)
    setIsInfoTooltip(false)
  }

   useEffect(() => {
    function closeByEscape(evt) {
      if (evt.key === 'Escape') {
        closeAllPopups();
      }
    }
    if (isOpen) { // навешиваем только при открытии
      document.addEventListener('keydown', closeByEscape);
      return () => {
        document.removeEventListener('keydown', closeByEscape);
      }
    }
  }, [isOpen])

  function handleCardLike(card) {
    const isLiked = card.likes.some(i => i._id === currentUser._id)

    if (!isLiked) {
      Api
        .putLike(card._id, !isLiked)
        .then((newCard) => {
          setCards((state) =>
            state.map((c) => (c._id === card._id ? newCard : c))
          )
        })
        .catch(err =>
          console.log(err))
    } else {
      Api
        .delLike(card._id, isLiked)
        .then((newCard) => {
          setCards((state) =>
            state.map((c) => (c._id === card._id ? newCard : c))
          )
        })
        .catch(err =>
          console.log(err))
    }
  }

  function handleCardDelete(card) {
    setIsStatus(true)
    Api
      .delCard(card._id)
      .then(() => {
        setCards((state) =>
          state.filter(item => item._id !== (card._id))
        )
        closeAllPopups()
      })
      .catch(err =>
        console.log(err))
      .finally(() => {
        setIsStatus(false)
      })
  }

  function handleUpdateUser(info) {
    setIsStatus(true)
    Api
      .updateUserInfo(info)
      .then((newInfo) => {
        setCurrentUser(newInfo)
        closeAllPopups()
      })
      .catch(err =>
        console.log(err))
      .finally(() => {
        setIsStatus(false)
      })
  }

  function handleUpdateAvatar(avatar) {
    setIsStatus(true)
    Api
      .updateUserAvatar(avatar)
      .then((newInfo) => {
        setCurrentUser(newInfo)
        closeAllPopups()
      })
      .catch(err =>
        console.log(err))
      .finally(() => {
        setIsStatus(false)
      })
  }

  function handleAddPlaceSubmit(data) {
    setIsStatus(true)
    Api
      .addNewCard(data)
      .then((newCard) => {
        setCards([newCard, ...cards])
        closeAllPopups();
      })
      .catch((err) => {
        console.log(err)
      })
      .finally(() => {
        setIsStatus(false)
      })
  }

  function signOut() {
    localStorage.removeItem('token');

    navigate('/sign-in');
  }

  return (
    <div className="root">
      <div className="page">
        <CurrentUserContext.Provider value={currentUser}>
          <Routes>
            <Route path="/sign-up" element={
              <>
                <Header
                  buttonText="Войти"
                  linkTo="/sign-in" />
                <Register handleRegister={handleRegister} />
              </>
            } />
            <Route path="/sign-in" element={
              <>
                <Header
                  buttonText="Регистрация"
                  linkTo="/sign-up" />
                <Login handleLogin={handleLogin} />
              </>
            } />
            <Route path="/" element={
              <>
                <Header
                  buttonText="Выйти"
                  linkTo="/sign-in"
                  email={userEmail}
                  onClick={signOut}
                />
                <ProtectedRouteElement element={Main} loggedIn={isLoggedIn}
                  onEditProfile={handleEditProfileClick}
                  onAddPlace={handleAddPlaceClick}
                  onEditAvatar={handleEditAvatarClick}
                  onDeleteCard={handleDeleteCardClick}
                  onCardClick={handleCardClick}
                  onCardLike={handleCardLike}
                  cards={cards}
                />
                <Footer />
              </>
            } />
          </Routes>

          <InfoTooltip
            isOpen={isInfoTooltip}
            onClose={closeAllPopups}
            statusRegister ={isRegisterStatus}
            statusLogin = {isLoginStatus}
          />

          <EditProfilePopup
            isOpened={isEditProfilePopupOpen}
            onClose={closeAllPopups}
            onUpdateUser={handleUpdateUser}
            status={isStatus}
          />
          <DeleteCardPopup
            card={selectedCard}
            isOpened={isDeleteCardPopupOpen}
            onClose={closeAllPopups}
            onDelCard={handleCardDelete}
            status={isStatus}
          />
          <AddPlacePopup
            isOpened={isAddPlacePopupOpen}
            onClose={closeAllPopups}
            onAddCard={handleAddPlaceSubmit}
            status={isStatus}
          />

          <EditAvatarPopup
            isOpened={isEditAvatarPopupOpen}
            onClose={closeAllPopups}
            onUpdateAvatar={handleUpdateAvatar}
            status={isStatus}
          />

          <ImagePopup
            card={selectedCard}
            isOpened={isCardPopupOpen}
            onClose={closeAllPopups}
          />
        </CurrentUserContext.Provider>
      </div>
    </div>
  );
}

export default App;
