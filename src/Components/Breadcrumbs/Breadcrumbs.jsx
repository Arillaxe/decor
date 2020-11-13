import { Fragment } from 'react';
import { Link } from 'react-router-dom';
import './breadcrumbs.css';

const Breadcrumbs = (props) => {
  const { items } = props;

  return (
    <div className="breadcrumbs">
    {items.map((item) => (
      <Fragment key={item.link + item.title}>
        { item.link ? (
          <Link to={item.link}>
            <div className="breadcrumb">{item.title}</div>
          </Link>
        ) : (
          <div className="breadcrumb">{item.title}</div>
        )}
      </Fragment>
    ))}
    </div>
  );
};

export default Breadcrumbs;
