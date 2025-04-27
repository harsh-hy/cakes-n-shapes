import React,{ useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';

const ResetPassword = () => {
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);  // To handle loading state
  const { token } = useParams();  // Get the token from the URL
  const navigate = useNavigate();

  useEffect(() => {
    // Verify token validity when the component mounts
    const verifyToken = async () => {
      try {
        const response = await axios.post('https://bakery-backend-production-e2c9.up.railway.app/api/v1/auth/verify-token', { token });
        if (response.status !== 200) {
          setError('Invalid or expired token.');
        }
      } catch (error) {
        setError('Invalid or expired token.');
      }
    };

    if (token) {
      verifyToken();
    } else {
      setError('Invalid token.');
    }
  }, [token]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate passwords
    if (newPassword !== confirmPassword) {
      setError('Passwords do not match.');
      return;
    }

    // Simple password strength validation (optional)
    if (newPassword.length < 6) {
      setError('Password must be at least 6 characters long.');
      return;
    }

    setLoading(true);
    try {
      // Make a POST request to reset the password
      const response = await axios.post('https://bakery-backend-production-e2c9.up.railway.app/api/v1/auth/reset-password', { token, newPassword });
      setSuccess('Your password has been reset successfully.');
      setError('');
      // Redirect to the login page after success
      setTimeout(() => {
        navigate('/login');
      }, 3000);
    } catch (err) {
      setError('Error resetting password, please try again.');
      setSuccess('');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="reset-password-container">
      <h2>Reset Password</h2>
      {error && <p className="error-message">{error}</p>}
      {success && <p className="success-message">{success}</p>}
      <form onSubmit={handleSubmit} className="reset-password-form">
        <div className="form-group">
          <label htmlFor="new-password">New Password</label>
          <input
            type="password"
            id="new-password"
            value={newPassword}
            onChange={(e) => {
              setNewPassword(e.target.value);
              setError('');  // Clear error when typing
            }}
            required
            placeholder="Enter new password"
          />
        </div>
        <div className="form-group">
          <label htmlFor="confirm-password">Confirm Password</label>
          <input
            type="password"
            id="confirm-password"
            value={confirmPassword}
            onChange={(e) => {
              setConfirmPassword(e.target.value);
              setError('');  // Clear error when typing
            }}
            required
            placeholder="Confirm new password"
          />
        </div>
        <button type="submit" className="submit-button" disabled={loading}>
          {loading ? 'Resetting...' : 'Reset Password'}
        </button>
      </form>
    </div>
  );
};

export default ResetPassword