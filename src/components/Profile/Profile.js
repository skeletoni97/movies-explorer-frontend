import React, { useState, useContext, useEffect  } from "react";
import './Profile.css';
import { Link } from 'react-router-dom';
import { useForm } from "react-hook-form";
import Header from '../header/Header'
import { CurrentUserContext } from '../../context/CurrentContext';

function Profile({ signOut, isLogin, setCurrentUser, handleUpdateUser }) {

    const user = useContext(CurrentUserContext);
    const [title, setIsTitle] = useState('');
    const [name, setIsName] = useState(user.name);
    const [email, setIsEmail] = useState(user.email);


    useEffect(() => {
      setIsName(user.name);
      setIsEmail(user.email);
      setIsTitle(user.name);
    }, [user]);

    const {
      register,
    formState: {
      errors, isValid
    },
      handleSubmit,
  } = useForm({mode: "onChange"})

  const onSubmit = (data) => {
    handleUpdateUser(data)
    alert(JSON.stringify(data));
    
  }
  
   
  return (
    <>
    <Header isLogin={isLogin} />
   
    <main className="main">
    <section className="profile">
    <h2 className="profile__title">Привет, {title}!</h2>
    <form className="form-profile" onSubmit={handleSubmit(onSubmit)}>
      <div className="form-profile__container">
        <p className="form-profile__text">Имя</p>
        <label>
        <input
       defaultValue={name || ""}
       
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
       
        type="name"
        placeholder="Имя"
        className={`form-profile__input ${errors.name ? 'form-profile__input--error' : ''}`}/>
        <span className="form-profile__spanError">{errors?.name &&<p className="form-profile__textError">{errors?.name?.message || "Что-то пошло не так..."}</p>}</span>
        
        </label>
      </div>
      <div className="form-profile__container">
        <p className="form-profile__text">E-mail</p>
        <label>
        <input
      
          defaultValue={email || ""}
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
         
         type="email"
        placeholder="email"
         className={`form-profile__input ${errors.email ? 'form-profile__input--error' : ''}`}
        />
        <span className="form-profile__spanError">{errors?.email &&<p className="form-profile__textError">{errors?.email?.message || "Что-то пошло не так..."}</p>}</span>
        </label>
      </div>
      <button type="submit" disabled={!isValid} className={`form-profile__button ${isValid? "" : "form-profile__button_disabled"}`}>
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