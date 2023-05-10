import React, { useState } from 'react';
import SearchForm from '../SearchForm/SearchForm';
import FilterCheckbox from '../FilterCheckbox/FilterCheckbox';
import Preloader from '../Preloader/Preloader';
import MoviesCard from '../MoviesCard/MoviesCard';
import Header from '../header/Header';
import Footer from '../footer/Footer';
function SavedMovies({isLogin}) {
  
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [isShortFilmsOnly, setIsShortFilmsOnly] = useState(false);
  const [visibleCardsCount, setVisibleCardsCount] = useState(3);

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
      name: "Архыз",
      link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg",
      time: "222"
    },
    {
      name: "Челябинская область",
      link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg",
    },
    {
      name: "Иваново",
      link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg",
    },
   
  ];


  const handleShowMoreButtonClick = () => {
    setVisibleCardsCount(visibleCardsCount + 6); // показываем еще по 6 карточек
  };

  const isShowMoreButtonVisible = visibleCardsCount < movies.length; // кнопка "Показать больше" видна, если количество видимых карточек меньше общего количества карточек

  const visibleMovies = movies.slice(0, visibleCardsCount); // выбираем только видимые карточки


  return (
    <>
    <Header isLogin={isLogin}></Header>
    <div className="movies">
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
          Еще
        </button>
        </div>
      )}
   </div>
   <Footer></Footer>
   </>
  );
}

export default SavedMovies;