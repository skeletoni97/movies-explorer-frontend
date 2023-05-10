import './AboutProject.css';

function AboutProject() {
  return (
    <section id="anchor-aboutProject" className="aboutProject">
          <h2 className="aboutProject__title">О проекте</h2>
          <div className="aboutProject__blocks">
            <div className="aboutProject__block-left">
              <h3 className="aboutProject__subtitle">
                Дипломный проект включал 5 этапов
              </h3>
              <p className="aboutProject__text">
                Составление плана, работу над бэкендом, вёрстку, добавление
                функциональности и финальные доработки.
              </p>
            </div>
            <div className="aboutProject__block-right">
              <h3 className="aboutProject__subtitle">
                На выполнение диплома ушло 5 недель
              </h3>
              <p className="aboutProject__text">
                У каждого этапа был мягкий и жёсткий дедлайн, которые нужно было
                соблюдать, чтобы успешно защититься.
              </p>
              
            </div>
          </div>
          <div className="aboutProject__worcks"> 
            <p className="aboutProject__worck aboutProject__worck-front-end-time">1 неделя</p>
            <p className="aboutProject__worck aboutProject__worck-back-end-time ">4 недели</p>
            <p className="aboutProject__worck aboutProject__worck-back-end">Back-end</p>
            <p className="aboutProject__worck aboutProject__worck-front-end">Front-end</p> 
          </div>
        </section>
  );
}

export default AboutProject;