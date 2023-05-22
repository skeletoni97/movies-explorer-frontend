import React, { useState, useContext, useEffect } from "react";
import "./Profile.css";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import Header from "../header/Header";
import { CurrentUserContext } from "../../context/CurrentContext";

function Profile({ signOut, isLogin, isLoadingForm, handleUpdateUser }) {
  const user = useContext(CurrentUserContext);
  const [title, setIsTitle] = useState("");
  const [name, setIsName] = useState(localStorage.getItem("name") || user.name);
  const [email, setIsEmail] = useState(localStorage.getItem("email") || user.email);

  useEffect(() => {
    setIsName(user.name);
    setIsEmail(user.email);
    setIsTitle(user.name);
  }, [user]);
  useEffect(() => {
    localStorage.setItem("name", name);
    localStorage.setItem("email", email);
  }, [name, email]);

  const {
    register,
    formState: { errors, isValid, isDirty },
    handleSubmit,
    reset
  } = useForm({ mode: "onChange",   defaultValues: {
    name: localStorage.getItem("name") || name,
    email: localStorage.getItem("email") || email
  }});

  const onSubmit = (data) => {
    if (data.name === user.name && data.email === user.email)  return;
    handleUpdateUser(data);
    reset({ name: data.name, email: data.email });
  };
  
  return (
    <>
      <Header isLogin={isLogin} />
      <main className="main">
        <section className="profile">
          <h2 className="profile__title">Привет, {title}!</h2>
          <form
            className="form-profile"
            noValidate
            onSubmit={handleSubmit(onSubmit)}
          >
            <div className="form-profile__container">
              <p className="form-profile__text">Имя</p>
              <label>
                <input
                  {...register("name", {
                    required: "Поле обязательно к заполнению.",
                    minLength: {
                      value: 2,
                      message: "Минимум 2 символа.",
                    },
                    maxLength: {
                      value: 32,
                      message: "Максимум 32 символа.",
                    },
                  })}
                  type="name"
                  placeholder="Имя"
                  className={`form-profile__input ${
                    errors.name ? "form-profile__input--error" : ""
                  }`}
                />
                <span className="form-profile__spanError">
                  {errors?.name && (
                    <p className="form-profile__textError">
                      {errors?.name?.message || "Что-то пошло не так..."}
                    </p>
                  )}
                </span>
              </label>
            </div>
            <div className="form-profile__container">
              <p className="form-profile__text">E-mail</p>
              <label>
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
                  placeholder="email"
                  className={`form-profile__input ${
                    errors.email ? "form-profile__input--error" : ""
                  }`}
                />
                <span className="form-profile__spanError">
                  {errors?.email && (
                    <p className="form-profile__textError">
                      {errors?.email?.message || "Что-то пошло не так..."}
                    </p>
                  )}
                </span>
              </label>
            </div>
            <button
              type="submit"
              disabled={!isValid || !isDirty || isLoadingForm}
              className={`form-profile__button ${
                isValid ? "" : "form-profile__button_disabled"
              }`}
            >
              Редактировать
            </button>
          </form>
          <Link to="/" onClick={signOut} className="profile__link">
            Выйти из аккаунта
          </Link>
        </section>
      </main>
    </>
  );
}

export default Profile;
