import { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link } from 'react-router-dom';
import axios from 'axios';
import config from '../../../../config';
import './orders.css';

const { host } = config;

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      const { data } = await axios.get(`${host}/order`, {
        headers: {
          auth: localStorage.getItem('token'),
        },
      });

      setOrders(data.orders);
    };

    fetchData();
  }, []);

  const deleteOrder = (id) => async () => {
    if (loading) return;

    setLoading(true);

    await axios.delete(`${host}/order/${id}`, {
      headers: {
        auth: localStorage.getItem('token'),
      },
    });

    setOrders(orders.filter((order) => order._id !== id));
    setLoading(false);
  };

  return (
    <div className="admin-orders">
      <div className="admin-orders-title">Заказы</div>
      {!orders.length ? (
        <div className="admin-orders-none">Заказов нет</div>
      ) : (
        <div className="admin-orders-conatiner">
          <div className="admin-order header">
            <div className="admin-order-name">Имя</div>
            <div className="admin-order-email">Email</div>
            <div className="admin-order-phone">Телефон</div>
            <div className="admin-order-address">Адрес</div>
            <div className="admin-order-products">Товары</div>
            <div className="admin-order-comment">Комментарий</div>
          </div>
          {orders.map((order) => (
            <div key={order._id} className="admin-order">
              <div className="admin-order-name">{order.name}</div>
              <div className="admin-order-email">{order.email}</div>
              <div className="admin-order-phone">{order.phone}</div>
              <div className="admin-order-address">{order.address}</div>
              <div className="admin-order-products">
                {order.products.map(({ amount, product }) => (
                  <div key={product._id} className="admin-order-product">
                    <div className="admin-product-title"><span className="bold"><Link target="_blank" to={`/product/${product.category}/${product._id}`}>{product.title}</Link></span> x {amount}</div>
                    <div className="admin-product-price">{(product.price * amount).toFixed(2)} &#8381;</div>
                  </div>
                ))}
                <div className="admin-order-product">
                    <div className="admin-product-title">Итого</div>
                    <div className="admin-product-price">{(order.products.reduce((total, { amount, product }) => total + amount * product.price, 0)).toFixed(2)} &#8381;</div>
                </div>
              </div>
              <div className="admin-order-comment">{order.comment}</div>
              <div className="admin-order-remove" onClick={deleteOrder(order._id)}>
                <FontAwesomeIcon icon="trash" />
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Orders;
