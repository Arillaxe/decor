import { useState, useEffect } from 'react';
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
  const [sideBarOpened, setSideBarOpened] = useState(false);
  const [acordionOpened, setAcordionOpened] = useState(false);
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

  const onSidebarWrapperClick = (e) => {
    if (typeof e.target.className === 'string' && e.target.className.split(' ').includes('header-bars-sidebar')) {
      setSideBarOpened(false);
    }
  };

  return (
    <header>
      <div className="header-row">
        <div className="header-bars" onClick={() => setSideBarOpened(!sideBarOpened)}>
          <FontAwesomeIcon icon={sideBarOpened ? 'times' : 'bars'} className="header-bars-fa"/>
        </div>
        <div className={`header-bars-sidebar ${sideBarOpened && 'opened'}`} onClick={onSidebarWrapperClick}>
          <div className="header-bars-menu">
            <Link to="/">
              <div className="header-bars-item">Главная</div>
            </Link>
            <div className="header-bars-item" onClick={() => setAcordionOpened(!acordionOpened)}>
              Каталог
              <FontAwesomeIcon icon='chevron-down' className={`header-acordion-fa ${acordionOpened && 'opened'}`} />
            </div>
            <div className={`header-bars-acordion ${acordionOpened && 'opened'}`}>
              <div className="header-acordion-items">
              {categories.map(({ _id, title, name }) => (
                <Link key={_id} to={`/product/${name}`}>
                  <div className="header-acordion-item">{title}</div>
                </Link>
              ))}
              </div>
            </div>
            <Link to="/contacts">
              <div className="header-bars-item">Контакты</div>
            </Link>
            <Link to="/gallery">
              <div className="header-bars-item">Галерея</div>
            </Link>
            <Link to="/about">
              <div className="header-bars-item">О нас</div>
            </Link>
          </div>
        </div>
        <Link to="/">
          <div className="header-title">
            <div className="header-title-big">3D Decor</div>
            <div className="header-title-small">Crimea</div>
          </div>
        </Link>
        <ContactPhone />
        {/* <div className="header-questions">
          <div className="header-questions-title">Есть вопросы? Звоните!</div>
          <div className="header-questions-phone">+7 (985) 33 66 999</div>
        </div> */}
        <Link to="/cart">
          <div className="header-cart">
            <div className="header-cart-button">Корзина</div>
            <div className="header-cart-icon">
              <FontAwesomeIcon icon="shopping-cart" className="header-cart-fa"/>
              <div className="header-cart-counter">{items.length}</div>
            </div>
          </div>
        </Link>
      </div>
      <div className="header-row">
        <div className="header-menu">
          <Link to='/'>
            <div className="header-menu-item">Главная</div>
          </Link>
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
          <Link to='/contacts'>
            <div className="header-menu-item">Контакты</div>
          </Link>
          <Link to='/gallery'>
            <div className="header-menu-item">Галерея</div>
          </Link>
          <Link to="/about">
            <div className="header-menu-item">О нас</div>
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Header;
