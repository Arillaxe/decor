import { Link } from 'react-router-dom';
import './gridItem.css';

const GridItem = (props) => {
  const {
    id,
    title,
    dimensions,
    price,
    imageURL,
    type,
  } = props;

  return (
    <div className="gridItem">
      <Link to={`/product/${type}/${id}`}>
        <img src={imageURL} alt=""/>
      </Link>
      <div className="gridItem-info">
        <div className="gridItem-info-dimensions">{dimensions}</div>
        <div className="gridItem-info-price">{price}</div>
      </div>
      <Link to={`/product/${type}/${id}`}>
        <div className="gridItem-title">{title}</div>
      </Link>
    </div>
  );
};

export default GridItem;
