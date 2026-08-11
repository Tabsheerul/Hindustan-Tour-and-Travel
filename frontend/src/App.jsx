import HeroCard from "./components/HeroCard";
import Navbar from "./components/Navbar";
import TripPlannerSection from "./components/TripPlannerSection";
import MapBackground from "./components/MapBackground";
import ServicesSection from "./components/ServicesSection";
import FaqSection from "./components/FaqSection";
import ContactSection from "./components/ContactSection";
import Footer from "./components/Footer";

function App() {
  return (
    <div className="w-full">
      {/* Top Section Container (keeps MapBackground confined to this height) */}
      <div className="relative w-full">
        <MapBackground />
        <Navbar />
        <HeroCard />
        <TripPlannerSection />
      </div>
      
      <ServicesSection />
      <FaqSection />
      <ContactSection />
      <Footer />
    </div>
  );
}

export default App;
