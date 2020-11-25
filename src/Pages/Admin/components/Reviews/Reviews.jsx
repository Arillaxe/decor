import { useState, useEffect, Fragment } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import axios from 'axios';
import config from '../../../../config';
import { Navigation } from '..';
import './reviews.css';

const { host } = config;

const Reviews = () => {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      const { data } = await axios.get(`${host}/review/moderate`, {
        headers: {
          auth: localStorage.getItem('token'),
        },
      });

      setReviews(data.reviews);
    };

    fetchData();
  }, []);

  const approveReview = (id) => async () => {
    if (loading) return;

    setLoading(true);

    try {
      await axios.post(`${host}/review/verify/${id}`, {}, {
        headers: {
          auth: localStorage.getItem('token'),
        },
      });

      setReviews(reviews.filter((review) => review._id !== id));
    } catch (e) {
      console.log(e);
    }

    setLoading(false);
  };

  const deleteReview = (id) => async () => {
    if (loading) return;

    setLoading(true);

    try {
       await axios.delete(`${host}/review/${id}`, {
        headers: {
          auth: localStorage.getItem('token'),
        },
      });

      setReviews(reviews.filter((review) => review._id !== id));
    } catch (e) {
      console.log(e);
    }

    setLoading(false);
  };

  return (
    <Fragment>
      <Navigation />
      <div className="adminReviews">
        <div className="adminReviews-title">Отзывы</div>
        {!reviews.length && (
          <div className="adminReviews-none">Комментариев для модерации нет</div>
        )}
        {reviews.map((review) => (
          <div key={review._id} className="adminReviews-review">
            <div className="adminReviews-review-product">
              <Link target="_blank" to={`/product/${review.product.category}/${review.product._id}`}>
                {review.product.title}
              </Link>
            </div>
            <div className="adminReviews-review-author">{review.author}</div>
            <div className="adminReviews-review-body">{review.body}</div>
            <div className="adminReviews-controls">
              <div className="adminReviews-review-approve" onClick={approveReview(review._id)}>
                <FontAwesomeIcon icon="check" />
              </div>
              <div className="adminReviews-review-delete" onClick={deleteReview(review._id)}>
                <FontAwesomeIcon icon="times" />
              </div>
            </div>
          </div>
        ))}
      </div>
    </Fragment>
  );
};

export default Reviews;
