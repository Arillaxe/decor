import { useSelector, useDispatch } from 'react-redux'; 
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import config from '../../config';
import { Base } from '..';
import { Breadcrumbs, CategoryGrid } from '../../Components';
import { productsSlice } from '../../slices';
import './category.css';

const { actions: productsActions } = productsSlice;
const { host } = config;

const Category = () => {
  const dispatch = useDispatch();
  const products = useSelector(({ products }) => products);
  const categories = useSelector(({ categories }) => categories);
  const { type } = useParams();
  const category = categories.find(({ name }) => name === type) || {};

  useEffect(() => {
    const fetchData = async () => {
      const { data } = await axios.get(`${host}/product`);

      dispatch(productsActions.addProducts(data.products));
    };

    fetchData();

  }, [dispatch]);

  return (
    <Base>
      <div className="category">
        <div className="category-title">{category.title}</div>
        <Breadcrumbs items={[
          {
            title: 'Главная',
            link: '/',
          },
          {
            title: category.title,
          }
        ]} />
        <CategoryGrid items={products.filter(({ category: productCategory }) => productCategory === category.name)} category={category} />
      </div>
    </Base>
  );
};

export default Category;
