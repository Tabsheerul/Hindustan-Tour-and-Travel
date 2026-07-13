import HeroCard from './components/HeroCard';
import Navbar from './components/Navbar';
import BookingSection from './components/BookingSection';

function App() {
  return (
    <div className="relative">
      <Navbar />
      <HeroCard />
      <BookingSection />
    </div>
  )
}

export default App