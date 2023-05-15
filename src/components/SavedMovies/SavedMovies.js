import React, { useState, useEffect} from 'react';
import SearchForm from '../SearchForm/SearchForm';
import FilterCheckbox from '../FilterCheckbox/FilterCheckbox';
import Preloader from '../Preloader/Preloader';
import MoviesCard from '../MoviesCard/MoviesCard';
import Header from '../header/Header';
import Footer from '../footer/Footer';
function SavedMovies({isLogin, deleteMovie, myMovies, isLoading}) {
  const [search, setSearch] = useState('');
  const [isError, setIsError] = useState(false);
  const [isShortFilmsOnly, setIsShortFilmsOnly] = useState(false);
  const [visibleCardsCount, setVisibleCardsCount] = useState(2);
  const [savedDataLoaded, setSavedDataLoaded] = useState(false);

  useEffect(() => {
    // Function to retrieve saved data from local storage
    const getSavedData = () => {
      const savedData = localStorage.getItem('saveMoviesData');
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
    // Function to save data to local storage
    const saveData = () => {
      const data = {
        searchQuery: search,
        shortFilmsOnly: isShortFilmsOnly,
      };

      localStorage.setItem('saveMoviesData', JSON.stringify(data));
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
    if (!searchQuery) { // проверка на пустое значение
      setIsError(true);
      return;
    }
    setIsError(false);
    setSearch(searchQuery)
  };

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

  const isShowMoreButtonVisible = visibleCardsCount < myMovies.length; // кнопка "Показать больше" видна, если количество видимых карточек меньше общего количества карточек

  const visibleMovies = isShortFilmsOnly
  ? myMovies.filter((movie) => movie.duration <= 40 && movie.nameRU.toLowerCase().includes(search.toLowerCase()))
  : myMovies.filter((movie) => movie.nameRU.toLowerCase().includes(search.toLowerCase()));

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
      {isError && <div className="movies__error">Нужно ввести ключевое слово</div>}
      {!isLoading && !isError && (
      <div className="movies-card-list">
        {visibleMovies.slice(0, visibleCardsCount).map((movie) => (
            <MoviesCard 
            deleteMovie={deleteMovie}
              key={movie.id}
              myMovies={myMovies}
              movie={movie} 
              isShortFilm={isShortFilmsOnly} />
          ))}
      </div>
      )}
      {isShowMoreButtonVisible && visibleMovies.length >= 5 && !isError &&(
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