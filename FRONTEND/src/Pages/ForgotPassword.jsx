import { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // If you're using React Router
import toast from 'react-hot-toast'; // Import toast

const ForgotPasswordPage = () => {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate(); // For navigation after success

  // Handle email change
  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  // Form submission handler
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Simple email validation
    if (!email || !/\S+@\S+\.\S+/.test(email)) {
      setError('Please enter a valid email address');
      toast.error('Please enter a valid email address'); // Show toast error message
      return;
    }

    // If the email is valid, make a request to the backend
    setError('');
    
    try {
      const response = await fetch('https://bakery-backend-production-e2c9.up.railway.app/api/v1/auth/forgot', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }), // Send the email in the request body
      });

      const data = await response.json();

      if (response.ok) {
        toast.success('A password reset link has been sent to your email!');
        setTimeout(() => {
          navigate('/login'); // Navigate to login after a few seconds
        }, 3000);
      } else {
        toast.error(data.message || 'Something went wrong');
      }
    } catch (error) {
      toast.error('An error occurred while sending the password reset link');
    }
  };

  return (
    <div className="forgot-password-container">
      <h2>Forgot Password</h2>
      <form onSubmit={handleSubmit} className="forgot-password-form">
        <div className="input-group">
          <label htmlFor="email">Enter your email address</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={handleEmailChange}
            placeholder="example@domain.com"
            required
          />
        </div>
        {error && <p className="error">{error}</p>}
        <button type="submit" className="submit-btn">Submit</button>
      </form>
      <div className="back-to-login">
        <p>Remembered your password? <a href="/login">Go back to login</a></p>
      </div>
    </div>
  );
};

export default ForgotPasswordPage;
