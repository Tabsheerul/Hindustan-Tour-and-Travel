import HeroCard from './components/HeroCard';
import Navbar from './components/Navbar';
import TripPlannerSection from './components/TripPlannerSection';

function App() {
  return (
    <div className="relative">
      <Navbar />
      <HeroCard />
      <TripPlannerSection />
    </div>
  )
}

export default App