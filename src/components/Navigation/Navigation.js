import "./Navigation.css";
import { Link, useLocation} from "react-router-dom";

function Navigation() {
  const location = useLocation();
  return (
    <nav >
      <ul className="links">
        <li className="links__item">
          <Link to="/movies"  className={`links__link ${location.pathname === "/movies" ? "active" : ""}`}>
            Фильмы
          </Link>
        </li>
        <li className="links__item">
          <Link to="/saved-movies" className={`links__link ${location.pathname === "/saved-movies" ? "active" : ""}`}>
            Сохранённые фильмы
          </Link>
        </li>
      </ul>
    </nav>
  );
}

export default Navigation;
