import { Base } from '..';
import { HomeGrid, Slider } from '../../Components';
import './home.css';

const Home = (props) => {
  return (
    <Base>
      <Slider />
      <HomeGrid />
    </Base>
  );
};

export default Home;
