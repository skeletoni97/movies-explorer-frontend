import "./App.css";
import React, { useState, useEffect } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";

import { moviesApi } from "../../utils/MoviesApi"
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
  CurrentCardsContext,
} from "../../context/CurrentContext";
function App() {
  const [isLoading, setIsLoading] = useState(false);
  const [movies, setMovies] = useState([]);
  const [myMovies, setMyMovies] = useState([]);
  const [currentUser, setcurrentUser] = useState([]);
  const [isLogin, setLogin] = useState(false);
  const [isFail, setIsFail] = useState(false);
  
    const [isSuccess, setSuccess] = useState(false);
  const navigate = useNavigate();


  localStorage.setItem('movies', JSON.stringify(movies));
  localStorage.setItem('myMovies', JSON.stringify(myMovies));
  function addMovie (movie, user) {
    console.log(movie)
    mainApi.
    addMovie(movie, user)
    .then((res) => {
      setMyMovies(movie => [res, ...movie]);
      localStorage.setItem('myMovies', JSON.stringify(movie => [res, ...movie]));
    })
    .catch((err) => {
      setIsFail(true);
    });
  }
  function deleteMovie(movie) {
  console.log()
    mainApi.
    deleteMovie(movie)
    .then((res) => {
      const newMyMovies = myMovies.filter(
        (item) => item.movieId !== movie.id && item.movieId !== movie.movieId
      );
      localStorage.setItem('myMovies', JSON.stringify(newMyMovies));
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
        navigate("/movies");
        setLogin(true);
      })
      .catch((err) => {setIsFail(true)});
  }

  function handleRegistr(data) {
  
    apiAuth
      .postUser(data.name, data.email, data.password)
      .then((res) => {
        navigate("/movies");
        handleAutorizUser(data)
      })
      .catch((err) => {
        setIsFail(true);
      });
  }
  //Проверяем токен

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
        setSuccess(true)
        setcurrentUser(res);
      })
      .catch((err) => {
        setIsFail(true);
      }) ;
  }

  function signOut() {
    localStorage.removeItem('token');
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
    setIsLoading(true)
  console.log("res")
    Promise.all([mainApi.getProfile(), moviesApi.getMovies(), mainApi.getSaveMovie()])
      .then(([res, items, SaveItems]) => {
        setcurrentUser(res);
        console.log(res)
        setMovies(items)
        setMyMovies(SaveItems)
        setIsLoading(false)
      })
      .catch();
    return () => {};
  }, [isLogin]);

  useEffect(() => {
    console.log("retests")
    setIsLoading(true)
    handleTokenCheck();
    Promise.all([mainApi.getProfile(), moviesApi.getMovies(), mainApi.getSaveMovie()])
      .then(([res, items, SaveItems]) => {
        setcurrentUser(res);
        
        setMovies(items)
        setMyMovies(SaveItems)
        setIsLoading(false)
      })
      .catch();
    return () => {};
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
              element={<ProtectedRoute isLogin={isLogin}>
                <Movies isLogin={isLogin} isLoading={isLoading} myMovies={myMovies} movies={movies} addMovie={addMovie} deleteMovie={deleteMovie} />
                </ProtectedRoute>}
            />
            <Route
              exact
              path="/saved-movies"
              element={<ProtectedRoute isLogin={isLogin}>
                <SavedMovies isLogin={isLogin} isLoading={isLoading} myMovies={myMovies}  deleteMovie={deleteMovie}/>
                </ProtectedRoute>}
            />
            <Route
              exact
              path="/profile"
              element={<ProtectedRoute isLogin={isLogin}>
                <Profile isLogin={isLogin} signOut={signOut} setcurrentUser={setcurrentUser} handleUpdateUser={handleUpdateUser}></Profile>
                </ProtectedRoute>}
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
            isSuccess={isSuccess}
            isFail={isFail}
            onClose={closeResponsePopup}></InfoToolTip>
       
      </CurrentUserContext.Provider>
    </div>
  );
}

export default App;
