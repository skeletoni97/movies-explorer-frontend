import './Portfolio.css';
import { Link } from "react-router-dom";

function Portfolio() {
  return (
    <section className="portfolio">
          <h2 className="portfolio__title">Портфолио</h2>
          <Link className="portfolio__button" to="https://github.com/skeletoni97/how-to-learn" target="_blank" rel="noopener noreferrer" >
            <span className="portfolio__button-text">Статичный сайт</span>
            <span className="portfolio__button-arrow">↗</span>
          </Link>
          <Link className="portfolio__button" to="https://github.com/skeletoni97/russian-travel" target="_blank" rel="noopener noreferrer" >
            <span className="portfolio__button-text">Адаптивный сайт</span>
            <span className="portfolio__button-arrow">↗</span>
          </Link>
          <Link className="portfolio__button" to="https://github.com/skeletoni97/react-mesto-auth" target="_blank" rel="noopener noreferrer" >
            <span className="portfolio__button-text">
              Одностраничное приложение
            </span>
            <span className="portfolio__button-arrow">↗</span>
          </Link>
        </section>
  );
}

export default Portfolio;