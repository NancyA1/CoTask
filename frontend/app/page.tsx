
import Features from "./components/Features";
import Hero from "./components/Hero";
import HowItWorks from "./components/HowItWorks";
import Navbar from "./components/Navbar";
import ProductPreview from "./components/ProductPreview";
import FinalCTA from "./components/FinalCTA";
import Footer from "./components/Footer";
export default function Home() {
  return (
  <>                   
  <Navbar/>
  <Hero/>
  <ProductPreview/>
   <Features />
  <HowItWorks />
      <FinalCTA />
      <Footer/>

  </>
  

  );
}
