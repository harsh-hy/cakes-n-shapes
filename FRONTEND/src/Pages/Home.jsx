import About from "../Components/About";
import Footer from "../Components/Footer";
import HeroSection from "../Components/HeroSection";

import Quantities from "../Components/Quantities";
import WhoAreWe from "../Components/WhoAreWe";


const Home = () => {
  return (
    <>
        <HeroSection/>
        <About/>
        <Quantities/>
        <WhoAreWe/>
        <Footer/>
    </>
  )
}

export default Home;