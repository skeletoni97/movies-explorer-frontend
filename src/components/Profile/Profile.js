import React, { useState } from "react";
import './Profile.css';
import { Link } from 'react-router-dom';
import Header from '../header/Header'

function Profile({ signOut, isLogin, setCurrentUser }) {
    const [name, setIsName] = useState("");
    const [email, setIsEmail] = useState("");
  
  
    function handleSetEmail(e) {
      setIsEmail(e.target.value);
    }
  
    function handleSetName(e) {
        setIsName(e.target.value);
    }
  
    function handleSubmit(e) {
      e.preventDefault();
      // handleRegistr(email, name);
    }
  return (
    <>
    <Header isLogin={isLogin} />
    <main className="main">
    <section className="profile">
    <h2 className="profile__title">Привет, Виталий!</h2>
    <form className="form-profile" onSubmit={handleSubmit}>
      <div className="form-profile__container">
        <p className="form-profile__text">Имя</p>
        <input
        value={name || "Виталий"}
        onChange={handleSetName}
        type="name"
        placeholder="Email"
        className="form-profile__input"
      />
      </div>
      <div className="form-profile__container">
        <p className="form-profile__text">E-mail</p>
        <input
          value={email || "gogo@go.com"}
         onChange={handleSetEmail}
         type="email"
         placeholder="email"
         className="form-profile__input"
        />
      </div>
      <button type="submit" className="form-profile__button">
      Редактировать
      </button>
    </form>
    <Link to="/" onClick={signOut} className="profile__link" >
    Выйти из аккаунта
    </Link>
  </section>
  </main>
  </>
  );
}

export default Profile;