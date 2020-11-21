import ImageGallery from 'react-image-gallery';
import config from '../../config';
import './slider.css';

const { host } = config;

const Slider = () => {
  const images = Array(5).fill(0).map((_, idx) => ({ original: `${host}/images/slides/${idx + 1}.jpg` }));

  return (
    <div className="slider">
      <ImageGallery
        items={images}
        showThumbnails={false}
        showFullscreenButton={false}
        showPlayButton={false}
        showBullets={true}
        // autoPlay={true}
        slideInterval={5000}
        additionalClass="slider-wrapper"
      />
    </div>
  );
};

export default Slider;
