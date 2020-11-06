import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { ContactPhone } from '..';
import './header.css';

const Header = (props) => {
  return (
    <header>
      <div className="header-row">
        <ContactPhone />
        <div className="header-questions">
          <div className="header-questions-title">Есть вопросы? Звоните!</div>
          <div className="header-questions-phone">+7 (985) 33 66 999</div>
        </div>
        <div className="header-payment">Доставка и оплата</div>
        <Link to="/cart">
          <div className="header-cart">
            <div className="header-cart-icon">
              <FontAwesomeIcon icon="shopping-cart" />
              <div className="header-cart-counter">1</div>
            </div>
            <div className="header-cart-button">Корзина</div>
          </div>
        </Link>
      </div>
      <div className="header-row">
        <div className="header-menu">
          <div className="header-menu-item">Каталог</div>
          <div className="header-menu-item">О компании</div>
          <div className="header-menu-item">Контакты</div>
          <div className="header-menu-item">Галерея</div>
          <div className="header-menu-item">Информация</div>
          <div className="header-menu-item">Партнерам</div>
          <div className="header-menu-item">Статьи</div>
        </div>
      </div>
    </header>
  );
};

export default Header;
