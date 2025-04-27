import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import Home from "./Pages/Home";
import Sucess from "./Pages/Sucess";
import NotFound from "./Pages/NotFound";
import Reservation from "./Pages/Reservation";
import LoginForm from "./Pages/loginForm";
import SignupForm from "./Pages/SignupForm";
import Menu from "./Pages/Menu";
import Cart from "./Pages/Cart";
import ForgotPasswordPage from "./Pages/ForgotPassword";
import CheckoutPage from "./Pages/Checkout";
import ScrollToTop from 'react-scroll-to-top';
import { FaArrowUp } from 'react-icons/fa';
import ReviewPage from "./Pages/ReviewPage";
import ResetPassword from "./Pages/ResetPassword";
const App = () => {
  return (
    <div className="App">
      <Router>
        <ScrollToTop 
          smooth
          color="#f8f9fa" 
          style={{ backgroundColor: 'red', borderRadius: '50%' }}
          component={<FaArrowUp />} 
        />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/success" element={<Sucess />} />
          <Route path="*" element={<NotFound />} />
          <Route path="/reservation" element={<Reservation />} />
          <Route path="/signup" element={<SignupForm />} />
          <Route path="/login" element={<LoginForm />} />
          <Route path="/menu" element={<Menu />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/review" element={<ReviewPage />} />
          <Route path="/forgot" element={<ForgotPasswordPage />} />
          <Route path="/checkout" element={<CheckoutPage />} />
          <Route path="/reset-password/:token" element={<ResetPassword />} />
        </Routes>
        <Toaster />
      </Router>
    </div>
  );
};

export default App;
