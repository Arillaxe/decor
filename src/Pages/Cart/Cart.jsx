import { Link } from 'react-router-dom';
import { Base } from '..';
import './cart.css';

const Cart = (props) => {
  const { items } = props;

  return (
    <Base>
      <div className="cart">
        <div className="cart-title">Корзина / <span className="cart-title-counter">1 шт.</span></div>
        <div className="cart-breadcrumbs">
          <Link to="/">
            <div className="cart-breadcrumb">Главная</div>
          </Link>/
          <div className="cart-breadcrumb inactive">Корзина</div>
        </div>
        <div className="cart-items">
        {items.map((item) => (
          <div className="cart-item">
            <div className="cart-item-info">
              <img src={item.imageURL} alt=""/>
              <div className="cart-item-title">Модель {item.title}</div>
            </div>
            <div className="cart-item-prices">
              <div className="cart-prices-heading">Количесвто</div>
              <div className="cart-prices-count">25</div>
              <div className="cart-prices-price">{item.price}</div>
              <div className="cart-prices-cost">Итого: 2099.75 Р</div>
              <div className="cart-item-remove">Удалить</div>
            </div>
          </div>
        ))}
        </div>
        <div className="cart-totals">
          <div className="cart-total">Итого: 38913.95 Р</div>
          <div className="cart-makeOrder">Перейти к оформлению</div>
        </div>
      </div>
    </Base>
  );
};

export default Cart;
