import ProfileLink from "../ProfileLink/ProfileLink";
import "./BurgerMenu.css"
import { Link, useLocation } from 'react-router-dom';

function BurgerMenu({ isMenuOpen}) {
  const location = useLocation();
  return (
    <>
    <div className="dark-glass"></div>
    <div className={`burgerMenu ${isMenuOpen ? "active" : ""}`}>
      <nav>
        <ul className="burgerMenu__links">
          <li className="burgerMenu__link-items">
            <Link
              to="/"
              className={`burgerMenu__link burgerMenu__link_${location.pathname === "/" ? "active" : ""}`}
            >
              Главная
            </Link>
          </li>
          <li className="burgerMenu__link-items">
            <Link
              to="/movies"
              className={`burgerMenu__link burgerMenu__link_${location.pathname === "/movies" ? "active" : ""}`}
            >
              Фильмы
            </Link>
          </li>
          <li className="burgerMenu__link-items">
            <Link
              to="/saved-movies"
              className={`burgerMenu__link burgerMenu__link_${location.pathname === "/saved-movies" ? "active" : ""}`}
            >
              Сохранённые фильмы
            </Link>
          </li>
        </ul>
      </nav>
      <ProfileLink></ProfileLink>
    </div>
  </>
  );
}

export default BurgerMenu;