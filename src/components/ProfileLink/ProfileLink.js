import './ProfileLink.css';
import { Link } from 'react-router-dom';
import profileLinkImg from '../../images/profile-link-img.png';

function ProfileLink() {
  return (
        <Link className="profile-link" to="/profile">
            <div className='profile-link__text'>Аккаунт</div>
            <img alt="зачек человечка" src={profileLinkImg} className='profile-link__img'></img>
        </Link>
  );
}

export default ProfileLink;