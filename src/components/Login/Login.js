import React from "react";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import Logo from "../Logo/Logo";
import "./Login.css";
function Login(props) {

  const {
    register,
    formState: { errors, isValid },
    handleSubmit,
    reset,
  } = useForm({ mode: "onChange" });
  
  const onSubmit = (data) => {
    props.onSignin(data, reset);
  };

  return (
    <section className="login">
      <Logo></Logo>
      <h2 className="login__title">Рады видеть!</h2>
      <form className="form-login" noValidate onSubmit={handleSubmit(onSubmit)}>
        <label className="form-login__label" htmlFor="Email">
          E-mail
          <input
            {...register("email", {
              required: "Поле обязательно к заполнению.",
              pattern: {
                value:
                  /^[a-zA-Z0-9._-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9]{2,61}(?:[a-zA-Z0-9-.][a-zA-Z0-9]{2,61})*$/,
                message: "Введите корректный email",
              },
              minLength: {
                value: 3,
                message: "Минимум 2 символа.",
              },
            })}
            type="email"
            className={`form-ligin__input ${
              errors.email ? "form-ligin__input--error" : ""
            }`}
            placeholder="email"
          />
          <span className="form-ligin__spanError">
            {errors?.email && (
              <p className="form-ligin__textError">
                {errors?.email?.message || "Что-то пошло не так..."}
              </p>
            )}
          </span>
        </label>
        <label className="form-login__label" htmlFor="password">
          Пароль
          <input
            placeholder="password"
            type="password"
            className={`form-ligin__input ${
              errors.password ? "form-ligin__input--error" : ""
            }`}
            {...register("password", {
              required: "Поле обязательно к заполнению.",
              minLength: {
                value: 8,
                message: "Минимум 8 символов.",
              },
              maxLength: {
                value: 32,
                message: "Максимум 32 символа.",
              },
            })}
          />
          <span className="form-ligin__spanError">
            {errors?.password && (
              <p className="form-ligin__textError">
                {errors?.password?.message || "Что-то пошло не так..."}
              </p>
            )}
          </span>
        </label>
        <button
          type="submit"
          disabled={!isValid || props.isLoadingForm}
          className={`form-ligin__button ${
            isValid ? "" : "form-ligin__button_disabled"
          }`}
        >
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
