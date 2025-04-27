// CuisineMenu.jsx

import { useParams } from 'react-router-dom';
import menuData from "../newRestApi.json"; // Import the JSON data


const CuisineMenu = () => {
  const { cuisine } = useParams(); // Get the cuisine parameter from the URL
  const { starters, main_course, desserts } = menuData[cuisine]; // Get menu items for the selected cuisine

  return (
    <section className="cuisine-menu">
      <h1>{cuisine.toUpperCase()} MENU</h1>

      {/* Starters */}
      <div className="menu-category">
        <h2>Starters</h2>
        <ul className="menu-items">
          {starters.map(item => (
            <li key={item.id}>
              <span className="item-title">{item.title}</span>
              <span className="item-price">Price: {item.price} INR</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Main Course */}
      <div className="menu-category">
        <h2>Main Course</h2>
        <ul className="menu-items">
          {main_course.map(item => (
            <li key={item.id}>
              <span className="item-title">{item.title}</span>
              <span className="item-price">Price: {item.price} INR</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Desserts */}
      <div className="menu-category">
        <h2>Desserts</h2>
        <ul className="menu-items">
          {desserts.map(item => (
            <li key={item.id}>
              <span className="item-title">{item.title}</span>
              <span className="item-price">Price: {item.price} INR</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};

export default CuisineMenu;
