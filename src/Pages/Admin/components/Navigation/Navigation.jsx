import { Link, useHistory } from 'react-router-dom';
import './navigation.css';

const Navigation = ({ match }) => {
  const history = useHistory();

  const logOut = () => {
    localStorage.setItem('token', '');
    history.push('/admin/login');
  };

  if (!localStorage.getItem('token')) {
    history.push('/admin/login');
  }

  return (
    <div className="adminNavigation">
      <div className="admin-tabs">
        <Link to="/admin">
          <div className={`admin-tab ${window.location.pathname === '/admin' && 'active'}`}>Заказы</div>
        </Link>
        <Link to="/admin/product">
          <div className={`admin-tab ${window.location.pathname === '/admin/product' && 'active'}`}>Товары</div>
        </Link>
        <Link to="/admin/category">
          <div className={`admin-tab ${window.location.pathname === '/admin/category' && 'active'}`}>Категории</div>
        </Link>
        <Link to="/admin/homeGrid">
          <div className={`admin-tab ${window.location.pathname === '/admin/homeGrid' && 'active'}`}>Лидеры продаж</div>
        </Link>
        <Link to="/admin/reviews">
          <div className={`admin-tab ${window.location.pathname === '/admin/reviews' && 'active'}`}>Отзывы</div>
        </Link>
        <Link to="/admin/gallery">
          <div className={`admin-tab ${window.location.pathname === '/admin/gallery' && 'active'}`}>Галерея</div>
        </Link>
        <div className="admin-tab logout" onClick={logOut}>Выход</div>
      </div>
    </div>
  );
};

export default Navigation;
