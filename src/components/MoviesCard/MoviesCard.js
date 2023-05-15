import React, { useState, useEffect, useContext } from "react";
import { useLocation } from "react-router-dom";
import "./MoviesCard.css";
import CheckMark from "../../images/check-mark.svg";
import Remove from "../../images/card-button-delete.svg";
import {CurrentUserContext} from '../../context/CurrentContext';

function MoviesCard({ movie, isShortFilm, deleteMovie, addMovie, myMovies }) {
  const location = useLocation().pathname;
  const [saved, setSaved] = useState(false);
  const [hovered, setHovered] = useState(false);
  const user = useContext(CurrentUserContext);

  function handleMouseEnter() {
    setHovered(true);
  }

  function handleMouseLeave() {
    setHovered(false);
  }

  useEffect(() => {
    if (location === "/saved-movies") {
      setSaved(true);
    }
  }, [location]);

  function handleSaveClick() {
    if (location === "/saved-movies") {
        deleteMovie(movie)
        return
      } 
      
    setSaved(!saved);
    if(!saved){
      addMovie(movie, user)
    } else {
      const movies = myMovies.find((item) => item.movieId === movie.id || item.id === movie.id);
      deleteMovie(movies)
    }
  }
  function getTimeFromMins(mins) {
    let hours = Math.trunc(mins/60);
    let minutes = mins % 60;
    return hours + 'ч ' + minutes + 'м';
};

useEffect(() => {
  if (location === '/movies') {
    const saved = myMovies.find((item) => item.movieId === movie.id || item.id === movie.id);
    setSaved(saved);
  }
}, []);

  return (
    <div className="movies-card">
      <div
        className="movies-card__container"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        {location === "/saved-movies" ? (
          <button
            className={`movies-card__button ${
              saved || hovered ? "" : "movies-card__button_hidden"
            }`}
            onClick={handleSaveClick}
          >
            <img
              className="movies-card__img-Remove"
              src={Remove}
              alt="check-mark"
            />
          </button>
        ) : (
          <button
            className={`movies-card__button ${
              saved ? "movies-card__button_pink" : ""
            } ${saved || hovered ? "" : "movies-card__button_hidden"}`}
            onClick={handleSaveClick}
          >
            {saved ? (
              <img src={CheckMark} alt="check-mark" />
            ) : (
              <p className="movies-card__text-button">сохранить</p>
            )}
          </button>
        )}

        <img className="movies-card__image" alt="movie" src={location === "/movies" ? `https://api.nomoreparties.co/${movie.image.url}` : movie.image} />
      </div>
      <div className="movies-card__info">
        <h2 className="movies-card__title">{movie.nameRU}</h2>
        <p className="movies-card__description">{getTimeFromMins(movie.duration)}</p>
      </div>
    </div>
  );
}
export default MoviesCard;
