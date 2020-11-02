import ImageGallery from 'react-image-gallery';
import './slider.css';

const Slider = () => {
  const images = [
    {
      original: 'https://decoproduct.ru/uploads/slider/image/19/E-08.jpg',
    },
    {
      original: 'https://decoproduct.ru/uploads/slider/image/20/M-46.jpg',
    },
    {
      original: 'https://decoproduct.ru/uploads/slider/image/18/B-45_.jpg',
    },
  ];

  return (
    <div className="slider">
      <ImageGallery
        items={images}
        showThumbnails={false}
        showFullscreenButton={false}
        showPlayButton={false}
        showBullets={true}
        autoPlay={true}
        slideInterval={5000}
        additionalClass="slider-wrapper"
      />
    </div>
  );
};

export default Slider;
