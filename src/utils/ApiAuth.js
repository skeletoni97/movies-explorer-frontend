class ApiAuth {
  constructor({ baseUrl, headers }) {
    this._headers = headers;
    this._baseUrl = baseUrl;
  }
  postUser(name, email, password) {
    return fetch(`${this._baseUrl}/signup`, {
      method: "POST",
      headers: this._headers,
      body: JSON.stringify({
        password: `${password}`,
        email: `${email}`,
        name: `${name}`,
      }),
    }).then(this._checkResponse);
  }

  authorization(email, password) {
    return fetch(`${this._baseUrl}/signin`, {
      method: "POST",
      headers: this._headers,
      body: JSON.stringify({ email, password }),
    })
      .then(this._checkResponse)
      .catch((err) => {
        console.log(err);
      });
  }

  checkTokenUser(token) {
    return fetch(`${this._baseUrl}/users/me`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    }).then(this._checkResponse);
  }

  _checkResponse(res) {
    if (!res.ok) {
      return Promise.reject(`Error: ${res.status}`);
    }
    return res.json();
  }
}

export const apiAuth = new ApiAuth({
  baseUrl: "https://api.skeletoni97.nomoredomains.monster",
  headers: {
    "Content-Type": "application/json",
  },
});
