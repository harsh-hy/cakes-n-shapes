import React, { useState } from 'react';

const Reviews = () => {
  const [reviews, setReviews] = useState([]);
  const [newReview, setNewReview] = useState({ rating: '', comment: '' });
  
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewReview((prevReview) => ({ ...prevReview, [name]: value }));
  };

  const handleReviewSubmit = (e) => {
    e.preventDefault();
    setReviews((prevReviews) => [...prevReviews, newReview]);
    setNewReview({ rating: '', comment: '' });
  };

  const averageRating = () => {
    const totalRating = reviews.reduce((sum, review) => sum + parseInt(review.rating), 0);
    return reviews.length ? (totalRating / reviews.length).toFixed(1) : 'No ratings yet';
  };

  return (
    <div>
      <h2>Customer Reviews</h2>
      <p>Average Rating: {averageRating()}</p>
      <form onSubmit={handleReviewSubmit}>
        <label>
          Rating (1-5): 
          <input 
            type="number" 
            name="rating" 
            min="1" 
            max="5" 
            value={newReview.rating} 
            onChange={handleInputChange} 
            required 
          />
        </label>
        <label>
          Comment:
          <textarea 
            name="comment" 
            value={newReview.comment} 
            onChange={handleInputChange} 
            required 
          />
        </label>
        <button type="submit">Submit Review</button>
      </form>
      
      <div>
        <h3>All Reviews</h3>
        {reviews.map((review, index) => (
          <div key={index}>
            <p>Rating: {review.rating}</p>
            <p>Comment: {review.comment}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Reviews;
