import './Portfolio.css';

function Portfolio() {
  return (
    <section className="portfolio">
          <h2 className="portfolio__title">Портфолио</h2>
          <button className="portfolio__button">
            <span className="portfolio__button-text">Статичный сайт</span>
            <span className="portfolio__button-arrow">↗</span>
          </button>
          <button className="portfolio__button">
            <span className="portfolio__button-text">Адаптивный сайт</span>
            <span className="portfolio__button-arrow">↗</span>
          </button>
          <button className="portfolio__button">
            <span className="portfolio__button-text">
              Одностраничное приложение
            </span>
            <span className="portfolio__button-arrow">↗</span>
          </button>
        </section>
  );
}

export default Portfolio;