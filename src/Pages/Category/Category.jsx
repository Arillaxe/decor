import { Link, useParams } from 'react-router-dom';
import { Base } from '..';
import { Expandable, CategoryGrid } from '../../Components';
import categoryMappings from '../../categoryMappings';
import './category.css';

const Category = (props) => {
  const { products } = props;
  const { type } = useParams();

  return (
    <Base>
      <div className="category">
        <div className="category-title">{categoryMappings[type]}</div>
        <div className="category-breadcrumbs">
          <Link to="/">
            <div className="category-breadcrumb">Главная</div>
          </Link>/
          <div className="category-breadcrumb inactive">{categoryMappings[type]}</div>
        </div>
        <CategoryGrid items={products[type]} type={type} />
      </div>
    </Base>
  );
};

export default Category;
