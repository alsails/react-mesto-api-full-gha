import React from "react";

class Api extends React.Component {
  constructor({ baseUrl, headers }, props) {
    super(props);
    this.baseUrl = baseUrl;
    this.headers = headers;
  }

  _checkResponse(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
  }

  _request(endpoint, options) {
    return fetch(`${this.baseUrl}/${endpoint}`, options,).then(this._checkResponse).then(res => {return res.data})
  }

  getInitialCards() {
    return this._request(`cards`, {
      method: 'GET',
      headers: this.headers,
      credentials: 'include'
    })
  }

  getUserInfo() {
    return this._request(`users/me`, {
      method: 'GET',
      headers: this.headers,
      credentials: 'include',
    })
  }

  updateUserAvatar(data) {
    return this._request(`users/me/avatar`, {
      method: 'PATCH',
      body: JSON.stringify({
        avatar: data.avatar
      }),
      headers: this.headers,
      credentials: 'include',
    })
  }

  updateUserInfo(data) {
    return this._request(`users/me`, {
      method: 'PATCH',
      body: JSON.stringify({
        name: data.name,
        about: data.about
      }),
      headers: this.headers,
      credentials: 'include',
    })
  }

  addNewCard(data) {
    return this._request(`cards`, {
      method: 'POST',
      body: JSON.stringify({
        name: data.name,
        link: data.link
      }),
      headers: this.headers,
      credentials: 'include'
    })
  }

  delCard(data) {
    return this._request(`cards/${data}`, {
      method: 'DELETE',
      headers: this.headers,
      credentials: 'include',
    })
  }

  delLike(data) {
    return this._request(`cards/${data}/likes`, {
      method: 'DELETE',
      headers: this.headers,
      credentials: 'include',
    })
  }

  putLike(data) {
    return this._request(`cards/${data}/likes`, {
      method: 'PUT',
      headers: this.headers,
      credentials: 'include',
    })
  }
}

const api = new Api({
  baseUrl: process.env.NODE_ENV === 'production' ? 'https://api.mesto.for.photos.nomoredomains.monster' : 'http://localhost:3000',
  headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json'
  }
});

export default api;