import HeroCard from "./components/HeroCard";
import Navbar from "./components/Navbar";
import TripPlannerSection from "./components/TripPlannerSection";
import MapBackground from "./components/MapBackground";
import ServicesSection from "./components/ServicesSection";

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
    </div>
  );
}

export default App;
