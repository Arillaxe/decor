import { useEffect, useState, Fragment } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import axios from 'axios';
import config from '../../config';
import { Base } from '..';
import { Breadcrumbs} from '../../Components';
import { cartSlice } from '../../slices';
import './cart.css';

const { host } = config;
const { actions } = cartSlice;

const Cart = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const items = useSelector(({ cart }) => cart);
  const [fields, setFields] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    comment: '',
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    dispatch(actions.setItems(JSON.parse(localStorage.getItem('cart')) || []));
  }, [dispatch]);

  const aggregatedProducts = items.reduce((aggregated, product) => {
    const existing = aggregated.find(({ product: { _id } }) => _id === product._id);

    if (existing) {
      existing.amount++;
    } else {
      aggregated.push({ amount: 1, product });
    }

    return aggregated;
  }, []);

  const totalPrice = aggregatedProducts.reduce((total, { amount, product }) => total + amount * product.price, 0).toFixed(2);

  const removeFromCart = (id) => () => {
    dispatch(actions.setItems(items.filter(({ _id }) => _id !== id)));
  };

  const updateField = (field) => (e) => {
    setFields({ ...fields, [field]: e.target.value });
  };

  const submit = async () => {
    if (loading) return;
    
    const requiredFields = [
      'name',
      'phone',
      'address',
    ];

    for (let field of requiredFields) {
      if (!fields[field]) return setError('Пожалуйста, заполните все поля отмеченные звездочкой');
    }

    setLoading(true);

    await axios.put(`${host}/order`, { 
      ...fields,
      products: items.map(({ _id }) => _id),
    }, {
      headers: {
        auth: localStorage.getItem('token'),
      },
    });

    dispatch(actions.setItems([]));
    history.push('/order');
  };

  return (
    <Base>
      <div className="cart">
        <div className="cart-title">Корзина {!!items.length && (<Fragment>/ <span className="cart-title-counter">{items.length} шт.</span></Fragment>)}</div>
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
        {!items.length && (
          <Fragment>
            <div className="cart-empty">В вашей корзине ничего нет</div>
            <Link to="/">
              <div className="cart-backButton">На главную</div>
            </Link>
          </Fragment>
        )}
        {aggregatedProducts.map(({ amount, product }) => (
          <div className="cart-item" key={product._id}>
            <div className="cart-item-info">
              <Link to={`/product/${product.category}/${product._id}`}>
                <img src={product.imageURL} alt=""/>
                <div className="cart-item-title">Модель {product.title}</div>
              </Link>
            </div>
            <div className="cart-item-prices">
              <div className="cart-prices-heading">Количество</div>
              <div className="cart-prices-count">{amount}</div>
              <div className="cart-prices-price">{product.price} &#8381;</div>
              <div className="cart-prices-cost">{(product.price * amount).toFixed(2)} &#8381;</div>
              <div className="cart-item-remove" onClick={removeFromCart(product._id)}>Удалить</div>
            </div>
          </div>
        ))}
        </div>
        {!!items.length && (
          <Fragment>
            <div className="cart-totals">
              <div className="cart-total">Итого: <span className="cart-total-highlighted">{totalPrice} &#8381;</span></div>
            </div>
            <div className="cart-order">
              <div className="cart-order-title">Оформление заказа</div>
              {error && (
                <div className="cart-order-error">{error}</div>
              )}
              <div className="cart-order-input">
                <label htmlFor="order-name">Как вас зовут?</label>
                <input id="order-name" type="text" placeholder="Фамилия Имя Отчество" onChange={updateField('name')}/>
                <FontAwesomeIcon icon="asterisk" className="cart-input-required"/>
              </div>
              <div className="cart-order-input">
                <label htmlFor="order-email">Электонная почта:</label>
                <input id="order-email" type="email" placeholder="example@mail.ru" onChange={updateField('email')}/>
              </div>
              <div className="cart-order-input">
                <label htmlFor="order-tel">Телефон:</label>
                <input id="order-tel" type="text" placeholder="+79999999999" onChange={updateField('phone')}/>
                <FontAwesomeIcon icon="asterisk" className="cart-input-required"/>
              </div>
              <div className="cart-order-input">
                <label htmlFor="order-address">Адрес доставки:</label>
                <input id="order-address" type="text" placeholder="Город, улица, дом, корпус, квартира" onChange={updateField('address')}/>
                <FontAwesomeIcon icon="asterisk" className="cart-input-required"/>
              </div>
              <div className="cart-order-input textarea">
                <label htmlFor="order-comment">Комментарий:</label>
                <textarea id="order-comment" placeholder="Комментарий по доставке" onChange={updateField('comment')}></textarea>
              </div>
              <div className="cart-makeOrder" onClick={submit}>Оформить</div>
            </div>
          </Fragment>
        )}
      </div>
    </Base>
  );
};

export default Cart;
