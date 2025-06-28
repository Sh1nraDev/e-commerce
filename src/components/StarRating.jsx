import React, { useState } from 'react';
import './styleCart.css';

const StarRating = ({ ratings, onRate }) => {
  // ratings: Array (1-5)⭐
  const [hovered, setHovered] = useState(0);
  const average = ratings.length ? (ratings.reduce((a, b) => a + b, 0) / ratings.length) : 0;
  const rounded = Math.round(average * 10) / 10;

  return (
    <div className="star-rating-container">
      <div className="stars">
        {[1, 2, 3, 4, 5].map((star) => (
          <span
            key={star}
            className={`star ${hovered >= star ? 'hovered' : ''} ${average >= star ? 'selected' : ''}`}
            onMouseEnter={() => setHovered(star)}
            onMouseLeave={() => setHovered(0)}
            onClick={() => onRate(star)}
            role="button"
            tabIndex={0}
            aria-label={`Calificar con ${star} estrellas`}
          >
            ★
          </span>
        ))}
      </div>
      <div className="rating-info">
        <span className="average">{rounded > 0 ? rounded : '-'}</span>
        <span className="votes">({ratings.length})</span>
      </div>
    </div>
  );
};

export default StarRating;
