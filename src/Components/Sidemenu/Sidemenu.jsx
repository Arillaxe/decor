import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import './sidemenu.css';

const Sidemenu = () => {
  const categories = useSelector(({ categories }) => categories);

  return (
    <div className="sidemenu">
      <h2 className="sidemenu-title">Каталог</h2>
      {categories.map(({ _id, name, title }) => (
        <Link key={_id} to={`/product/${name}`}>
          <div className="sidemenu-item">{title}</div>
        </Link>
      ))}
    </div>
  );
};

export default Sidemenu;
