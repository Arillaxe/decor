import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Base } from '..';
import { Expandable, HomeGrid, Slider } from '../../Components';
import data from '../../data';
import './home.css';

import slice from './slice';

const { actions } = slice;

const Home = () => {
  const dispatch = useDispatch();
  const products = useSelector(({ home }) => home.products);

  useEffect(() => {
    dispatch(actions.setProducts(data));
  }, [dispatch]);
  
  return (
    <Base>
      <Slider />
      <HomeGrid items={products.filter((product) => product.type === 'panel')} type="panel" title="3D гипсовые панели" />
      <HomeGrid items={products.filter((product) => product.type === 'basreliefs')} type="basreliefs" title="Барельефы" />
      <Expandable />
    </Base>
  );
};

export default Home;
