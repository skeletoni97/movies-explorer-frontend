import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import Logo from "../Logo/Logo";
import "./Register.css";

function Register(props) {
  const {
    register,
    formState: { errors, isValid },
    handleSubmit,
    reset,
  } = useForm({ mode: "onChange" });
  const onSubmit = (data) => {
    props.handleRegistr(data, reset);
  };

  return (
    <section className="register">
      <Logo></Logo>
      <h2 className="register__title">Добро пожаловать!</h2>
      <form
        className="form-register"
        noValidate
        onSubmit={handleSubmit(onSubmit)}
      >
        <label className="form-register__label" htmlFor="name">
          Имя
          <input
            placeholder="Имя"
            type="name"
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
            className={`form-register__input ${
              errors.name ? "form-ligin__input--error" : ""
            }`}
          />
          <span className="form-register__spanError">
            {errors?.name && (
              <p className="form-register__textError">
                {errors?.name?.message || "Что-то пошло не так..."}
              </p>
            )}
          </span>
        </label>
        <label className="form-register__label" htmlFor="email">
          E-mail
          <input
            {...register("email", {
              required: "Поле обязательно к заполнению.",
              pattern: {
                value:
                  /^[a-zA-Z0-9._-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9]{2,61}(?:[a-zA-Z0-9-.][a-zA-Z0-9]{2,61})*$/,
                message: "Введите корректный email",
              },
            })}
            placeholder="email"
            className={`form-register__input ${
              errors.email ? "form-ligin__input--error" : ""
            }`}
          />
          <span className="form-register__spanError">
            {errors?.email && (
              <p className="form-register__textError">
                {errors?.email?.message || "Что-то пошло не так..."}
              </p>
            )}
          </span>
        </label>
        <label className="form-register__label" htmlFor="Password">
          Пароль
          <input
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
            placeholder="Password"
            type="Password"
            className={`form-register__input ${
              errors.password ? "form-ligin__input--error" : ""
            }`}
          />
          <span className="form-register__spanError">
            {errors?.password && (
              <p className="form-register__textError">
                {errors?.password?.message || "Что-то пошло не так..."}
              </p>
            )}
          </span>
        </label>
        <button
          type="submit"
          disabled={!isValid || props.isLoadingForm}
          className={`form-register__button ${
            isValid ? "" : "form-register__button_disabled"
          }`}
        >
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
