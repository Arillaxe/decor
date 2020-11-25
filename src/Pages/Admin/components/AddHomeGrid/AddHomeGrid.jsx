import { useState, useEffect, Fragment } from 'react';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import config from '../../../../config';
import { Navigation } from '..';
import { Loader } from '../../../../Components';
import './addHomeGrid.css';

const { host } = config;

const AddHomeGrid = () => {
  const [title, setTitle] = useState('');
  const [idFields, setIdFields] = useState([{ id: 1, value: '' }]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [homeGrids, setHomeGrids] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const { data } = await axios.get(`${host}/homeGrid`);

      setHomeGrids(data.homeGrids);
    };

    fetchData();
  }, []);

  const addIdField = () => {
    setIdFields([...idFields, { id: idFields[idFields.length - 1].id + 1, value: '' }]);
  };

  const removeIdField = (id) => () => {
    setIdFields([...idFields.filter(({ id: fieldId }) => fieldId !== id)]);
  };

  const setIdFieldValue = (id) => (e) => {
    const otherFields = idFields.filter(({ id: fieldId }) => fieldId !== id);

    setIdFields([...otherFields, { id, value: e.target.value }].sort((a, b) => a.id - b.id));
  };

  const submit = async () => {
    if (!title.trim() || loading) return;

    const productIds = idFields.map(({ value }) => value).filter((productId) => productId.trim());

    if (!productIds.length) return;

    setLoading(true);

    try {
      const { data } = await axios.put(`${host}/homeGrid`, { title, products: productIds }, {
        headers: {
          auth: localStorage.getItem('token'),
        },
      });

      setError('');
      setTitle('');
      setIdFields([]);
      setIdFields([{ id: 1, value: '' }]);
      console.log(data);
      setHomeGrids([data.homeGrid, ...homeGrids]);
    } catch (e) {
      setError(e.response.data.error);
    }

    setLoading(false);
  };

  const deleteHomeGrid = (id) => async () => {
    if (loading) return;

    setLoading(true);

    await axios.delete(`${host}/homeGrid/${id}`, {
      headers: {
        auth: localStorage.getItem('token'),
      },
    });

    setLoading(false);
    setHomeGrids(homeGrids.filter(({ _id }) => _id !== id));
  };

  return (
    <Fragment>
      <Navigation />
      {loading && <Loader />}
      <div className="addHomeGrid">
        <div className="addHomeGrid-title">Добавить лидера продаж</div>
        <div className="addHomeGrid-form">
          <div className="addHomeGrid-input">
            <label htmlFor="homeGrid-title">Название</label>
            <input id="homeGrid-title" type="text" value={title} onChange={(e) => setTitle(e.target.value)} />
          </div>
          <div className="addHomeGrid-input">
            <label htmlFor="category-name">ID товара</label>
            {idFields.map(({ id }, idx) => (
              <div key={id} className="input-multiple">
                <input id="category-name" type="text" onChange={setIdFieldValue(id)}/>
                {idx === idFields.length - 1 ? (
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
          {error && (
            <div className="addHomeGrid-error">{'' + error}</div>
          )}
          <div className="addHomeGrid-submit" onClick={submit}>Добавить</div>
        </div>
        <div className="addHomeGrid-existing">
          <div className="addHomeGrid-existing-title">Существующие лидеры продаж</div>
          {!homeGrids.length && (
            <div className="addHomeGrid-existing-none">Лидеров продаж нет</div>
          )}
          {homeGrids.map(({ _id, title }) => (
            <div key={_id} className="addHomeGrid-existing-homeGrid">
              <div className="addHomeGrid-existing-name">{title}</div>
              <div className="addHomeGrid-existing-remove" onClick={deleteHomeGrid(_id)}>Удалить</div>
            </div>
          ))}
        </div>
      </div>
    </Fragment>
  );
};

export default AddHomeGrid;
