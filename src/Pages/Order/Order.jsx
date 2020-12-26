import { Link } from 'react-router-dom';
import { Base } from '..';
import { Breadcrumbs} from '../../Components';
import './order.css';

const Order = () => {
  return (
    <Base>
      <div className="order">
        <h1 className="order-title">Ваш заказ принят</h1>
        <Breadcrumbs items={[
          {
            title: 'Главная',
            link: '/',
          },
          {
            title: 'Корзина',
            link: '/cart',
          },
          {
            title: 'Оформление заказа',
          }
        ]} />
        <div className="order-details">В ближайшее время наш сотрудник свяжется с вами для потверждения вашего заказа</div>
        <Link to="/">
          <div className="order-backButton">На главную</div>
        </Link>
      </div>
    </Base>
  );
};

export default Order;
