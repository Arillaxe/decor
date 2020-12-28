import { useEffect } from 'react';
import { Base } from '..';
import { Breadcrumbs } from '../../Components';
import './discounts.css';

const Discounts = () => {
  useEffect(() => {
    document.title = 'Скидки | Гипсовые панели 3д купить в Симферополе для внутренней отделки';
  }, []);

  return (
    <Base>
      <div className="discounts">
       <h1 className="discounts-title">Скидки</h1>
        <Breadcrumbs items={[
          {
            title: 'Главная',
            link: '/',
          },
          {
            title: 'Скидки',
          }
        ]} />
         <div className="discounts-description">
          Оформляя заказ в нашем интернет магазине, Вы получаете скидку от объема заказа:
          <ul>
            <li>от 15 000 до 25 000 руб - скидка 3% от 100 000 до 130 000 - скидка 15%</li>
            <li>от 25 000 до 40 000 руб - скидка 5% от 130 000 до 150 000 - скидка 18%</li>
            <li>от 40 000 до 60 000 руб - скидка 8% от 150 000 до 180 000 - скидка 20%</li>
            <li>от 60 000 до 80 000 руб - скидка 10% от 180 000 до 220 000 - скидка 22%</li>
            <li>от 80 000 до 100 000 руб - скидка 12% от 220 000 - скидка 25%</li>
          </ul>
        </div>
      </div>
    </Base>
  );
};

export default Discounts;
