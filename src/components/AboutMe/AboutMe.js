import './AboutMe.css';
import { Link } from "react-router-dom";
import AboutMeFoto from '../../images/AboutMe-foto.png'

function AboutMe() {
  return (
    <section className="aboutMe">
    <h2 className="aboutMe__title">Студент</h2>
    <div className="aboutMe__blocks">
      <div className="aboutMe__info">
        <h3 className="aboutMe__name">Виталий</h3>
        <h4 className="aboutMe__job">Фронтенд-разработчик, 25 лет</h4>
        <p className="aboutMe__text">
          Я родился и живу в Саратове, закончил факультет экономики СГУ. У
          меня есть жена и дочь. Я люблю слушать музыку, а ещё увлекаюсь
          бегом. Недавно начал кодить. С&nbsp;2015 года работал в компании «СКБ
          Контур». После того, как прошёл курс по веб&#8211;разработке,
          начал заниматься фриланс-заказами и ушёл с постоянной работы.
        </p>
        <Link className="aboutMe__github" to="https://github.com/skeletoni97" target="_blank" rel="noopener noreferrer">Github</Link>
      </div>
      <img className="aboutMe__foto" alt="фото" src={AboutMeFoto}></img>
    </div>
  </section>
  );
}

export default AboutMe;