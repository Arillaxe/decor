import { useState, useEffect, Fragment } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useHistory } from 'react-router-dom';
import Viewer from 'react-viewer';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import axios from 'axios';
import config from '../../config';
import { Base } from '..';
import { Breadcrumbs } from '../../Components';
import { cartSlice, productsSlice } from '../../slices';
import './product.css';

const { host } = config;
const { actions: productsActions } = productsSlice;
const { actions: cartActions } = cartSlice;

const Product = () => {
  const dispatch = useDispatch();
  const products = useSelector(({ products }) => products);
  const { type, id } = useParams();
  const history = useHistory();
  const [count, setCount] = useState(0);
  const [visible, setVisible] = useState(false);
  const [imageIndex, setImageIndex] = useState(0);
  const categories = useSelector(({ categories }) => categories);
  const category = categories.find(({ name }) => name === type) || {};

  useEffect(() => {
    const fetchData = async () => {
      const { data } = await axios.get(`${host}/product/${id}`);

      dispatch(productsActions.addProducts(data.products));
    };

    if (!products.find((product) => product._id === id)) fetchData();
  }, [dispatch, id, products]);

  const product = products.find((product) => product._id === id);

  const {
    title,
    description,
    bgImage,
    price,
    dimensions,
    images,
  } =  product || {};

  const preventSelectionHOC = (fn) => () => {
    if (document.selection && document.selection.empty) {
      document.selection.empty();
    } else if (window.getSelection) {
      var sel = window.getSelection();
      sel.removeAllRanges();
    }

    fn();
  };
  const addCount = () => setCount(count + 1);
  const subCount = () => setCount(count <= 1 ? 0 : count - 1);
  const onChange = (e) => {
    const value = e.target.value;
    const parsed = Number(value.trim().replaceAll('-', ''));

    if (!Number.isNaN(parsed)) setCount(parsed);
  };

  const openImage = (index = 0) => {
    setImageIndex(index);
    setVisible(true);
  }

  const addToCart = () => {
    if (count === 0) return;

    dispatch(cartActions.addItems(Array(count).fill(product)));
    history.push('/cart');
  };

  return (
    <div className="product">
      <Base>
      {product && (
        <Fragment>
          <div className="product-jumbotron" style={{ backgroundImage: `url(${bgImage})` }}></div>
          <div className="product-container">
            <div className="product-info">
              <div className="product-info-title">{title}</div>
              <Breadcrumbs items={[
                {
                  title: 'Главная',
                  link: '/',
                },
                {
                  title: category.title,
                  link: `/product/${category.name}`,
                },
                {
                  title,
                }
              ]} />
              <div className="product-info-description">{description}</div>
            </div>
            <div className="product-addToCart">
              <div className="product-addToCart-row">
                <div className="product-addToCart-model">Модель: {title}</div>
                <div className="product-addToCart-price">{price}</div>
              </div>
              <div className="product-addToCart-counter">
                <div className="product-counter-title">Количество:</div>
                <div className="product-counter-input">
                  <div className="product-counter-control" onClick={preventSelectionHOC(subCount)}>
                    <FontAwesomeIcon icon="minus" />
                  </div>
                  <input type="text" value={count} onChange={onChange} />
                  <div className="product-counter-control" onClick={preventSelectionHOC(addCount)}>
                    <FontAwesomeIcon icon="plus" />
                  </div>
                </div>
                <div className="product-addToCart-dimensions">Размер одной панели: {dimensions}</div>
                <div className="product-addToCart-button" onClick={addToCart}>Добавить в корзину</div>
              </div>
            </div>
          </div>
          {!!images.length && (
            <div className="product-container images">
              <div className="product-additionalImages">
                <div className="product-additionalImages-title">Дополнительные фото</div>
                <div className="product-additionalImages-images">
                  {images.map((image, idx) => (
                    <img key={image + idx} src={image} alt="" onClick={() => openImage(idx)} />
                  ))}
                  <Viewer
                    visible={visible}
                    onClose={() => { setVisible(false); } }
                    images={images.map((image) => ({ src: image, alt: '' }))}
                    activeIndex={imageIndex}
                    drag={false}
                    disableMouseZoom={true}
                    noImgDetails={true}
                    zoomable={false}
                    scalable={false}
                    rotatable={false}
                    onMaskClick={() => { setVisible(false); }}
                  />
                </div>
              </div>
            </div>
          )}
          <div className="product-reviews-container">
            <div className="product-reviews-title">Отзывы</div>
            <div className="product-reviews">
              <div className="product-review">
                <div className="product-review-avatar">С</div>
                <div className="product-review-body">
                  <div className="product-review-text">
                  Красивейший барельеф получился! Очень удобный сайт, легко пользоваться. Конечно сложно затеряться, среди огромного каталога, но грамотные менеджеры помогут! Звоните им, не стесняйтесь!
                  </div>
                  <div className="product-review-info">
                    <span className="product-review-author">Стася - </span>
                    <span className="product-review-date">12.10.2019</span>
                  </div>
                </div>
              </div>
              <div className="product-review">
                <div className="product-review-avatar">С</div>
                <div className="product-review-body">
                  <div className="product-review-text">
                  Красивейший барельеф получился! Очень удобный сайт, легко пользоваться. Конечно сложно затеряться, среди огромного каталога, но грамотные менеджеры помогут! Звоните им, не стесняйтесь!
                  </div>
                  <div className="product-review-info">
                    <span className="product-review-author">Стася - </span>
                    <span className="product-review-date">12.10.2019</span>
                  </div>
                </div>
              </div>
              <div className="product-review">
                <div className="product-review-avatar">С</div>
                <div className="product-review-body">
                  <div className="product-review-text">
                  Красивейший барельеф получился! Очень удобный сайт, легко пользоваться. Конечно сложно затеряться, среди огромного каталога, но грамотные менеджеры помогут! Звоните им, не стесняйтесь!
                  </div>
                  <div className="product-review-info">
                    <span className="product-review-author">Стася - </span>
                    <span className="product-review-date">12.10.2019</span>
                  </div>
                </div>
              </div>
            </div>
            <div className="product-reviews-form">
              <div className="product-form-title">Добавить свой отзыв</div>
              <div className="product-form-name">
                  <input type="text" placeholder="Ваше имя" />
              </div>
              <div className="product-form-review">
                <textarea name="review" id="review" rows="5" placeholder="Ваш отзыв"></textarea>
              </div>
              <div className="product-form-button">Добавить отзыв</div>
            </div>
          </div>
        </Fragment>
      )}
      </Base>
    </div>
  );
};

export default Product;
