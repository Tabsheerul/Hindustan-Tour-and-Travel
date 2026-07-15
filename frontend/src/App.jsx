import HeroCard from './components/HeroCard';
import Navbar from './components/Navbar';
import TripPlannerSection from './components/TripPlannerSection';
import MapBackground from './components/MapBackground';

function App() {
  return (
    <div className="relative w-full min-h-screen">
      <MapBackground />
      <Navbar />
      <HeroCard />
      <TripPlannerSection />
    </div>
  )
}

export default App