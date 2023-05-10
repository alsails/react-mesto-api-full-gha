const BASE_URL = process.env.NODE_ENV === 'production' ? 'https://api.mesto.for.photos.nomoredomains.monster' : 'http://localhost:3000';

function checkResponse(res) {
    if (res.ok) {
        return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
}

function request(endpoint, options) {
    return fetch(`${BASE_URL}/${endpoint}`, options).then(checkResponse).then(res => {return res.data})
}

export const signup = ({ password, email }) => {
    return request(`signup`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ password, email })
    })
};

export const signin = (email, password) => {
    return request(`signin`, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        credentials: 'include',
        body: JSON.stringify({ email, password }),
    })
    .then((res) => {
        if (res.jwt) {
            localStorage.setItem('token', res.jwt);
        }
    })
};

export const checkToken = () => {
    return request(`users/me`, {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
        credentials: 'include',
    })
        .then(data => { return data })
}
