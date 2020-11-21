import { Link } from 'react-router-dom';
import './gridItem.css';

const GridItem = (props) => {
  const {
    _id: id,
    title,
    dimensions,
    price,
    imageURL,
    category,
  } = props;

  return (
    <div className="gridItem">
      <Link to={`/product/${category}/${id}`}>
        <div className="imageCropper">
          <img src={imageURL} alt=""/>
        </div>
      </Link>
      <div className="gridItem-info">
        <div className="gridItem-info-dimensions">{dimensions}</div>
        <div className="gridItem-info-price">{price} &#8381;</div>
      </div>
      <Link to={`/product/${category}/${id}`}>
        <div className="gridItem-title">{title}</div>
      </Link>
    </div>
  );
};

export default GridItem;
