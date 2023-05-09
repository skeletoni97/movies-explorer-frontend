import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./Header.css";
import Logo from "../Logo/Logo";
import ProfileLink from "../ProfileLink/ProfileLink";
import Navigation from "../Navigation/Navigation";
import BurgerMenu from "../BurgerMenu/BurgerMenu";
import { useLocation } from "react-router-dom";
function Header({ isLogin }) {
  const location = useLocation().pathname;
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  console.log(isLogin);
  function handleButtonSignin() {
    console.log("cc");
  }
  function handleButtonBurgerMenu() {
    setIsMenuOpen(!isMenuOpen);
  }
  // function handleButtonLogo() {

  // }
  console.log(location)
  return (
    <header className="header">
      <div className="header__blocks">
        <div className="header__block-navigation">
          <Logo></Logo>
          {location === "/saved-movies" || location === "/movies" ? <Navigation /> : <></>}
        </div>

        <div className="header__block">
          {location === "/saved-movies" || location === "/movies" ? (
            <>
              <div className="header__profileLink">
                <ProfileLink></ProfileLink>
              </div>
              <div
                className={`menu-btn ${isMenuOpen ? "active" : ""}`}
                onClick={handleButtonBurgerMenu}
              >
                <span></span>
                <span></span>
                <span></span>
              </div>
            </>
          ) : (
            <ul className="header__navAut">
              <li>
                <Link
                  className="header__navAut-link header__navAut-link_registration"
                  to="/sign-up"
                >
                  Регистрация
                </Link>
              </li>
              <li>
                <Link
                  className="header__navAut-link header__navAut-link_signin"
                  onClick={handleButtonSignin}
                  to="/sign-in"
                >
                  Войти
                </Link>
              </li>
            </ul>
          )}
        </div>
        {isMenuOpen ? <BurgerMenu isMenuOpen={isMenuOpen}></BurgerMenu> : <></>}
      </div>
    </header>
  );
}

export default Header;
