import { useState, useEffect, useRef } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link } from 'react-router-dom';
import axios from 'axios';
import config from '../../../../config';
import { UploadImage } from '..';
import './addProduct.css';

const { host } = config;

const AddProduct = () => {
  const [fields, setFields] = useState({
    title: '',
    category: '',
    description: '',
    dimensions: '',
    price: '',
    image: '',
    bgImage: '',
  });
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [categories, setCategories] = useState([]);
  const [additionalImagesFields, setAdditionalImagesFields] = useState([{ id: 1, value: {}, ref: useRef() }]);
  const imageRef = useRef();
  const bgImageRef = useRef();

  useEffect(() => {
    const fetchData = async () => {
      const { data: productsData } = await axios.get(`${host}/product`);
      const { data: categoriesData } = await axios.get(`${host}/category`);

      setProducts(productsData.products);
      setCategories(categoriesData.categories);
      setFields((fields) => ({ ...fields, category: categoriesData.categories.length ? categoriesData.categories[0].name : '' }));
    };

    fetchData();
  }, []);

  const addIdField = () => {
    setAdditionalImagesFields([...additionalImagesFields, { id: additionalImagesFields[additionalImagesFields.length - 1].id + 1, value: {} }]);
  };

  const removeIdField = (id) => () => {
    setAdditionalImagesFields([...additionalImagesFields.filter(({ id: fieldId }) => fieldId !== id)]);
  };

  const updateField = (field) => (e) => {
    setFields({ ...fields, [field]: e.target.value });
  };

  const updateFieldByValue = (field) => (value) => {
    setFields({ ...fields, [field]: value });
  }

  const updateImagesField = (id) => (value) => {
    const otherFields = additionalImagesFields.filter(({ id: fieldId }) => fieldId !== id);
    const { ref } = additionalImagesFields.find(({ id: fieldId }) => fieldId === id);

    setAdditionalImagesFields([...otherFields, { id, value, ref }].sort((a, b) => a.id - b.id));
  } 

  const submit = async () => {
    if (loading) return;

    const requiredFields = [
      'title',
      'category',
      'description',
      'dimensions',
      'price',
      'image',
      'bgImage',
    ];

    const formData = new FormData();

    for (let field of requiredFields) {
      if (!fields[field]) return;

      formData.append(field, fields[field]);
    }

    for (let additionalImage of additionalImagesFields) {
      if (!additionalImage.value.name) continue;

      formData.append(`images${additionalImage.id}`, additionalImage.value);
    }

    setLoading(true);

    try {
      const { data } = await axios.put(`${host}/product`, formData, {
        headers: {
          auth: localStorage.getItem('token'),
        },
      });
  
      setProducts([data.product, ...products]);
    } catch (e) {
      console.log(e);
    }
    
    setLoading(false);
    setFields({
      title: '',
      category: categories.length ? categories[0].name : '',
      description: '',
      dimensions: '',
      price: '',
      image: '',
      bgImage: '',
    });
    setAdditionalImagesFields([{ ...additionalImagesFields[0], value: '' }]);
    additionalImagesFields[0].ref.current.clear();

    imageRef.current.clear();
    bgImageRef.current.clear();
  };

  const deleteProduct = (id) => async () => {
    if (loading) return;

    setLoading(true);

    await axios.delete(`${host}/product/${id}`, {
      headers: {
        auth: localStorage.getItem('token'),
      },
    });

    setLoading(false);
    setProducts(products.filter((product) => product._id !== id));
  };

  return (
    <div className="addProduct">
      <div className="addProduct-title">Добавить товар</div>
      <div className="addProduct-form">
        <div className="addProduct-input">
          <label htmlFor="product-title">Название товара</label>
          <input id="product-title" type="text" onChange={updateField('title')} value={fields.title} />
        </div>
        <div className="addProduct-input">
          <label htmlFor="product-category">Категория</label>
          <select id="product-category" type="text" onChange={updateField('category')} value={fields.category}>
          {categories.map(({ _id, name, title }) => (
            <option key={_id} value={name}>{title}</option>
          ))}
          </select>
        </div>
        <div className="addProduct-input">
          <label htmlFor="product-dimensions">Размеры</label>
          <input id="product-dimensions" type="text" onChange={updateField('dimensions')} value={fields.dimensions} />
        </div>
        <div className="addProduct-input">
          <label htmlFor="product-price">Цена</label>
          <input id="product-price" type="text" onChange={updateField('price')} value={fields.price} />
        </div>
        <div className="addProduct-input">
            <UploadImage id="product-image" label="Основная картинка" onChange={updateFieldByValue('image')} ref={imageRef} />
        </div>
        <div className="addProduct-input">
            <UploadImage id="product-bgImage" label="Картинка заднего фона" onChange={updateFieldByValue('bgImage')} ref={bgImageRef} />
        </div>
        <div className="addProduct-input">
          <label>Дополнительные изображения</label>
          {additionalImagesFields.map(({ id, ref }, idx) => (
            <div key={id} className="input-multiple">
              <UploadImage id={`product-images-${id}`} onChange={updateImagesField(id)} ref={ref} />
              {idx === additionalImagesFields.length - 1 ? (
                <div className="input-multiple-button" onClick={addIdField}>
                  <FontAwesomeIcon icon="plus" />
                </div>
              ) : (
                <div className="input-multiple-button" onClick={removeIdField(id)}>
                  <FontAwesomeIcon icon="times" />
                </div>
              )}
            </div>
          ))}
        </div>
        <div className="addProduct-input">
          <label htmlFor="product-description">Описание</label>
          <textarea id="product-description" onChange={updateField('description')} value={fields.description}></textarea>
        </div>
        <div className="addProduct-submit" onClick={submit}>Добавить</div>
      </div>
      <div className="addProduct-existing">
        <div className="addProduct-existing-title">Существующие товары</div>
        {!products.length && (
          <div className="addProduct-existing-none">Товаров нет</div>
        )}
        {products.map((product) => (
          <div key={product._id} className="addProduct-existing-product">
            <div className="addProduct-existing-info">
              <Link target="_blank" to={`/product/${product.category}/${product._id}`}>
                <img src={product.imageURL} alt=""/>
                <div className="addProduct-existing-name">{product.title}</div>
              </Link>
            </div>
            <div className="addProduct-existing-details">
              <div className="addProduct-existing-id">ID</div>
              <div className="addProduct-existing-category">Категория</div>
              <div className="addProduct-existing-dimensions">Размеры</div>
              <div className="addProduct-existing-price">Цена</div>
            </div>
            <div className="addProduct-existing-details">
              <div className="addProduct-existing-id">{product._id}</div>
              <div className="addProduct-existing-category">{product.category}</div>
              <div className="addProduct-existing-dimensions">{product.dimensions}</div>
              <div className="addProduct-existing-price">{product.price} Р/шт</div>
            </div>
            <div className="addProduct-existing-remove" onClick={deleteProduct(product._id)}>Удалить</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AddProduct;
