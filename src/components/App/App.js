import "./App.css";
import React, { useState } from "react";
import {
  Route,
  Routes,
  useNavigate,
} from "react-router-dom";

import Header from "../header/Header";
import Footer from "../footer/Footer";
import Main from "../Main/Main";
import Movies from "../movies/Movies";
import SavedMovies from "../SavedMovies/SavedMovies";
import Register from "../Register/Register";
import Login from "../Login/Login";
import Profile from "../Profile/Profile";
import PageNotFound from "../PageNotFound/PageNotFound";

function App() {
  const [isLogin, setLogin] = useState(false);
  const navigate = useNavigate();
  function handleAutorizUser() {
    console.log("log");
    setLogin(true);
    navigate("/movies");
  }
  function signOut() {
    console.log("signOut");
    setLogin(false);
    navigate("/");
  }
  function handleRegistr() {
    navigate("/sign-in");
  }
  return (
    <div className="page">
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
        <Route exact path="/movies" element={<Movies isLogin={isLogin} />} />
        <Route
          exact
          path="/saved-movies"
          element={<SavedMovies isLogin={isLogin} />}
        />
        <Route
          exact
          path="/profile"
          element={<Profile isLogin={isLogin} signOut={signOut}></Profile>}
        />
        <Route
          path="/sign-up"
          element={<Register handleRegistr={handleRegistr} />}
        />
        <Route
          path="/sign-in"
          element={<Login onSignin={handleAutorizUser} />}
        />
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </div>
  );
}

export default App;
