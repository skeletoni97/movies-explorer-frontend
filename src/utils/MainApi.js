class MainApi {
  constructor({ baseUrl, headers }) {
    this._headers = headers;
    this._baseUrl = baseUrl;
  }

  _getToken() {
    return {
      authorization: `Bearer ${localStorage.getItem("token")}`,
    };
  }

  _getResponseData(res) {
    if (!res.ok) {
      return Promise.reject(`Ошибка: ${res.status}`);
    }
    return res.json();
  }

  getProfile() {
    return fetch(`${this._baseUrl}/users/me`, {
      headers: { ...this._headers, ...this._getToken() },
    }).then((res) => this._getResponseData(res));
  }

  editProfile(data) {
    return fetch(`${this._baseUrl}/users/me`, {
      method: "PATCH",
      headers: { ...this._headers, ...this._getToken() },
      body: JSON.stringify(data),
    }).then((res) => this._getResponseData(res));
  }

  getSaveMovie() {
    return fetch(`${this._baseUrl}/movies`, {
      method: "get",
      headers: { ...this._headers, ...this._getToken() },
    }).then((res) => this._getResponseData(res));
  }
  
  addMovie(movie, user) {
    return fetch(`${this._baseUrl}/movies`, {
      method: "POST",
      headers: this._headers,
      body: JSON.stringify({
        country: `${movie.country}`,
        director: `${movie.director}`,
        duration: `${movie.duration}`,
        year: `${movie.year}`,
        description: `${movie.description}`,
        image: `https://api.nomoreparties.co/${movie.image.url}`,
        trailerLink: `${movie.trailerLink}`,
        thumbnail: `https://api.nomoreparties.co/${movie.image.formats.thumbnail.url}`,
        movieId: `${movie.id}`,
        nameRU: `${movie.nameRU}`,
        nameEN: `${movie.nameEN}`,
      }),
    }).then((res) => this._getResponseData(res));
  }

  deleteMovie(movie) {
    return fetch(`${this._baseUrl}/movies/${movie._id}`, {
      method: "DELETE",
      headers: this._headers,
    }).then((res) => this._getResponseData(res));
  }
}

export const mainApi = new MainApi({
  baseUrl: "https://api.skeletoni97.nomoredomains.monster",
  headers: {
    authorization: `Bearer ${localStorage.getItem("token")}`,
    "Content-Type": "application/json",
  },
});
