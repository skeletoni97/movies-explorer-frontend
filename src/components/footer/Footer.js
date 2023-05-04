import React from "react";
import './Footer.css'

function Footer(props) {
  return (
    <footer className="footer">
        <p className="footer__text">Учебный проект Яндекс.Практикум х BeatFilm.</p>
        <div className="footer__container">
          <p className="footer__copyright">© 2020</p>
          <nav className="footer__nav">
            <ul className="footer__list">
              <li className="footer__list-item"><a href="https://practicum.yandex.ru/" target="_blank" rel="noopener noreferrer" className="footer__link">Яндекс.Практикум</a></li>
              <li className="footer__list-item"><a href="https://github.com/skeletoni97" target="_blank" rel="noopener noreferrer" className="footer__link">Github</a></li>
            </ul>
          </nav>
        </div>
      </footer>
  );
}

export default Footer