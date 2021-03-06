import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { ContactPhone } from '..';
import './footer.css';

const Footer = () => {
  const categories = useSelector(({ categories }) => categories);

  return (
    <footer>
      <div className="footer-container">
        <div className="footer-contacts">
          <ContactPhone />
          <div className="footer-contacts-email">
            <a href="mailto:info@decorproducts.ru">3ddecorcrimea@mail.ru</a> - по всем вопросам
          </div>
        </div>
        <div className="footer-menu">
          <div className="footer-menu-column">
            <div className="footer-column-title">О компании</div>
            <Link to="/discounts">
              <div className="footer-column-item">Скидки</div>
            </Link>
            <Link to="/gallery">
              <div className="footer-column-item">Галерея</div>
            </Link>
            <Link to="/about">
              <div className="footer-column-item">О нас</div>
            </Link>
          </div>
          <div className="footer-menu-column">
            <div className="footer-column-title">Каталог</div>
            {categories.map(({ _id, title, name }) => (
              <Link key={_id} to={`/product/${name}`}>
                <div className="footer-column-item">{title}</div>
               </Link>
            ))}
          </div>
        </div>
      </div>
      <div className="footer-container footer-copyrights">
        <div className="footer-copyrights-copy">
          <div>©2020 3D Gips Crimea™</div>
          <div>Официальный сайт</div>
        </div>
        <div className="footer-copyrights-text">
          Все материалы данного сайта являются объектами авторского права. Запрещается копирование, распространение или любое иное использование информации и объектов.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
