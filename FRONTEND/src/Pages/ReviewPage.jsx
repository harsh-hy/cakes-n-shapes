import { useState, useEffect } from 'react';
import axios from 'axios';
import Navbar from '../Components/Navbar';
import Footer from '../Components/Footer';

const ReviewPage = () => {
  const [reviews, setReviews] = useState([]);
  const [name, setName] = useState('');
  const [content, setContent] = useState('');
  const [rating, setRating] = useState(0);
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    axios.get("https://bakery-backend-production-e2c9.up.railway.app/api/v1/reviews")
      .then(response => {
        setReviews(response.data);
      })
      .catch(error => {
        console.error('Error fetching reviews:', error);
      });
  }, []);

  // Handle form submission to add a new review
  const handleAddReview = (e) => {
    e.preventDefault();
    if (name && content && rating) {
      // Retrieve user details from localStorage
      const userDetails = JSON.parse(localStorage.getItem("userDetails"));

      // Make sure userDetails exists and contains email
      if (userDetails && userDetails.email) {
        const newReview = {
          name,
          content,
          rating,
          email: userDetails.email, 
        };
        console.log(newReview.email);

        axios.post("https://bakery-backend-production-e2c9.up.railway.app/api/v1/reviews", newReview)
          .then(response => {
            setReviews([...reviews, response.data.review]); // Add the new review to the state
            setName('');
            setContent('');
            setRating(0);
            setSuccessMessage('Thank you for your review! A confirmation email has been sent to you.');
            setErrorMessage(''); 
          })
          .catch(error => {
            console.error('Error adding review:', error);
            setErrorMessage('Failed to submit review. Please try again later.');
            setSuccessMessage(''); // Clear any success messages
          });
      } else {
        setErrorMessage('User details not found. Please log in again.');
        setSuccessMessage('');
      }
    }
  };

  const handleStarClick = (starValue) => {
    setRating(starValue);
  };

  return (
    <>
      <Navbar />
      <div className="review-page">
        <h1>Review Page</h1>
        <form onSubmit={handleAddReview} className="review-form">
          <div className="form-group">
            <label htmlFor="name">Name:</label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="input-field"
            />
          </div>
          <div className="form-group">
            <label htmlFor="content">Review:</label>
            <textarea
              id="content"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              required
              className="textarea-field"
            />
          </div>
          <div className="form-group">
            <label>Rating:</label>
            <div className="star-rating">
              {[1, 2, 3, 4, 5].map((star) => (
                <span
                  key={star}
                  className={`star-icon ${star <= rating ? 'selected' : ''}`}
                  onClick={() => handleStarClick(star)}
                >
                  ⭐
                </span>
              ))}
            </div>
          </div>
          <button type="submit" className="submit-button">Add Review</button>
        </form>

        {successMessage && <div className="success-message">{successMessage}</div>}
        {errorMessage && <div className="error-message">{errorMessage}</div>}

        <h2>Existing Reviews</h2>
        <ul className="review-list">
          {reviews.map((review) => (
            <li key={review._id} className="review-item">
              <strong>{review.name}</strong>: {review.content} <br />
              <span className="review-rating">Rating: {'⭐'.repeat(review.rating)}</span>
            </li>
          ))}
        </ul>
      </div>
      <Footer />
    </>
  );
};

export default ReviewPage