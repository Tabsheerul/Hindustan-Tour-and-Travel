import { Routes, Route } from "react-router-dom";
import HeroCard from "./components/HeroCard";
import Navbar from "./components/Navbar";
import TripPlannerSection from "./components/TripPlannerSection";
import MapBackground from "./components/MapBackground";
import ServicesSection from "./components/ServicesSection";
import GallerySection from "./components/GallerySection";
import FaqSection from "./components/FaqSection";
import ContactSection from "./components/ContactSection";
import Footer from "./components/Footer";
import GalleryPage from "./pages/GalleryPage";

// ── Home page ────────────────────────────────────────────────────────────────
function HomePage() {
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
      <GallerySection />
      <FaqSection />
      <ContactSection />
      <Footer />
    </div>
  );
}

// ── App with Router ──────────────────────────────────────────────────────────
function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/gallery" element={<GalleryPage />} />
    </Routes>
  );
}

export default App;
