export default class Api {
  constructor(options) {
    this._url = options.baseUrl;
    this._headers = options.headers;
    this._token = options.headers.authorization;
  }

  getInfo() {
    return fetch(`${this._url}/users/me`, {
      method: "GET",
      headers: {
        authorization: this._token,
      },
    }).then((res) => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject();
    });
  }
  setInfo(data) {
    return fetch(`${this._url}/users/me`, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify({
        name: data.name,
        about: data.job,
        avatar: data.avatar,
      }),
    }).then((res) => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject();
    });
  }
  setAvatar(data) {
    return fetch(`${this._url}/users/me/avatar`, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify({
        name: data.name,
        about: data.job,
        avatar: data.avatar,
      }),
    }).then((res) => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject();
    });
  }

  getCards() {
    return fetch(`${this._url}/cards`, {
      method: "GET",
      headers: {
        authorization: this._token,
      },
    }).then((res) => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject();
    });
  }
  addCard(data) {
    return fetch(`${this._url}/cards`, {
      method: "POST",
      headers: this._headers,
      body: JSON.stringify({
        name: data.title,
        link: data.link,
      }),
    }).then((res) => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject();
    });
  }
  deleteCard(cardId) {
    return fetch(`${this._url}/cards/${cardId}`, {
      method: "DELETE",
      headers: {
        authorization: this._token,
      },
    }).then((res) => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject();
    });
  }

  addLike(cardId) {
    return fetch(`${this._url}/cards/${cardId}/likes`, {
      method: "PUT",
      headers: {
        authorization: this._token,
      },
    }).then((res) => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject();
    });
  }
  deleteLike(cardId) {
    return fetch(`${this._url}/cards/${cardId}/likes`, {
      method: "DELETE",
      headers: {
        authorization: this._token,
      },
    }).then((res) => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject();
    });
  }
}
