import { Link } from 'react-router-dom';
import { Base } from '..';
import { Breadcrumbs} from '../../Components';
import './order.css';

const Order = () => {
  return (
    <Base>
      <div className="order">
        <div className="order-title">Ваш заказ принят</div>
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
