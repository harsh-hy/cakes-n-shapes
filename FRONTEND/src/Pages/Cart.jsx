import { useState, useEffect } from 'react';
import Navbar from '../Components/Navbar';
import Footer from '../Components/Footer';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { FaTrashAlt } from 'react-icons/fa'; // Import the trash icon for remove

const Cart = () => {
  const [cart, setCart] = useState([]);
  const navigate = useNavigate();

  // Load cart from localStorage when the component mounts
  useEffect(() => {
    const savedCart = JSON.parse(localStorage.getItem('cart')) || [];
    setCart(savedCart);
  }, []);

  // Function to remove item from cart
  const handleRemoveFromCart = (itemId) => {
    const updatedCart = cart.filter(item => item.id !== itemId);
    setCart(updatedCart);
    localStorage.setItem('cart', JSON.stringify(updatedCart)); // Save updated cart to localStorage
    toast.success('Item removed from cart');
  };

  // Function to empty the cart
  const handleEmptyCart = () => {
    setCart([]);
    localStorage.removeItem('cart'); // Remove all items from localStorage
    toast.success('Your cart is now empty');
  };

  // Function to proceed to checkout
  const handleProceedToCheckout = () => {
    const isLoggedIn = !!localStorage.getItem('token'); // Check if the user is logged in

    if (!isLoggedIn) {
      toast.error('Please login first!');
      navigate('/login'); // Redirect to login page
    } else if (cart.length === 0) {
      toast.error('Your cart is empty, please add items first!');
    } else {
      navigate('/checkout'); // Proceed to checkout
    }
  };

  // Function to calculate total amount
  const getTotalAmount = () => {
    const total = cart.reduce((total, item) => total + parseFloat(item.price.replace('₹', '').replace(',', '')), 0);
    return `₹${total.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
  };

  return (
    <>
      <Navbar />
      <h2 style={{
        textAlign: "center",
        fontSize: '2.5rem',
        fontWeight: 'bold',
        color: '#333',
        textTransform: 'uppercase',
        marginBottom: '20px'
      }}>Your Cart</h2>
      <section className="cart-section">
        {cart.length === 0 ? (
          <div className="empty-cart-message">
            <h3>Your cart is looking a little empty...</h3>
            <p>Don't worry, we have plenty of delicious items for you to choose from!</p>
            <button
              onClick={() => navigate('/menu')}
              className="go-to-menu-button"
            >
              Go to Menu
            </button>
          </div>
        ) : (
          <div className="cart-items">
            {cart.map((item) => (
              <div key={item.id} className="cart-item">
                <span>{item.title}</span>
                <span>{item.price}</span>
                <button
                  onClick={() => handleRemoveFromCart(item.id)}
                  className="remove-item-button"
                >
                  <FaTrashAlt />
                </button>
              </div>
            ))}
          </div>
        )}
        {cart.length > 0 && (
          <div className="cart-footer">
            <div className="total-amount">
              <span>Total: {getTotalAmount()}</span>
            </div>
            <div className="cart-actions">
              <button onClick={handleProceedToCheckout} className="checkout-button">
                Proceed to Checkout
              </button>
              <button onClick={handleEmptyCart} className="empty-cart-button">
                <FaTrashAlt />
                Empty Cart
              </button>
            </div>
          </div>
        )}
      </section>
      <Footer />
    </>
  );
};

export default Cart;
