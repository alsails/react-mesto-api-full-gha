import React from "react";

class Api extends React.Component {
  constructor({ headers }, props) {
    super(props);
    this.headers = headers;
  }

  _checkResponse(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
  }

  _request(endpoint, options) {
    return fetch(`/${endpoint}`, options).then(this._checkResponse).then(res => {return res.data})
  }

  getInitialCards() {
    return this._request(`cards`, {
      method: 'GET',
      headers: this.headers
    })
  }

  getUserInfo() {
    return this._request(`users/me`, {
      method: 'GET',
      headers: this.headers
    })
  }

  updateUserAvatar(data) {
    return this._request(`users/me/avatar`, {
      method: 'PATCH',
      body: JSON.stringify({
        avatar: data.avatar
      }),
      headers: this.headers
    })
  }

  updateUserInfo(data) {
    return this._request(`users/me`, {
      method: 'PATCH',
      body: JSON.stringify({
        name: data.name,
        about: data.about
      }),
      headers: this.headers
    })
  }

  addNewCard(data) {
    return this._request(`cards`, {
      method: 'POST',
      body: JSON.stringify({
        name: data.name,
        link: data.link
      }),
      headers: this.headers
    })
  }

  delCard(data) {
    return this._request(`cards/${data}`, {
      method: 'DELETE',
      headers: this.headers
    })
  }

  delLike(data) {
    return this._request(`cards/${data}/likes`, {
      method: 'DELETE',
      headers: this.headers
    })
  }

  putLike(data) {
    return this._request(`cards/${data}/likes`, {
      method: 'PUT',
      headers: this.headers
    })
  }
}

const api = new Api({
  headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json'
  }
});

export default api;