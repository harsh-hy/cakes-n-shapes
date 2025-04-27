import  { useState } from 'react';
import axios from 'axios';
import { HiOutlineArrowNarrowRight } from 'react-icons/hi';
import toast from 'react-hot-toast';
import { Link, useNavigate } from 'react-router-dom';
import Footer from '../Components/Footer'
;
const SignupForm = () => {
    const [first, setFirstName] = useState('');
    const [last, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isSignIn] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (e) => { 
        e.preventDefault();
        try {
            const { data } = await axios.post(
                "https://bakery-backend-production-e2c9.up.railway.app/api/v1/signup/send",
                { first, last, email, password },
                {
                    
                headers: {
                    "Content-Type": "application/json",
                },
                withCredentials: true,
            }
            );
            toast.success(data.message,{
                style:{
                    zIndex:9999,
                }
            });
            setFirstName("");
            setEmail("");
            setLastName("");
            setPassword("");
            navigate("/login");
        } catch (error) {
            toast.error(error.response.data.message,{
                style:{
                    zIndex:9999,
                    
                }
            });
        }
    };

    return (
        <div className="login-container">
        <section className="login" id="login">
            <div className={`container ${isSignIn ? '' : 'active'}`} id="container">
                <div className={`form-container ${isSignIn ? 'sign-in' : 'sign-up'}`}>

                        <form onSubmit={handleSubmit}>
                            <h1>Create Account</h1>
                            <input type="text" placeholder="First Name" value={first} onChange={(e) => setFirstName(e.target.value)} />
                            <input type="text" placeholder="Last Name" value={last} onChange={(e) => setLastName(e.target.value)} />
                            <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
                            <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
                            <button type="submit">
                                Sign Up{' '}
                                <span>
                                    <HiOutlineArrowNarrowRight />
                                </span>
                            </button>
                        </form>
                </div>
                <div className="toggle-container">
                    <div className="toggle">
                    <div className={`toggle-panel toggle-left ${isSignIn ? 'hidden' : ''}`}>
                                <h1>Welcome Back!</h1>
                                <p>Enter your details</p>
                                <Link to="/login">
                                    <button>Sign In</button>
                                </Link>
                            </div>
                    </div>
                </div>
            </div>
        </section>
        <Footer/>
        </div>
    );
};

export default SignupForm;
