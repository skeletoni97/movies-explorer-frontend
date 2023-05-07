import React, { useState } from "react";
import './Profile.css';
import { Link } from 'react-router-dom';
import { useForm } from "react-hook-form";
import Header from '../header/Header'

function Profile({ signOut, isLogin, setCurrentUser }) {
    const [name, setIsName] = useState("Виталий");
    const [email, setIsEmail] = useState("gogo@go.com");
    const {
      register,
    formState: {
      errors, isValid
    },
      handleSubmit,
      restet
  
  } = useForm({mode: 'onBlur'})
  const onSubmit = (data) => {
    alert(JSON.stringify(data));
    restet();
  }
  
    function handleSetEmail(e) {
      setIsEmail(e.target.value);
    }
  
    function handleSetName(e) {
        setIsName(e.target.value);
    }
  
    // function handleSubmit(e) {
    //   e.preventDefault();
    //   // handleRegistr(email, name);
    // }
  return (
    <>
    <Header isLogin={isLogin} />
    <main className="main">
    <section className="profile">
    <h2 className="profile__title">Привет, Виталий!</h2>
    <form className="form-profile" onSubmit={handleSubmit}>
      <div className="form-profile__container">
        <p className="form-profile__text">Имя</p>
        <label>
        <input
        value={name || ""}
       
        {...register('name',{
          required: "Поле обязательно к заполнению.",
          minLength: {
            value: 2,
            message: "Минимум 2 символа."
          },
          maxLength: {
            value: 32,
            message: "Максимум 32 символа."
          }
        })}
        onChange={handleSetName}
        type="name"
        placeholder="Имя"
        className="form-profile__input"/>
        <span className="form-profile__spanError">{errors?.name &&<p className="form-profile__textError">{errors?.name?.message || "Что-то пошло не так..."}</p>}</span>
        
        </label>
      </div>
      <div className="form-profile__container">
        <p className="form-profile__text">E-mail</p>
        <label>
        <input
          value={email || ""}
         
          {...register('email',{
            required: "Поле обязательно к заполнению.",
            pattern: {
              value: /^\S+@\S+$/i,
              message: "Введите корректный email",
            },
            minLength: {
              value: 3,
              message: "Минимум 2 символа."
            }
          })}
         onChange={handleSetEmail}
         type="email"
        placeholder="email"
         className="form-profile__input"
        />
        <span className="form-profile__spanError">{errors?.email &&<p className="form-profile__textError">{errors?.email?.message || "Что-то пошло не так..."}</p>}</span>
        </label>
      </div>
      <button type="submit" className={`form-profile__button ${isValid? "" : "form-profile__button_disabled"}`}>
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