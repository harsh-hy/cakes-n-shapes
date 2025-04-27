import { useState } from 'react';
import axios from 'axios';
import { HiOutlineArrowNarrowRight } from 'react-icons/hi';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import toast from 'react-hot-toast';
import { Link, useNavigate } from 'react-router-dom';
import Footer from '../Components/Footer';

const LoginForm = () => {
    const [isSignIn] = useState(true);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false); // State for password visibility
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post(
                "https://bakery-backend-production-e2c9.up.railway.app/api/v1/login/send",
                { email, password },
                { withCredentials: true }
            );

            // Destructure the token and user details from the response
            const { token, userDetails } = response.data;

            // Save the token and userDetails to localStorage
            localStorage.setItem("token", token);
            localStorage.setItem("userDetails", JSON.stringify(userDetails));

            // Show a success toast
            toast.success("Login Successful!", {
                style: {
                    zIndex: 9999,
                },
            });

            // Redirect the user to the homepage after login
            navigate("/");

        } catch (error) {
            // Show an error toast if there's an error
            toast.error(error.response?.data?.message || "Login failed, please try again.");
        }
    };

    return (
        <>
            <div className="login-container">
                <section className='login' id='login'>
                    <div className={`container ${isSignIn ? '' : 'active'}`} id="container">
                        <div className={`form-container ${isSignIn ? 'sign-in' : 'sign-up'}`}>
                            <form onSubmit={handleSubmit}>
                                <h1>Sign In</h1>
                                <div className="password-container">
                                    <input
                                        type="email"
                                        className='input'
                                        placeholder='Email'
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                    />
                                    <input
                                        type={showPassword ? "text" : "password"}
                                        placeholder="Password"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                    />
                                    <button
                                        type="button"
                                        className="show-password-button"
                                        onClick={() => setShowPassword(!showPassword)}
                                    >
                                        {showPassword ? <FaEyeSlash /> : <FaEye />}
                                    </button>
                                </div>
                                <div className="forgot-password">
                                    <Link to="/forgot" className="forgot-password-link">
                                        Forgot your Password?
                                    </Link>
                                </div>
                                <button type="submit">
                                    Sign In{' '}
                                    <span>
                                        <HiOutlineArrowNarrowRight />
                                    </span>
                                </button>
                            </form>
                        </div>
                        <div className="toggle-container">
                            <div className="toggle">
                                <div className={`toggle-panel toggle-right ${isSignIn ? '' : 'hidden'}`}>
                                    <h1>Hello There!</h1>
                                    <p>Register Now to enjoy delicious food....</p>
                                    <Link to="/signup">
                                        <button>Sign Up</button>
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
            <Footer />
        </>
    );
};

export default LoginForm;
