import { GridItem } from '../HomeGrid/components';
import './categoryGrid.css';

const CategoryGrid = (props) => {
  const { items, type } = props;

  return (
    <div className="categoryGrid">
    {items.map((item) => (<GridItem key={item.id} type={type} {...item} />))}
    </div>
  );
};

export default CategoryGrid;
