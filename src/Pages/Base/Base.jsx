import { Header, Footer } from '../../Components';
import './base.css';

const Base = (props) => {
  const { children } = props;

  return (
    <div className="base">
      <Header />
      {children}
      <Footer />
    </div>
  );
};

export default Base;
