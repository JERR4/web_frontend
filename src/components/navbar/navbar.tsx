import { NavLink } from 'react-router-dom';
import { ROUTES } from "../../Routes";
import './navbar.css';

export const BasicNavbar = () => {
  return (
    <nav className="nav">
      <div className="nav__icon">
        <NavLink to={ROUTES.HOME} className="nav__brand">
            <img src="/web_frontend/images/logo.png" alt="Logo" height="40" />
        </NavLink>
      </div>
      <div className="nav__wrapper">
        <div className='nav__links'>
          <NavLink to={ROUTES.HOME} className='nav__link' end>Главная</NavLink>
          <NavLink to={ROUTES.PARTS} className='nav__link' end>Товары</NavLink>
        </div>
          <div className='nav__mobile-wrapper' onClick={(event) => event.currentTarget.classList.toggle('active')}>
            <div className='nav__mobile-target' />
            <div className='nav__mobile-menu'>
              <NavLink to={ROUTES.HOME} className='nav__link' end>Главная</NavLink>
              <NavLink to={ROUTES.PARTS} className='nav__link' end>Товары</NavLink>
            </div>
          </div>
      </div>
    </nav>
  );
};

export default BasicNavbar;