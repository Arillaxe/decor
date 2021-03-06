import { useState, useEffect } from 'react';
import Viewer from 'react-viewer';
import axios from 'axios';
import config from '../../config';
import { Base } from '..';
import { Breadcrumbs } from '../../Components';
import './gallery.css';

const { host } = config;

const Gallery = () => {
  const [images, setImages] = useState([]);
  const [visible, setVisible] = useState(false);
  const [imageIndex, setImageIndex] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      const { data } = await axios.get(`${host}/gallery`);

      setImages(data.galleries);
    };

    fetchData();
  }, []);

  useEffect(() => {
    document.title = 'Галерея | Гипсовые панели 3д купить в Симферополе для внутренней отделки';
  }, []);

  const openImage = (index = 0) => {
    setImageIndex(index);
    setVisible(true);
  }

  return (
    <Base>
     <div className="gallery">
       <h1 className="gallery-title">Галерея</h1>
        <Breadcrumbs items={[
          {
            title: 'Главная',
            link: '/',
          },
          {
            title: 'Галерея',
          }
        ]} />
        <div className="gallery-existing">
          {!images.length && (
            <div className="gallery-existing-none">Изображений нет</div>
          )}
          {images.map(({ _id, image }, idx) => (
            <div key={_id} className="imageCropper" onClick={() => openImage(idx)}>
              <img src={image} alt=""/>
            </div>
          ))}
           <Viewer
              visible={visible}
              onClose={() => { setVisible(false); } }
              images={images.map(({ image }) => ({ src: image, alt: '' }))}
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
    </Base>
  );
};

export default Gallery;
