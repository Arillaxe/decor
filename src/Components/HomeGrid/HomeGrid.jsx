import { GridItem } from './components';
import './homeGrid.css';

const HomeGrid = (props) => {
  const { items, title, type } = props;

  return (
    <div className="homeGrid">
      <div className="homeGrid-title">{title}</div>
      <div className="homeGrid-subtitle">Лидеры продаж</div>
      <div className="homeGrid-gridContainer">
        {items.map((item) => (<GridItem key={item.id} type={type} {...item} />))}
      </div>
    </div>
  );
};

export default HomeGrid;
