import { useState, useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { GiHamburgerMenu } from "react-icons/gi";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { FaUserAlt } from "react-icons/fa";

const Navbar = () => {
  const [show, setShow] = useState(false); 
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setIsLoggedIn(true);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsLoggedIn(false);
    navigate("/"); // Redirect to homepage after logout
  };

  return (
    <nav role="navigation">
      <div className="logo">
        <NavLink to="/">
          <img src="/full_logo-removebg-preview.png" alt="Logo" />
        </NavLink>
      </div>
      <div className={`navLinks ${show ? "showmenu" : ""}`}>
        <div className="links">
          <NavLink to="/">HOME</NavLink>
          <NavLink to="/menu">MENU</NavLink>
          <NavLink to="/reservation">RESERVATION</NavLink>
          {isLoggedIn ? (
            <button className="menuBtn" onClick={handleLogout}>
              <FaUserAlt /> Logout
            </button>
          ) : (
            <NavLink to="/login">
              <button className="menuBtn">
                <FaUserAlt /> Login
              </button>
            </NavLink>
          )}
          <NavLink to="/cart">
            <button className="menuBtn">
              <AiOutlineShoppingCart /> Cart
            </button>
          </NavLink>
        </div>
      </div>
      <div 
        className="hamburger" 
        onClick={() => setShow(!show)} 
        aria-label="Toggle menu" 
        aria-expanded={show} // Accessibility improvement
      >
        <GiHamburgerMenu />
      </div>
    </nav>
  );
};

export default Navbar;