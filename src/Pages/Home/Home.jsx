import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';
import config from '../../config';
import { Base } from '..';
import { HomeGrid, Slider, Sidemenu } from '../../Components';
import { homeGridsSlice, productsSlice } from '../../slices';
import './home.css';

const { actions: homeGridsActions } = homeGridsSlice;
const { actions: productsActions } = productsSlice;
const { host } = config;

const Home = () => {
  const dispatch = useDispatch();
  const homeGrids = useSelector(({ homeGrids }) => homeGrids);
  const products = useSelector(({ products }) => products);

  useEffect(() => {
    const fetchData = async () => {
      const { data } = await axios.get(`${host}/homeGrid`);

      const homeGrids = data.homeGrids.map((homeGrid) => {
        dispatch(productsActions.addProducts(homeGrid.products));

        return { ...homeGrid, products: homeGrid.products.map((product) => product._id) };
      });

      dispatch(homeGridsActions.setHomeGrids(homeGrids));
    };

    fetchData();

  }, [dispatch]);
  
  return (
    <Base>
      <div className="home">
        <Slider />
        <section>
          <Sidemenu />
          {homeGrids.map(({ _id, title, products: homeGridProducts }) => (
            <HomeGrid key={_id} items={products.filter(({ _id }) => homeGridProducts.includes(_id))} type="panel" title={title} />
          ))}
        </section>
      </div>
    </Base>
  );
};

export default Home;
