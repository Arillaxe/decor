import { Base } from '..';
import { Breadcrumbs} from '../../Components';
import './order.css';

const Order = () => {
  return (
    <Base>
      <div className="order">
        <div className="order-title">Оформление заказа</div>
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
      </div>
    </Base>
  );
};

export default Order;
