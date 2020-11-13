import { Base } from '..';
import { Breadcrumbs} from '../../Components';
import './cart.css';

const Cart = (props) => {
  const { items } = props;

  return (
    <Base>
      <div className="cart">
        <div className="cart-title">Корзина / <span className="cart-title-counter">1 шт.</span></div>
        <Breadcrumbs items={[
          {
            title: 'Главная',
            link: '/',
          },
          {
            title: 'Корзина',
          }
        ]} />
        <div className="cart-items">
        {items.map((item) => (
          <div className="cart-item" key={item.id + item.title}>
            <div className="cart-item-info">
              <img src={item.imageURL} alt=""/>
              <div className="cart-item-title">Модель {item.title}</div>
            </div>
            <div className="cart-item-prices">
              <div className="cart-prices-heading">Количество</div>
              <div className="cart-prices-count">25</div>
              <div className="cart-prices-price">{item.price}</div>
              <div className="cart-prices-cost">Итого: 2099.75 Р</div>
              <div className="cart-item-remove">Удалить</div>
            </div>
          </div>
        ))}
        </div>
        <div className="cart-totals">
          <div className="cart-total">Итого: <span className="cart-total-highlighted">38913.95 Р</span></div>
        </div>
        <div className="cart-order">
          <div className="cart-order-title">Оформление заказа</div>
          <div className="cart-order-input">
            <label htmlFor="order-name">Как вас зовут?</label>
            <input id="order-name" type="text" placeholder="Фамилия Имя Отчество" />
          </div>
          <div className="cart-order-input">
            <label htmlFor="order-email">Электонная почта:</label>
            <input id="order-email" type="email" placeholder="example@mail.ru" />
          </div>
          <div className="cart-order-input">
            <label htmlFor="order-tel">Телефон:</label>
            <input id="order-tel" type="text" placeholder="+79999999999" />
          </div>
          <div className="cart-order-input">
            <label htmlFor="order-address">Адрес доставки:</label>
            <input id="order-address" type="text" placeholder="Город, улица, дом, корпус, квартира" />
          </div>
          <div className="cart-order-input textarea">
            <label htmlFor="order-comment">Комментарий:</label>
            <textarea id="order-comment" placeholder="Комментарий по доставке"></textarea>
          </div>
          <div className="cart-makeOrder">Оформить</div>
        </div>
      </div>
    </Base>
  );
};

export default Cart;
