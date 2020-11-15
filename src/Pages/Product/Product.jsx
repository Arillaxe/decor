import { useState } from 'react';
import { useParams } from 'react-router-dom';
import Viewer from 'react-viewer';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Base } from '..';
import { Breadcrumbs } from '../../Components';
import categoryMappings from '../../categoryMappings';
import './product.css';

const Product = (props) => {
  const { products } = props;
  const { type, id } = useParams();
  const [count, setCount] = useState(0);
  const [ visible, setVisible ] = useState(false);
  const [ imageIndex, setImageIndex ] = useState(0);

  const {
    title,
    description,
    bgImage,
    price,
    dimensions,
    images,
  } = products.find((product) => product.id === Number(id));

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

  return (
    <div className="product">
      <Base>
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
                title: categoryMappings[type],
                link: `/product/${type}`,
              },
              {
                title,
              }
            ]} />
            <div className="product-info-description">{description}</div>
            <div className="product-info-sections">
              <div className="product-info-section">
                <div className="product-section-title">Доставка</div>
                <div className="product-section-description">
                  Доставка по Москве - в течение 2 дней
                  Доставка по всей России - в течение 2-5 дней
                  Самовывоз на следующий день после заказа
                </div> 
              </div>
              <div className="product-info-section">
                <div className="product-section-title">100% Гарантия</div>
                <div className="product-section-description">
                  При отправке вся продукция Deco Line страхуется. Поврежденный товар будет бесплатно заменен.
                </div> 
              </div>
              <div className="product-info-section">
                <div className="product-section-title">Оплата</div>
                <div className="product-section-description">
                  Отгрузка товара происходит по 100% предоплате.
                </div> 
              </div>
            </div>
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
              <div className="product-addToCart-button">Добавить в корзину</div>
            </div>
          </div>
        </div>
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
      </Base>
    </div>
  );
};

export default Product;
