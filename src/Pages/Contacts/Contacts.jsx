import { Base } from '..';
import { Breadcrumbs } from '../../Components';
import './contacts.css';

const Contacts = () => {
  return (
    <Base>
      <div className="contacts">
       <div className="contacts-title">Контакты</div>
        <Breadcrumbs items={[
          {
            title: 'Главная',
            link: '/',
          },
          {
            title: 'Контакты',
          }
        ]} />
      </div>
    </Base>
  );
};

export default Contacts;
