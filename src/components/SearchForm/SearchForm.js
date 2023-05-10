import React, { useState } from 'react';
import './SearchForm.css'
import buttonImg from '../../images/search-form-lupa.svg'
function SearchForm({ onSearch }) {
  const [searchQuery, setSearchQuery] = useState('');
 
  const handleSubmit = (event) => {
    event.preventDefault();
    onSearch(searchQuery);
  };

  const handleChange = (event) => {
    setSearchQuery(event.target.value);
  };

  return (
    <form className="search-form" onSubmit={handleSubmit}>
      <input
        className="search-form__input"
        type="text"
        placeholder="Фильм"
        value={searchQuery}
        onChange={handleChange}
      />
      <button className="search-form__button" type="submit">
        <img className='search-form__img-button' alt='симвл кнопки поиск' src={buttonImg}></img>
      </button>
    </form>
  );
}

export default SearchForm;