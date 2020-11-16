import { Base } from '..';
import { Breadcrumbs } from '../../Components';
import './gallery.css';

const Gallery = () => {
  return (
    <Base>
     <div className="gallery">
       <div className="gallery-title">Галерея</div>
        <Breadcrumbs items={[
          {
            title: 'Главная',
            link: '/',
          },
          {
            title: 'Галерея',
          }
        ]} />
      </div>
    </Base>
  );
};

export default Gallery;
