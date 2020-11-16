import { Base } from '..';
import { Breadcrumbs } from '../../Components';
import './about.css';

const About = () => {
  return (
    <Base>
     <div className="about">
       <div className="about-title">О компании</div>
        <Breadcrumbs items={[
          {
            title: 'Главная',
            link: '/',
          },
          {
            title: 'О компании',
          }
        ]} />
      </div>
    </Base>
  );
};

export default About;
