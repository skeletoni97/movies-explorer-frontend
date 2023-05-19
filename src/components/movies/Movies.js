import React, { useState, useEffect } from "react";
import SearchForm from "../SearchForm/SearchForm";
import FilterCheckbox from "../FilterCheckbox/FilterCheckbox";
import Preloader from "../Preloader/Preloader";
import MoviesCard from "../MoviesCard/MoviesCard";
import Header from "../header/Header";
import Footer from "../footer/Footer";
import "./Movies.css";
import {
  SHORT_FILM_DURATION,
  MAX_DISPLAY_START,
  MAX_DISPLAY_ADD,
  MID_DISPLAY,
  MID_DISPLAY_START,
  MIN_DISPLAY_ADD,
  MIN_DISPLAY,
  MIN_DISPLAY_START,
} from "../../utils/const";

function Movies({
  isLogin,
  movies,
  addMovie,
  deleteMovie,
  myMovies,
  isLoading,
}) {
  const [search, setSearch] = useState("");
  const [isError, setIsError] = useState(false);
  const [isShortFilmsOnly, setIsShortFilmsOnly] = useState(false);
  const [visibleCardsCount, setVisibleCardsCount] = useState(12);
  const [savedDataLoaded, setSavedDataLoaded] = useState(false);

  useEffect(() => {
    const getSavedData = () => {
      const savedData = localStorage.getItem("moviesData");
      if (savedData) {
        const { searchQuery, shortFilmsOnly } = JSON.parse(savedData);
        setSearch(searchQuery);
        setIsShortFilmsOnly(shortFilmsOnly);
      }
      setSavedDataLoaded(true);
    };
    getSavedData();
  }, []);

  useEffect(() => {
    const saveData = () => {
      const data = {
        searchQuery: search,
        shortFilmsOnly: isShortFilmsOnly,
      };
      localStorage.setItem("moviesData", JSON.stringify(data));
    };
    if (savedDataLoaded) {
      saveData();
    }
  }, [search, isShortFilmsOnly, savedDataLoaded]);

  useEffect(() => {
    function updateVisibleCardsCount() {
      const screenWidth = window.innerWidth;
      let newVisibleCardsCount;

      if (screenWidth < MIN_DISPLAY) {
        newVisibleCardsCount = MIN_DISPLAY_START;
      } else if (screenWidth < MID_DISPLAY) {
        newVisibleCardsCount = MID_DISPLAY_START;
      } else {
        newVisibleCardsCount = MAX_DISPLAY_START;
      }
      setVisibleCardsCount(newVisibleCardsCount);
    }

    window.addEventListener("resize", updateVisibleCardsCount);
    updateVisibleCardsCount();

    return () => {
      window.removeEventListener("resize", updateVisibleCardsCount);
    };
  }, []);

  function handleSearch(searchQuery) {
    if (!searchQuery) {
      // проверка на пустое значение
      setIsError(true);
      return;
    }
    setIsError(false);
    setSearch(searchQuery);
  }

  const handleFilterCheckboxChange = () => {
    setIsShortFilmsOnly(!isShortFilmsOnly);
  };

  const handleShowMoreButtonClick = () => {
    let increment = MAX_DISPLAY_ADD;
    const screenWidth = window.innerWidth;
    if (screenWidth < MID_DISPLAY) {
      increment = MIN_DISPLAY_ADD;
    }
    setVisibleCardsCount((prevCount) => prevCount + increment);
  };

  const isShowMoreButtonVisible = visibleCardsCount < movies.length; // кнопка "Показать больше" видна, если количество видимых карточек меньше общего количества карточек

  const visibleMovies = isShortFilmsOnly
    ? movies.filter(
        (movie) =>
          movie.duration <= SHORT_FILM_DURATION &&
          movie.nameRU.toLowerCase().includes(search.toLowerCase())
      )
    : movies.filter((movie) =>
    
       movie.nameRU.toLowerCase().includes(search.toLowerCase())
      );
console.log(visibleMovies.length)
  return (
    <>
      <Header isLogin={isLogin} />
      <main className="main">
        <section className="movies">
          <SearchForm onSearch={handleSearch} search={search}/>
          <FilterCheckbox
            label="Короткометражки"
            isChecked={isShortFilmsOnly}
            onChange={handleFilterCheckboxChange}
          />
          {isLoading && <Preloader />}
          {isError && (
            <div className="movies__error">Нужно ввести ключевое слово.</div>
          )}
          {!isLoading && !isError && visibleMovies.length === 0 && (
            <div className="movies__error">Ничего не найдено.</div>
          )}
          {!isLoading && !isError && (
            <div className="movies-card-list">
              {visibleMovies.slice(0, visibleCardsCount).map((movie) => (
                <MoviesCard
                  myMovies={myMovies}
                  deleteMovie={deleteMovie}
                  key={movie.id}
                  addMovie={addMovie}
                  movie={movie}
                  isShortFilm={isShortFilmsOnly}
                />
              ))}
            </div>
          )}
          {!isLoading && isShowMoreButtonVisible && visibleMovies.length >= 12 && !isError && (
              <div className="show-more">
                <button
                  className="show-more__button"
                  onClick={handleShowMoreButtonClick}
                >
                  Ещё
                </button>
              </div>
            )}
        </section>
      </main>
      <Footer />
    </>
  );
}

export default Movies;
