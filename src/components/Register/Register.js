import React, { useState } from "react";
import { Link } from "react-router-dom";
import Logo from "../Logo/Logo";
import "./Register.css";

function Register(props) {
  // const [name, setIsName] = useState("");
  const [email, setIsEmail] = useState("");
  const [password, setIsPassword] = useState("");
  const [name, setIsName] = useState("");
  function handleSetName(e) {
    setIsName(e.target.value);
  }

  function handleSetEmail(e) {
    setIsEmail(e.target.value);
  }

  function handleSetPassword(e) {
    setIsPassword(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    props.handleRegistr(email, password);
  }
  return (
    <section className="register">
      <Logo></Logo>
      <h2 className="register__title">Добро пожаловать!</h2>
      <form className="form-register" onSubmit={handleSubmit}>
        <label className="form-register__label" htmlFor="name">
          Имя
          <input
            value={name || ""}
            onChange={handleSetName}
            type="name"
            className="form-register__input"
          />
        </label>
        <label className="form-register__label" htmlFor="email">
          E-mail
          <input
            value={email || ""}
            onChange={handleSetEmail}
            type="email"
            className=" form-register__input"
          />
        </label>
        <label className="form-register__label" htmlFor="Password">
          Пароль
          <input
            value={password || ""}
            onChange={handleSetPassword}
            type="Password"
            className=" form-register__input"
          />
        </label>
        <button type="submit" className="form-register__button">
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
