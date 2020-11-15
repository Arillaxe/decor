import { useState, useEffect } from 'react';
import axios from 'axios';
import config from '../../../../config';
import './addProduct.css';

const { host } = config;

const AddProduct = () => {
  const [fields, setFields] = useState({
    title: '',
    category: '',
    description: '',
    dimensions: '',
    price: '',
    imageURL: '',
    bgImage: '',
  });
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const { data: productsData } = await axios.get(`${host}/product`);
      const { data: categoriesData } = await axios.get(`${host}/category`);

      setProducts(productsData.products);
      setCategories(categoriesData.categories);
      setFields((fields) => ({ ...fields, category: categoriesData.categories[0].name }));
    };

    fetchData();
  }, []);

  const updateField = (field) => (e) => {
    setFields({ ...fields, [field]: e.target.value });
  };

  const submit = async () => {
    if (loading) return;
    
    const requiredFields = [
      'title',
      'category',
      'description',
      'dimensions',
      'price',
      'imageURL',
      'bgImage',
    ];

    console.log(fields);

    for (let field of requiredFields) {
      if (!fields[field]) return;
    }

    setLoading(true);

    const { data } = await axios.put(`${host}/product`, fields, {
      headers: {
        auth: localStorage.getItem('token'),
      },
    });

    setProducts([data.product, ...products]);
    setLoading(false);
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
          <input id="product-title" type="text" onChange={updateField('title')}/>
        </div>
        <div className="addProduct-input">
          <label htmlFor="product-category">Категория</label>
          <select id="product-category" type="text" onChange={updateField('category')}>
          {categories.map(({ _id, name }) => (
            <option key={_id} value={name}>{name}</option>
          ))}
          </select>
        </div>
        <div className="addProduct-input">
          <label htmlFor="product-dimensions">Размеры</label>
          <input id="product-dimensions" type="text" onChange={updateField('dimensions')}/>
        </div>
        <div className="addProduct-input">
          <label htmlFor="product-price">Цена</label>
          <input id="product-price" type="text" onChange={updateField('price')}/>
        </div>
        <div className="addProduct-input">
          <label htmlFor="product-imageURL">URL картинки</label>
          <input id="product-imageURL" type="text" onChange={updateField('imageURL')}/>
        </div>
        <div className="addProduct-input">
          <label htmlFor="product-bgImage">URL картинки заднего фона</label>
          <input id="product-bgImage" type="text" onChange={updateField('bgImage')}/>
        </div>
        <div className="addProduct-input">
          <label htmlFor="product-description">Описание</label>
          <textarea id="product-description" onChange={updateField('description')}></textarea>
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
              <img src={product.imageURL} alt=""/>
              <div className="addProduct-existing-name">{product.title}</div>
            </div>
            <div className="addProduct-existing-details">
              <div className="addProduct-existing-category">Категория</div>
              <div className="addProduct-existing-dimensions">Размеры</div>
              <div className="addProduct-existing-price">Цена</div>
            </div>
            <div className="addProduct-existing-details">
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
