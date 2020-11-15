import { useState, useEffect } from 'react';
import axios from 'axios';
import config from '../../../../config';
import './addCategory.css';

const { host } = config;

const AddCategory = () => {
  const [categories, setCategories] = useState([]);
  const [name, setName] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      const { data } = await axios.get(`${host}/category`);

      setCategories(data.categories);
    };

    fetchData();
  }, []);

  const submit = async () => {
    if (!name.trim() || loading) return;

    setLoading(true);

    try {
      const { data } = await axios.put(`${host}/category`, { name }, {
        headers: {
          auth: localStorage.getItem('token'),
        },
      });
  
      setError('');
      setCategories([data.category, ...categories]);
      setName('');
    } catch (e) {
      setError(e.response.data.error);
    }

    setLoading(false);
  };

  const deleteCategory = (id) => async () => {
    if (loading) return;

    setLoading(true);

    await axios.delete(`${host}/category/${id}`, {
      headers: {
        auth: localStorage.getItem('token'),
      },
    });

    setLoading(false);
    setCategories(categories.filter((category) => category._id !== id));
  };

  return (
    <div className="addCategory">
      <div className="addCategory-title">Добавить категорию</div>
      <div className="addCategory-form">
        <div className="addCategory-input">
          <label htmlFor="category-name">Название категории</label>
          <input id="category-name" type="text" onChange={(e) => setName(e.target.value)} value={name} />
        </div>
        {error && (
          <div className="addCategory-error">{'' + error}</div>
        )}
        <div className="addCategory-submit" onClick={submit}>Добавить</div>
      </div>
      <div className="addCategory-existing">
        <div className="addCategory-existing-title">Существующие категории</div>
        {!categories.length && (
          <div className="addCategory-existing-none">Категорий нет</div>
        )}
        {categories.map(({ _id, name }) => (
          <div key={_id} className="addCategory-existing-category">
            <div className="addCategory-existing-name">{name}</div>
            <div className="addCategory-existing-remove" onClick={deleteCategory(_id)}>Удалить</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AddCategory;
