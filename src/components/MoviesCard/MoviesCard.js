import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import "./MoviesCard.css";
import CheckMark from "../../images/check-mark.svg";
import Remove from "../../images/card-button-delete.svg";

function MoviesCard({ movie, isShortFilm }) {
  const location = useLocation().pathname;
  const [saved, setSaved] = useState(false);
  const [hovered, setHovered] = useState(false);

  function handleMouseEnter() {
    setHovered(true);
  }

  function handleMouseLeave() {
    setHovered(false);
  }

  console.log(saved);
  useEffect(() => {
    if (location === "/saved-movies") {
      setSaved(true);
    }
  }, [location]);

  function handleSaveClick() {
    setSaved(!saved);
  }

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

        <img className="movies-card__image" alt="movie" src={movie.link} />
      </div>
      <div className="movies-card__info">
        <h2 className="movies-card__title">{movie.name}</h2>
        <p className="movies-card__description">{movie.time}</p>
      </div>
    </div>
  );
}
export default MoviesCard;
