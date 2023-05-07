import React, { useState, useEffect } from 'react';
import SearchForm from '../SearchForm/SearchForm';
import FilterCheckbox from '../FilterCheckbox/FilterCheckbox';
import Preloader from '../Preloader/Preloader';
import MoviesCard from '../MoviesCard/MoviesCard';
import Header from '../header/Header';
import Footer from '../footer/Footer';
import './Movies.css'

function Movies({
  isLogin
}) {
  
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [isShortFilmsOnly, setIsShortFilmsOnly] = useState(false);
  const [visibleCardsCount, setVisibleCardsCount] = useState(12);

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

  const handleSearch = (searchQuery) => {
    setIsLoading(true);
    setIsError(false);

    // Здесь должен быть запрос к API для поиска фильмов по searchQuery
    // и установка результатов в состояние movies

    setIsLoading(false);
  };

  const handleFilterCheckboxChange = () => {
    setIsShortFilmsOnly(!isShortFilmsOnly);
  };


  const movies = [
    {
      name: "33 Архыз",
      link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg",
      time: "1ч 17м"
    },
    {
      name: "Челябинская область",
      time: "1ч 17м",
      link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg",
    },
    {
      name: "Иваново",
      time: "1ч 17м",
      link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg",
    },
    {
      name: "Камчатка",
      time: "1ч 17м",
      link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg",
    },
    {
      name: "Холмогорский район",
      time: "1ч 17м",
      link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg",
    },
    {
      name: "Байкал",
      time: "1ч 17м",
      link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg",
    },
    {
      name: "Архыз",
      time: "1ч 17м",
      link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg",
    },
    {
      name: "Gimme Danger: История Игги и The Stooges",
      time: "1ч 17м",
      link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg",
    },
    {
      name: "Иваново",
      time: "1ч 17м",
      link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg",
    },
    {
      name: "Камчатка",
      time: "1ч 17м",
      link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg",
    },
    {
      name: "Холмогорский район",
      time: "1ч 17м",
      link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg",
    },
    {
      name: "Байкал",
      time: "1ч 17м",
      link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg",
    },
    {
      name: "Камчатка",
      time: "1ч 17м",
      link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg",
    },
    {
      name: "Холмогорский район",
      time: "1ч 17м",
      link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg",
    },
    {
      name: "Байкал",
      time: "1ч 17м",
      link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg",
    },
  ];


  const handleShowMoreButtonClick = () => {
    setVisibleCardsCount(visibleCardsCount + 6); // показываем еще по 6 карточек
  };

  const isShowMoreButtonVisible = visibleCardsCount < movies.length; // кнопка "Показать больше" видна, если количество видимых карточек меньше общего количества карточек

  const visibleMovies = movies.slice(0, visibleCardsCount); // выбираем только видимые карточки


  return (
    <>
    <Header isLogin={isLogin}/>
    <main className='main'>
    <section className="movies">
      <SearchForm onSearch={handleSearch} />
      <FilterCheckbox
        label="Короткометражки"
        isChecked={isShortFilmsOnly}
        onChange={handleFilterCheckboxChange}
      />
   
      {isLoading && <Preloader />}
      {isError && <div className="movies__error">Ошибка загрузки данных</div>}
      {!isLoading && !isError && (
      <div className="movies-card-list">
        {visibleMovies.map((movie) => (
            <MoviesCard 
              key={movie.id}
              movie={movie} 
              isShortFilm={isShortFilmsOnly} />
          ))}
      </div>
      )}
      {isShowMoreButtonVisible && (
        <div className='show-more'>
        <button className="show-more__button" onClick={handleShowMoreButtonClick}>
          Ещё
        </button>
        </div>
      )}
   </section >
   </main>
   <Footer/>
   </>
  );
}

export default Movies;