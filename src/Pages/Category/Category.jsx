import { useParams } from 'react-router-dom';
import { Base } from '..';
import { Breadcrumbs, CategoryGrid } from '../../Components';
import categoryMappings from '../../categoryMappings';
import './category.css';

const Category = (props) => {
  const { products } = props;
  const { type } = useParams();

  return (
    <Base>
      <div className="category">
        <div className="category-title">{categoryMappings[type]}</div>
        <Breadcrumbs items={[
          {
            title: 'Главная',
            link: '/',
          },
          {
            title: categoryMappings[type],
          }
        ]} />
        <CategoryGrid items={products[type]} type={type} />
      </div>
    </Base>
  );
};

export default Category;
