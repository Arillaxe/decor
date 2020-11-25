import { useEffect, useState, useRef, Fragment } from 'react';
import axios from 'axios';
import config from '../../../../config';
import { UploadImage, Navigation } from '..';
import { Loader } from '../../../../Components';
import './gallery.css';

const { host } = config;

const Gallery = () => {
  const [files, setFiles] = useState([]);
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(false);
  const imageRef = useRef();

  useEffect(() => {
    const fetchData = async () => {
      const { data } = await axios.get(`${host}/gallery`);

      setImages(data.galleries);
    };

    fetchData();
  }, []);

  const submitImage = async () => {
    if (loading || !files.length) return;

    setLoading(true);

    const formData = new FormData();

    Array.from(files).forEach((file, idx) => formData.append(`image${idx}`, file));

    try {
      const { data } = await axios.put(`${host}/gallery`, formData, {
        headers: {
          auth: localStorage.getItem('token'),
        },
      });

      setImages([...data.galleries]);
      imageRef.current.clear();
    } catch (e) {
      console.log(e);
    }

    setLoading(false);
  };

  const deleteImage = (id) => async () => {
    if (loading) return;

    setLoading(true);

    try {
      await axios.delete(`${host}/gallery/${id}`, {
        headers: {
          auth: localStorage.getItem('token'),
        },
      });

      setImages([...images.filter((image) => image._id !== id)]);
    } catch (e) {
      console.log(e);
    }

    setLoading(false);
  };

  const deleteAll = async () => {
    if (loading) return;

    setLoading(true);

    try {
      await axios.delete(`${host}/gallery/all`, {
        headers: {
          auth: localStorage.getItem('token'),
        },
      });

      setImages([]);
    } catch (e) {
      console.log(e);
    }

    setLoading(false);
  };

  return (
    <Fragment>
      <Navigation />
      {loading && <Loader />}
      <div className="adminGallery">
        <div className="adminGallery-title">Добавить изображение</div>
        <UploadImage multiple ref={imageRef} id="gallery-upload" label="Выберите изображение" onChange={(value) => setFiles(value)} />
        <div className="adminGallery-button" onClick={submitImage}>Загрузить</div>
        <div className="adminGallery-title">Загруженные изображения</div>
        {!!images.length && (
          <div className="adminGallery-button-delete" onClick={deleteAll}>Удалить все</div>
        )}
        <div className="adminGallery-existing">
          {!images.length && (
            <div className="adminGallery-existing-none">Изображений нет</div>
          )}
          {images.map(({ _id, image }) => (
            <div key={_id} className="imageCropper" onClick={deleteImage(_id)}>
              <img src={image} alt=""/>
            </div>
          ))}
        </div>
      </div>
    </Fragment>
  );
};

export default Gallery;
