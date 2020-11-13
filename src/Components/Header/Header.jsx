import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { ContactPhone } from '..';
import './header.css';

const Header = () => {
  return (
    <header>
      <div className="header-row">
        <Link to="/">
          <div className="header-title">
            <div className="header-title-big">3D Decor</div>
            <div className="header-title-small">Crimea</div>
          </div>
        </Link>
        <ContactPhone />
        <div className="header-questions">
          <div className="header-questions-title">Есть вопросы? Звоните!</div>
          <div className="header-questions-phone">+7 (985) 33 66 999</div>
        </div>
        <Link to="/cart">
          <div className="header-cart">
            <div className="header-cart-icon">
              <FontAwesomeIcon icon="shopping-cart" className="header-cart-fa"/>
              <div className="header-cart-counter">1</div>
            </div>
            <div className="header-cart-button">Корзина</div>
          </div>
        </Link>
      </div>
      <div className="header-row">
        <div className="header-menu">
          <div className="header-menu-item">Каталог</div>
          <div className="header-menu-item">
            <Link to='/about'>О компании</Link>
          </div>
          <div className="header-menu-item">
            <Link to='/contacts'>Контакты</Link>
          </div>
          <div className="header-menu-item">
            <Link to='/gallery'>Галерея</Link>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
