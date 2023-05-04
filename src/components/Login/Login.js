import React, { useState } from "react";
import { Link } from "react-router-dom";
import Logo from "../Logo/Logo";
import "./Login.css";
function Login(props) {
  // const [name, setIsName] = useState("");
  const [email, setIsEmail] = useState("");
  const [password, setIsPassword] = useState("");

  function handleSetEmail(e) {
    setIsEmail(e.target.value);
  }

  function handleSetPassword(e) {
    setIsPassword(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    props.onSignin(email, password);
  }
  return (
    <section className="login">
      <Logo></Logo>
      <h2 className="login__title">Рады видеть!</h2>
      <form className="form-login" onSubmit={handleSubmit}>
        <label className="form-login__label" htmlFor="Email">
          E-mail
          <input
            value={email || ""}
            onChange={handleSetEmail}
            type="email"
            className="form-ligin__input"
          />
        </label>
        <label className="form-login__label" htmlFor="password">
          Пароль
          <input
            value={password || ""}
            onChange={handleSetPassword}
            type="Password"
            className="form-ligin__input"
          />
        </label>
        <button type="submit" className="form-ligin__button">
          Войти
        </button>
      </form>

      <p className="login__text">
        Ещё не зарегистрированы?
        <Link to="/sign-up" className="login__link">
          Регистрация
        </Link>
      </p>
    </section>
  );
}

export default Login;
