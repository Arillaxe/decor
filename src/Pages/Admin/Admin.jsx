import { useState } from 'react';
import {
  AddCategory,
  AddHomeGrid,
  AddProduct,
  Login,
  Orders,
} from './components';
import './admin.css';

const Admin = () => {
  const [loggedIn, setLoggedIn] = useState(!!localStorage.getItem('token'));
  const [tab, setTab] = useState('orders');

  const tabSelector = (tab) => () => setTab(tab);

  const logOut = () => {
    setLoggedIn(false);
    localStorage.setItem('token', '');
  };

  return (
    <div className="admin">
    {!loggedIn && (
      <Login setLoggedIn={setLoggedIn} />
    )}
    {loggedIn && (
      <div className="admin-loggedIn">
        <div className="admin-tabs">
          <div className={`admin-tab ${tab === 'orders' && 'active'}`} onClick={tabSelector('orders')}>Заказы</div>
          <div className={`admin-tab ${tab === 'addProduct' && 'active'}`} onClick={tabSelector('addProduct')}>Товары</div>
          <div className={`admin-tab ${tab === 'addCategory' && 'active'}`} onClick={tabSelector('addCategory')}>Категории</div>
          <div className={`admin-tab ${tab === 'addHomeGrid' && 'active'}`} onClick={tabSelector('addHomeGrid')}>Лидеры продаж</div>
          <div className="admin-tab logout" onClick={logOut}>Выход</div>
        </div>
        {tab === 'orders' && (<Orders />)}
        {tab === 'addProduct' && (<AddProduct />)}
        {tab === 'addCategory' && (<AddCategory />)}
        {tab === 'addHomeGrid' && (<AddHomeGrid />)}
      </div>
    )}
    </div>
  );
};

export default Admin;
