import { useState, useEffect } from 'react';
import menuData from '../newRestApi.json';
import Navbar from '../Components/Navbar';
import Footer from '../Components/Footer';
import toast, { Toaster } from 'react-hot-toast';
import { AiOutlineShoppingCart } from 'react-icons/ai'; // Cart Icon

const Menu = () => {
  const [cart, setCart] = useState([]);

  useEffect(() => {
    const savedCart = JSON.parse(localStorage.getItem('cart')) || [];
    setCart(savedCart);
  }, []);

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);

  const handleAddToCart = (item) => {
    const itemExists = cart.some((cartItem) => cartItem.id === item.id);

    if (!itemExists) {
      setCart((prevCart) => [...prevCart, { ...item, quantity: 1 }]);
      toast.success(`${item.title} has been added to the cart!`);
    } else {
      toast.error(`${item.title} is already in the cart!`);
    }
  };

  return (
    <>
      <Navbar />
      <section className="menu-section">
        {Object.keys(menuData.bakery).map((category) => (
          <div key={category} className="menu-category">
            <h2 className="category-heading">
  {menuData.categoryDetails[category]?.name
    ? menuData.categoryDetails[category].name.toUpperCase()
    : category.toUpperCase()}
</h2>

            <p className="category-description">
              {menuData.categoryDetails[category]?.description || ''}
            </p>
            <div className="menu-items">
              {menuData.bakery[category].map((item) => (
                <div key={item.id} className="menu-item-card">
                  <img src={item.image} alt={item.title} className="item-image" />
                  <h3 className="item-title">{item.title}</h3>
                  <p className="item-description">{item.description}</p>
                  <p className="item-price">{item.price}</p>
                  <div className="item-actions">
                    <button
                      className="add-to-cart-button"
                      onClick={() => handleAddToCart(item)}
                    >
                      <AiOutlineShoppingCart /> Add to Cart
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </section>
      <Footer />
      <Toaster />
    </>
  );
};

export default Menu;
