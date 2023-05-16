import React, { useState, useEffect } from "react";
import SearchForm from "../SearchForm/SearchForm";
import FilterCheckbox from "../FilterCheckbox/FilterCheckbox";
import Preloader from "../Preloader/Preloader";
import MoviesCard from "../MoviesCard/MoviesCard";
import Header from "../header/Header";
import Footer from "../footer/Footer";
import "./Movies.css";

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

      if (screenWidth < 560) {
        newVisibleCardsCount = 5;
      } else if (screenWidth < 1020) {
        newVisibleCardsCount = 8;
      } else {
        newVisibleCardsCount = 12;
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
    let increment = 3;
    const screenWidth = window.innerWidth;
    if (screenWidth < 1020) {
      increment = 2;
    }
    setVisibleCardsCount((prevCount) => prevCount + increment);
  };

  const isShowMoreButtonVisible = visibleCardsCount < movies.length; // кнопка "Показать больше" видна, если количество видимых карточек меньше общего количества карточек

  const visibleMovies = isShortFilmsOnly
    ? movies.filter(
        (movie) =>
          movie.duration <= 40 &&
          movie.nameRU.toLowerCase().includes(search.toLowerCase())
      )
    : movies.filter((movie) =>
        movie.nameRU.toLowerCase().includes(search.toLowerCase())
      );

  return (
    <>
      <Header isLogin={isLogin} />
      <main className="main">
        <section className="movies">
          <SearchForm onSearch={handleSearch} />
          <FilterCheckbox
            label="Короткометражки"
            isChecked={isShortFilmsOnly}
            onChange={handleFilterCheckboxChange}
          />
          {isLoading && <Preloader />}
          {isError && (
            <div className="movies__error">Нужно ввести ключевое слово</div>
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
          {isShowMoreButtonVisible &&
            visibleMovies.length >= 12 &&
            !isError && (
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
