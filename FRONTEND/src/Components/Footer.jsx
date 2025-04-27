import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn } from 'react-icons/fa'; 
import { useNavigate } from 'react-router-dom'; // Import useNavigate

const Footer = () => {
    const navigate = useNavigate(); // Initialize useNavigate

    // Function to handle logo click and navigate to the home page
    const handleLogoClick = () => {
        navigate('/'); // Navigate to the home page
    };

    return (
        <footer>
            <section className="footer-container">
                <div className='company-info'>
                </div>
            </section>

            <hr className="footer-line" />

            <div className="review-link">
                <p onClick={() => navigate('/review')} className="review-text">
                    <a href="/review" rel="noopener noreferrer">Write a Review</a>
                </p>
                <img 
                        src="/full_logo-removebg-preview.png" 
                        alt='Company Logo' 
                        className="footer-logo" 
                        onClick={handleLogoClick} 
                    />
            </div>

            <div className="social-media">
                <h3>Follow Us</h3>
                <div className="social-icons">
                    <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer">
                        <FaFacebookF />
                    </a>
                    <a href="https://www.twitter.com" target="_blank" rel="noopener noreferrer">
                        <FaTwitter />
                    </a>
                    <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer">
                        <FaInstagram />
                    </a>
                    <a href="https://www.linkedin.com" target="_blank" rel="noopener noreferrer">
                        <FaLinkedinIn />
                    </a>
                </div>
            </div>

            <div className="end-text">
                <p>&copy; 2024 Dwija Bake Studio. All Rights Reserved.</p>
            </div>
        </footer>
    );
};

export default Footer;
