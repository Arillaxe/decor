import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import axios from 'axios';
import config from '../../config';
import { ContactPhone } from '..';
import { cartSlice, categoriesSlice } from '../../slices';
import './header.css';

const { host } = config;
const { actions: cartActions } = cartSlice;
const { actions: categoiresActions } = categoriesSlice;

const Header = () => {
  const dispatch = useDispatch();
  const items = useSelector(({ cart }) => cart);
  const categories = useSelector(({ categories }) => categories);

  useEffect(() => {
    dispatch(cartActions.setItems(JSON.parse(localStorage.getItem('cart')) || []));

    if (!categories.length) {
      const fetchData = async () => {
        const { data } = await axios.get(`${host}/category`);

        dispatch(categoiresActions.setCategories(data.categories));
      };

      fetchData();
    }
  }, [dispatch, categories.length]);

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
                <div className="header-cart-counter">{items.length}</div>
            </div>
            <div className="header-cart-button">Корзина</div>
          </div>
        </Link>
      </div>
      <div className="header-row">
        <div className="header-menu">
          <div className="header-menu-item dropdown">
            Каталог
            <div className="header-dropdown">
              {categories.map(({ _id, name, title }) => (
                <Link key={_id} to={`/product/${name}`}>
                  <div className="header-dropdown-item">{title}</div>
                </Link>
              ))}
              <div className="header-dropdown-item"></div>
            </div>
          </div>
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
