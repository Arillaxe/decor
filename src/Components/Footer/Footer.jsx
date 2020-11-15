import { ContactPhone } from '..';
import './footer.css';

const Footer = () => {
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
            <div className="footer-column-item">О компании</div>
            <div className="footer-column-item">Контакты</div>
            <div className="footer-column-item">Галерея</div>
          </div>
          <div className="footer-menu-column">
            <div className="footer-column-title">Каталог</div>
            <div className="footer-column-item">Принтография</div>
            <div className="footer-column-item">Гипсовые 3D панели</div>
            <div className="footer-column-item">Барельеф</div>
            <div className="footer-column-item">Декор интерьера</div>
          </div>
        </div>
      </div>
      <div className="footer-container footer-copyrights">
        <div className="footer-copyrights-copy">
          <div>©2020 3D Decor Crimea™</div>
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
