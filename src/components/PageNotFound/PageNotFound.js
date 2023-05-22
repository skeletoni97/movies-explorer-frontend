import React from 'react';
import { useNavigate } from 'react-router-dom';

import './PageNotFound.css';

function PageNotFound() {
  const navigate = useNavigate();

  function handleGoBack() {
    navigate(-2);
  }

  return (
    <div className="not-found">
      <h3 className="not-found__title">
        <span>404</span>Страница не найдена
      </h3>
      <button className="button button_type_to-main" onClick={handleGoBack}>
        Назад
      </button>
    </div>
  );
}

export default PageNotFound;