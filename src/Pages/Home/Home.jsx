import { Base } from '..';
import { Expandable, HomeGrid, Slider } from '../../Components';
import './home.css';

const Home = (props) => {
  const { products } = props;

  return (
    <Base>
      <Slider />
      <HomeGrid items={products['panel']} type="panel" title="3D гипсовые панели" />
      <HomeGrid items={products['basreliefs']} type="basreliefs" title="Барельефы" />
      <Expandable />
    </Base>
  );
};

export default Home;
