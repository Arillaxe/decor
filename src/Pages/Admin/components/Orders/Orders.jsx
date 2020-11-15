import './orders.css';

const Orders = () => {
  const orders = [];

  return (
    <div className="orders">
      <div className="orders-title">Заказы</div>
      {!orders.length && (
        <div className="orders-none">Заказов нет</div>
      )}
    </div>
  );
};

export default Orders;
