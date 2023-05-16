import "./App.css";
import React, { useState, useEffect } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";

import { moviesApi } from "../../utils/MoviesApi";
import { apiAuth } from "../../utils/ApiAuth";
import { mainApi } from "../../utils/MainApi";

import Header from "../header/Header";
import Footer from "../footer/Footer";
import Main from "../Main/Main";
import Movies from "../movies/Movies";
import SavedMovies from "../SavedMovies/SavedMovies";
import Register from "../Register/Register";
import Login from "../Login/Login";
import Profile from "../Profile/Profile";
import PageNotFound from "../PageNotFound/PageNotFound";
import InfoToolTip from "../InfoToolTip/InfoToolTip";
import ProtectedRoute from "../ProtectedRoute/ProtectedRoute";
import {
  CurrentUserContext,
} from "../../context/CurrentContext";

function App() {
  const [isLoading, setIsLoading] = useState(false);
  const [movies, setMovies] = useState([]);
  const [myMovies, setMyMovies] = useState([]);
  const [currentUser, setcurrentUser] = useState([]);
  const [isLogin, setLogin] = useState(false);
  const [isFail, setIsFail] = useState(false);
  const [errText, setErrText] = useState("");
  const [isSuccess, setSuccess] = useState(false);
  const navigate = useNavigate();

  function addMovie(movie, user) {
    mainApi
      .addMovie(movie, user)
      .then((res) => {
        setMyMovies((movie) => [res, ...movie]);
        localStorage.setItem(
          "myMovies",
          JSON.stringify((movie) => [res, ...movie])
        );
      })
      .catch((err) => {
        setIsFail(true);
      });
  }

  function deleteMovie(movie) {
    mainApi
      .deleteMovie(movie)
      .then((res) => {
        const newMyMovies = myMovies.filter(
          (item) => item.movieId !== movie.id && item.movieId !== movie.movieId
        );
        localStorage.setItem("myMovies", JSON.stringify(newMyMovies));
        setMyMovies(newMyMovies);
      })
      .catch((err) => {
        setIsFail(true);
      });
  }

  function handleAutorizUser(date) {
    apiAuth
      .authorization(date.email, date.password)
      .then((res) => {
        localStorage.setItem("token", res.token);
        localStorage.setItem("isLogin", true);
        navigate("/movies");
        setLogin(true);
      })
      .catch((err) => {
        setIsFail(true);
        setErrText("Что-то пошло не так! Попробуйте ещё раз.");
      });
  }

  function handleRegistr(data) {
    apiAuth
      .postUser(data.name, data.email, data.password)
      .then((res) => {
        navigate("/movies");
        handleAutorizUser(data);
      })
      .catch((err) => {
        setIsFail(true);
        setErrText("Что-то пошло не так! Попробуйте ещё раз.");
      });
  }

  function handleTokenCheck() {
    if (localStorage.getItem("token")) {
      const jwt = localStorage.getItem("token");
      apiAuth
        .checkTokenUser(jwt)
        .then((res) => {
          if (res) {
            setLogin(true);
            return true;
          } else {
            navigate("/sign-in");
            setLogin(false);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }

  function handleUpdateUser(data) {
    mainApi
      .editProfile(data)
      .then((res) => {
        setSuccess(true);
        setcurrentUser(res);
      })
      .catch((err) => {
        setIsFail(true);
        console.log(err);
        setErrText("Что-то пошло не так! Попробуйте ещё раз.");
      });
  }

  function signOut() {
    localStorage.removeItem("token");
    setLogin(false);
    setMovies([]);
    setMyMovies([]);
    localStorage.clear();
    navigate("/");
  }
  
  function closeResponsePopup() {
    if (isSuccess) {
      setSuccess(false);
    } else {
      setIsFail(false);
    }
  }

  useEffect(() => {
    if (!isLogin) return;
    setIsLoading(true);
    Promise.all([
      mainApi.getProfile(),
      moviesApi.getMovies(),
      mainApi.getSaveMovie(),
    ])
      .then(([res, items, SaveItems, jwt]) => {
        setcurrentUser(res);
        setMovies(items);
        setMyMovies(SaveItems);
        localStorage.setItem("movies", JSON.stringify(items));
        localStorage.setItem("myMovies", JSON.stringify(SaveItems));
        setIsLoading(false);
      })
      .catch((err) => {
        setIsLoading(false);
        setErrText(
          "Во время запроса произошла ошибка. Возможно, проблема с соединением или сервер недоступен. Подождите немного и попробуйте ещё раз"
        );
        setIsFail(true);
      });
  }, [isLogin]);

  useEffect(() => {
    if (!localStorage.getItem("isLogin")) return;
    setIsLoading(true);
    handleTokenCheck();
    setLogin(true);
    Promise.all([
      mainApi.getProfile(),
      moviesApi.getMovies(),
      mainApi.getSaveMovie(),
    ])
      .then(([res, items, SaveItems]) => {
        setcurrentUser(res);
        setMovies(items);
        setMyMovies(SaveItems);
        setIsLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setIsLoading(false);
        setIsFail(true);
      });
    navigate();
  }, []);

  return (
    <div className="page">
      <CurrentUserContext.Provider value={currentUser}>
        <Routes>
          <Route
            exact
            path="/"
            element={
              <>
                <Header isLogin={isLogin} />
                <Main></Main>
                <Footer />
              </>
            }
          />
          <Route
            exact
            path="/movies"
            element={
              <ProtectedRoute isLogin={isLogin}>
                <Movies
                  isLogin={isLogin}
                  isLoading={isLoading}
                  myMovies={myMovies}
                  movies={movies}
                  addMovie={addMovie}
                  deleteMovie={deleteMovie}
                />
              </ProtectedRoute>
            }
          />
          <Route
            exact
            path="/saved-movies"
            element={
              <ProtectedRoute isLogin={isLogin}>
                <SavedMovies
                  isLogin={isLogin}
                  isLoading={isLoading}
                  myMovies={myMovies}
                  deleteMovie={deleteMovie}
                />
              </ProtectedRoute>
            }
          />
          <Route
            exact
            path="/profile"
            element={
              <ProtectedRoute isLogin={isLogin}>
                <Profile
                  isLogin={isLogin}
                  signOut={signOut}
                  setcurrentUser={setcurrentUser}
                  handleUpdateUser={handleUpdateUser}
                ></Profile>
              </ProtectedRoute>
            }
          />
          <Route
            path="/sign-up"
            element={<Register handleRegistr={handleRegistr} isFail={isFail} />}
          />
          <Route
            path="/sign-in"
            element={<Login onSignin={handleAutorizUser} />}
          />
          <Route path="*" element={<PageNotFound />} />
        </Routes>
        <InfoToolTip
          errText={errText}
          isSuccess={isSuccess}
          isFail={isFail}
          onClose={closeResponsePopup}
        ></InfoToolTip>
      </CurrentUserContext.Provider>
    </div>
  );
}

export default App;
