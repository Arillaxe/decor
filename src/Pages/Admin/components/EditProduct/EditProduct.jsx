import { useEffect, useState, Fragment, useRef } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import axios from 'axios';
import config from '../../../../config';
import { UploadImage, Navigation } from '..';
import { Loader } from '../../../../Components';
import './editProduct.css';

const { host } = config;

const EditProduct = () => {
  const history = useHistory();
  const { id } = useParams();
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const [additionalImagesFields, setAdditionalImagesFields] = useState([{ id: 1, value: {}, ref: useRef() }]);
  const [fields, setFields] = useState({
    title: '',
    category: '',
    description: '',
    dimensions: '',
    price: '',
    images: '',
  });

  useEffect(() => {
    const fetchData = async () => {
      const { data: productsData } = await axios.get(`${host}/product/${id}`);
      const { data: categoriesData } = await axios.get(`${host}/category`);

      setCategories(categoriesData.categories);
      setFields(() => ({ 
        title: productsData.products[0].title,
        description: productsData.products[0].description,
        dimensions: productsData.products[0].dimensions,
        price: productsData.products[0].price,
        category: productsData.products[0].category,
        images: productsData.products[0].images,
      }));
    };

    fetchData();
  }, [id]);

  const updateField = (field) => (e) => {
    setFields({ ...fields, [field]: e.target.value });
  };

  const addIdField = () => {
    setAdditionalImagesFields([...additionalImagesFields, { id: additionalImagesFields[additionalImagesFields.length - 1].id + 1, value: {} }]);
  };

  const removeIdField = (id) => () => {
    setAdditionalImagesFields([...additionalImagesFields.filter(({ id: fieldId }) => fieldId !== id)]);
  };

  const updateImagesField = (id) => (value) => {
    const otherFields = additionalImagesFields.filter(({ id: fieldId }) => fieldId !== id);
    const { ref } = additionalImagesFields.find(({ id: fieldId }) => fieldId === id);

    setAdditionalImagesFields([...otherFields, { id, value, ref }].sort((a, b) => a.id - b.id));
  }

  const deleteImage = (imageURL) => async () => {
    if (loading) return;

    setLoading(true);

    try {
      await axios.post(`${host}/product/image/${id}`, { imageURL }, {
        headers: {
          auth: localStorage.getItem('token'),
        },
      });

      setFields({ ...fields, images: fields.images.filter((image) => image !== imageURL) })
    } catch (e) {
      console.log(e);
    }

    setLoading(false);
  };

  const submit = async () => {
    if (loading) return;

    const requiredFields = [
      'title',
      'category',
      'description',
      'dimensions',
      'price',
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
      await axios.post(`${host}/product/${id}`, formData, {
        headers: {
          auth: localStorage.getItem('token'),
        },
      });

      history.push('/admin/product');
    } catch (e) {
      console.log(e);
    }

    setLoading(false);
  };

  return (
    <Fragment>
      <Navigation />
      {loading && <Loader />}
      <div className="editProduct">
        <div className="editProduct-column">
          <div className="editProduct-title">Редактирование</div>
          <div className="editProduct-form">
            <div className="editProduct-input">
              <label htmlFor="product-title">Название товара</label>
              <input id="product-title" type="text" onChange={updateField('title')} value={fields.title} />
            </div>
            <div className="editProduct-input">
              <label htmlFor="product-category">Категория</label>
              <select id="product-category" type="text" onChange={updateField('category')} value={fields.category}>
              {categories.map(({ _id, name, title }) => (
                <option key={_id} value={name}>{title}</option>
              ))}
              </select>
            </div>
            <div className="editProduct-input">
              <label htmlFor="product-dimensions">Размеры</label>
              <input id="product-dimensions" type="text" onChange={updateField('dimensions')} value={fields.dimensions} />
            </div>
            <div className="editProduct-input">
              <label htmlFor="product-price">Цена</label>
              <input id="product-price" type="text" onChange={updateField('price')} value={fields.price} />
            </div>
            <div className="editProduct-input">
              <label htmlFor="product-description">Описание</label>
              <textarea id="product-description" onChange={updateField('description')} value={fields.description}></textarea>
            </div>
            <div className="editProduct-submit" onClick={submit}>Сохранить</div>
          </div>
        </div>
        <div className="editProduct-column">
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
          <div className="editProduct-existing">
            {fields.images && fields.images.map((imageURL, idx) => (
              <div key={idx + imageURL} className="imageCropper" onClick={deleteImage(imageURL)}>
                <img src={imageURL} alt=""/>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default EditProduct;
