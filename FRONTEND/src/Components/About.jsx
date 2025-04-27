import { useState } from 'react';
import { Link } from 'react-router-dom';
import { HiOutlineArrowNarrowRight } from 'react-icons/hi';
import $ from 'jquery'; 

const About = () => {
  const [expanded, setExpanded] = useState(false);

  const toggleContent = () => {
    $('.additional-content').slideToggle();
    setExpanded(!expanded);
  };

  return (
    <section className='about' id='about'>
      <div className="container">
        <div className="banner">
          <img src="/full_logo-removebg-preview.jpg" alt="about" />
        </div>
        <div className="banner">
          <div className="top">
            <h1 className='heading'>About Dwija Bake Studio</h1>
            <p>Welcome to Dwija Bake Studio, where every pastry and dessert is crafted with love and passion. Our journey started with a simple mission: to bring the finest baked goods to your table, combining classic recipes with modern flair.</p>
          </div>

          <div className="top additional-content" style={{ display: expanded ? 'block' : 'none' }}>
            <h1 className='heading'>Our Story</h1>
            <p>Dwija Bake Studio was founded by two pastry enthusiasts who wanted to bring their dream of a cozy bakery to life. With a focus on quality ingredients and timeless techniques, we create indulgent treats that bring joy to every occasion.</p>

            <h1 className='heading'>Our Values</h1>
            <p>Freshness, Quality, Creativity, Community</p>

            <h2 className='heading'>Our Mission</h2>
            <p>At Dwija Bake Studio, our mission is to offer an unforgettable bakery experience with freshly baked cakes, cookies, pastries, and more. We believe that every bite should feel like a warm hug, filled with love and made from the finest ingredients.</p>
          </div>

          <Link to={"/"} onClick={toggleContent}>{expanded ? 'Show Less' : 'Show More'} <span>
            <HiOutlineArrowNarrowRight/>
          </span></Link>
        </div>
      </div>
    </section>
  );
}

export default About;
