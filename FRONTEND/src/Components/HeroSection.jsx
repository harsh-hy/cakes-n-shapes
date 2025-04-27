import { useState, useEffect } from 'react';
import Navbar from './Navbar';

const placeholderImage = "/banner.jpg";

const HeroSection = () => {
    const [currentImageIndex, setCurrentImageIndex] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            changeSlide(1);
        }, 3000); 

        return () => clearInterval(interval); 
    }, []);

    const changeSlide = (n) => {
        const newIndex = (currentImageIndex + n + 1) % 1;
        setCurrentImageIndex(newIndex);
    };

    return (
        <>
            <Navbar />
            <section className="heroSection">
                <h1 style={{
                    textAlign: "center",
                    fontSize: '2.5rem',
                    fontWeight: 'bold',
                    color: '#333',
                    textTransform: 'uppercase',
                    margin: '20px'
                }}>Welcome to Dwija Bake Studio</h1>
                <div className="slideshow-container">
                    <img
                        src={placeholderImage}
                        alt="Placeholder Slide"
                        className="slideshow-img active"
                        style={{ display: 'block' }}
                    />
                    <div className="dots-container">
                        <span className="dot active" />
                    </div>
                </div>
                <div className="running-text" style={{
                    whiteSpace: 'nowrap',
                    overflow: 'hidden',
                    display: 'flex',
                    animation: 'scrollText 15s linear infinite',
                    fontSize: '1.2rem',
                    color: '#444',
                    marginTop: '20px'
                }}>
                    <div style={{ display: 'inline-block', paddingRight: '100%' }}>
                        Special Offers: Buy One Get One Free on Select Items! | 20% Off Custom Cakes! | Freshly Baked Goods Daily! | Free Delivery on Orders Over Rs.1200!
                    </div>
                </div>
                <style>{`
                    @keyframes scrollText {
                        0% { transform: translateX(100%); }
                        100% { transform: translateX(-100%); }
                    }
                `}</style>
            </section>
        </>
    );
};

export default HeroSection;
