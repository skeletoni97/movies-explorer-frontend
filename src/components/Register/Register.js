import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import Logo from "../Logo/Logo";
import "./Register.css";

function Register(props) {
  // const [name, setIsName] = useState("");
  const [email, setIsEmail] = useState("");
  const [password, setIsPassword] = useState("");
  const [name, setIsName] = useState("");
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
  function handleSetName(e) {
    setIsName(e.target.value);
  }

  function handleSetEmail(e) {
    setIsEmail(e.target.value);
  }

  function handleSetPassword(e) {
    setIsPassword(e.target.value);
  }

  // function handleSubmit(e) {
  //   e.preventDefault();
  //   props.handleRegistr(email, password);
  // }
  return (
    <section className="register">
      <Logo></Logo>
      <h2 className="register__title">Добро пожаловать!</h2>
      <form className="form-register" onSubmit={handleSubmit(onSubmit)}>
        <label className="form-register__label" htmlFor="name">
          Имя
          <input
            placeholder="Имя"
            onChange={handleSetName}
            type="name"
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
            className="form-register__input"
          />
           <span className="form-register__spanError">{errors?.name &&<p>{errors?.name?.message || "Что-то пошло не так..."}</p>}</span>
        </label>
        <label className="form-register__label" htmlFor="email">
          E-mail
          <input
            {...register('email',{
              required: "Поле обязательно к заполнению.",
              pattern: {
                value: /^\S+@\S+$/i,
                message: "Введите корректный email",
              },
            })}
            onChange={handleSetEmail}
            placeholder="email"
            className=" form-register__input"
          />
           <span className="form-register__spanError">{errors?.email &&<p>{errors?.email?.message || "Что-то пошло не так..."}</p>}</span>
       
        </label>
        <label className="form-register__label" htmlFor="Password">
          Пароль
          <input
             {...register('password',{
              required: "Поле обязательно к заполнению.",
              minLength: {
                value: 8,
                message: "Минимум 8 символов."
              },
              maxLength: {
                value: 32,
                message: "Максимум 32 символа."
              }
            })}
            onChange={handleSetPassword}
            placeholder="Password"
            type="Password"
            className=" form-register__input"
          />
           <span className="form-register__spanError">{errors?.password &&<p>{errors?.password?.message || "Что-то пошло не так..."}</p>}</span>
       
        </label>
        <button type="submit" disabled={!isValid} className={`form-register__button ${isValid? "" : "form-register__button_disabled"}`}>
          Зарегистрироваться
        </button>
      </form>
      <p className="login__text">
        Уже зарегистрированы?
        <Link to="/sign-in" className="register__link ">
          Войти
        </Link>
      </p>
    </section>
  );
}

export default Register;
