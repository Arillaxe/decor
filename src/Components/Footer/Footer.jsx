import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { ContactPhone } from '..';
import './footer.css';

const Footer = (props) => {
  return (
    <footer>
      <div className="footer-container">
        <div className="footer-contacts">
          <ContactPhone />
          <div className="footer-contacts-email">
            <a href="mailto:info@decorproducts.ru">info@decorproducts.ru</a> - по всем вопросам
          </div>
          <div className="footer-contacts-findus">
            <div className="footer-findus-title">Ищите нас здесь:</div>
            <div className="footer-findus-icons">
              <FontAwesomeIcon icon={['fab' ,'vk']} className="footer-findus-icon" />
              <FontAwesomeIcon icon={['fab', 'instagram']} className="footer-findus-icon" />
              <FontAwesomeIcon icon={['fab', 'facebook']} className="footer-findus-icon" />
            </div>
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
            <div className="footer-column-title">Информация</div>
            <div className="footer-column-item">Доставка и оплата</div>
            <div className="footer-column-item">Гарантия и возврат</div>
            <div className="footer-column-item">Производство</div>
            <div className="footer-column-item">Монтаж 3Д панелей</div>
          </div>
          <div className="footer-menu-column">
            <div className="footer-column-title">Партнерам</div>
            <div className="footer-column-item">Строительным организациям</div>
            <div className="footer-column-item">Дизайнерам</div>
            <div className="footer-column-item">Дилерам</div>
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
          <div>©2010-2017 Deco Line™</div>
          <div>Официальный сайт</div>
        </div>
        <div className="footer-copyrights-text">
          Все материалы данного сайта являются объектами авторского права. Запрещается копирование, распространение или любое иное использование информации и объектов.
        </div>
        <div className="footer-copyrights-icons">
          <FontAwesomeIcon icon={['fab' ,'cc-visa']} className="footer-copyrights-icon" />
          <FontAwesomeIcon icon={['fab' ,'cc-mastercard']} className="footer-copyrights-icon" />
        </div>
      </div>
    </footer>
  );
};

export default Footer;
