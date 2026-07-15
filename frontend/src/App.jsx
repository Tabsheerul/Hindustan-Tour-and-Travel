import HeroCard from "./components/HeroCard";
import Navbar from "./components/Navbar";
import TripPlannerSection from "./components/TripPlannerSection";
import MapBackground from "./components/MapBackground";

function App() {
  return (
    <div className="relative min-h-screen w-full">
      <MapBackground />
      <Navbar />
      <HeroCard />
      <TripPlannerSection />
    </div>
  );
}

export default App;
