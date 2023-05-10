import './Logo.css';
import { Link } from 'react-router-dom';
import logoPath from '../../images/logo.svg';

function Logo() {
  return (
      <Link to="/" className="logo">
        <img src={logoPath} alt="логотип проекта" className="logo__img" />
      </Link>
  );
}

export default Logo;