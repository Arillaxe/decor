import { GridItem } from '../HomeGrid/components';
import './categoryGrid.css';

const CategoryGrid = (props) => {
  const { items } = props;

  return (
    <div className="categoryGrid">
    {items.map((item) => (<GridItem key={item._id} {...item} />))}
    </div>
  );
};

export default CategoryGrid;
