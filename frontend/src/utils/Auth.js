// const BASE_URL = 'http://127.0.0.1:3001';

function checkResponse(res) {
    if (res.ok) {
        return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
}

function request(endpoint, options) {
    return fetch(`/${endpoint}`, options).then(checkResponse)
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
        body: JSON.stringify({ email, password })
    })
    .then((res) => {
        if (res.data.jwt) {
            localStorage.setItem('token', res.data.jwt);
        }
    })
};

export const checkToken = () => {
    return request(`users/me`, {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        }
    })
        .then(data => { return data })
}
