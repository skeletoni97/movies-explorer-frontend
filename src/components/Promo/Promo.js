import './Promo.css';
import AboutMeFoto from "../../images/promo-img.svg"
import { Link } from 'react-scroll';
function Promo() {
  return (
    <section className="promo">
          <div className="promo__container">
            <div className="promo__info">
              <h1 className="promo__title">
                Учебный проект студента факультета Веб-разработки.
              </h1>
              <p className="promo__subtitle">
                Листайте ниже, чтобы узнать больше про этот проект и его
                создателя.
              </p>
              <Link className="promo__link" smooth={true} to="anchor-aboutProject">
                Узнать больше
              </Link>
            </div>
            <img className="promo__logo" src={AboutMeFoto} alt='Картинка земли из слов WEB'></img>
          </div>
        </section>
  );
}

export default Promo;