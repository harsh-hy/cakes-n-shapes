import { useState, useEffect } from 'react';
import Navbar from '../Components/Navbar';
import Footer from '../Components/Footer';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

const CheckoutPage = () => {
  const [cart, setCart] = useState([]);
  const [user, setUser] = useState({ name: '', email: '' });
  const [address, setAddress] = useState('');
  const [location, setLocation] = useState(null);  // To store current location details
  const [isUseCurrentAddress, setIsUseCurrentAddress] = useState(true);
  const navigate = useNavigate();

  const POSITIONSTACK_API_KEY = import.meta.env.VITE_LOCATION_API;

  // Load cart and user data from localStorage when the component mounts
  useEffect(() => {
    const savedCart = JSON.parse(localStorage.getItem('cart')) || [];
    setCart(savedCart);

    const savedUser = JSON.parse(localStorage.getItem('userDetails')) || {};
    setUser({ name: savedUser.firstName, email: savedUser.email });

    // Request for location access
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setLocation({ latitude, longitude });
          fetchAddressFromCoordinates(latitude, longitude); // Fetch address from coordinates
        },
        (error) => {
          console.error("Error getting location:", error);
          toast.error('Unable to fetch location. Please enter an address manually.');
        }
      );
    }
  }, []);

  // Function to fetch human-readable address from latitude and longitude using PositionStack API
  const fetchAddressFromCoordinates = async (latitude, longitude) => {
    try {
      const response = await fetch(
        `http://api.positionstack.com/v1/reverse?access_key=${POSITIONSTACK_API_KEY}&query=${latitude},${longitude}`
      );
      const data = await response.json();
      if (data.data && data.data.length > 0) {
        const addressComponents = data.data[0];
        const area = addressComponents.locality || '';
        const street = addressComponents.street || '';
        const city = addressComponents.region || '';

        setLocation({
          ...location,
          address: `${street}, ${area}, ${city}`,
        });
      } else {
        toast.error('Unable to fetch address from location.');
      }
    } catch (error) {
      console.error("Error in fetching address:", error);
      toast.error('Unable to fetch address from location.');
    }
  };

  // Function to handle address change
  const handleAddressChange = (e) => {
    setAddress(e.target.value);
  };

  // Function to calculate total amount
  const getTotalAmount = () => {
    const total = cart.reduce((total, item) => {
      const itemPrice = parseFloat(item.price.replace('₹', '').replace(',', ''));
      return total + (isNaN(itemPrice) ? 0 : itemPrice);
    }, 0);
    return `₹${total.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
  };

  // Function to handle checkout process
  const handleCheckout = () => {
    if (!address && !isUseCurrentAddress) {
      toast.error('Please provide an address!');
      return;
    }

    const finalAddress = isUseCurrentAddress && location?.address
      ? location.address
      : address;

    if (!finalAddress) {
      toast.error('Address is required!');
      return;
    }

    // Proceed with order, save the order in the backend or call the API
    toast.success('Order placed successfully!');
    navigate('/success'); // Redirect to order success page
  };

  return (
    <>
      <Navbar />
      <h2 className="checkout-header">Checkout</h2>

      <section className="checkout-section">
        <div className="user-details">
          <h3>Customer Details</h3>
          <p><strong>Name:</strong> {user.name}</p>
          <p><strong>Email:</strong> {user.email}</p>
        </div>

        <div className="cart-items">
          <h3>Your Cart</h3>
          {cart.length === 0 ? (
            <div className="empty-cart-message">
              <h3>Your cart is empty!</h3>
              <p>Go back and add some items to your cart!</p>
              <button
                onClick={() => navigate('/menu')}
                className="go-to-menu-button"
              >
                Go to Menu
              </button>
            </div>
          ) : (
            cart.map((item) => (
              <div key={item.id} className="cart-item">
                <span>{item.title}</span>
                <span>{item.price}</span>
              </div>
            ))
          )}
        </div>

        {cart.length > 0 && (
          <>
            <div className="address-section">
              <h3>Shipping Address</h3>
              <div>
                <input
                  type="checkbox"
                  checked={isUseCurrentAddress}
                  onChange={() => setIsUseCurrentAddress(!isUseCurrentAddress)}
                />
                <label>Use current location</label>
              </div>

              {isUseCurrentAddress && location?.address && (
                <div className="current-location">
                  <p>Using current location: </p>
                  <p>{location.address}</p>
                </div>
              )}

              {isUseCurrentAddress && !location?.address && (
                <p>Unable to fetch location, please add an address manually.</p>
              )}

              {!isUseCurrentAddress && (
                <div>
                  <textarea
                    placeholder="Enter your address"
                    value={address}
                    onChange={handleAddressChange}
                    rows="4"
                    cols="50"
                  />
                </div>
              )}
            </div>

            <div className="order-summary">
              <h3>Order Summary</h3>
              <p>Total Items: {cart.length}</p>
              <p>Total Amount: {getTotalAmount()}</p>
            </div>

            <div className="checkout-actions">
              <button
                onClick={handleCheckout}
                className="checkout-button"
              >
                Place Order
              </button>
            </div>
          </>
        )}
      </section>

      <Footer />
    </>
  );
};

export default CheckoutPage;
