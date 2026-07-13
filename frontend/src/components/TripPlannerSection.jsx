import BookingSection from './BookingSection';
import VehicleSelector from './VehicleSelector';

// ─── TripPlannerSection ───────────────────────────────────────────────────────
// Two-column layout:
//   Left  → BookingSection  (pickup, destination, date, popular cities)
//   Right → VehicleSelector (compact vehicle type pills + 3D model placeholder)
const TripPlannerSection = () => {
  return (
    <section className="w-full bg-white py-24 px-16 max-w-6xl mx-auto">

      {/* Section Label */}
      <span className="text-xs font-semibold tracking-[0.2em] text-[#FF5E62] uppercase">
        Plan Your Journey
      </span>

      {/* Heading */}
      <h2 className="text-4xl font-bold text-gray-900 tracking-tight mt-3 mb-12">
        Where would you like to go?
      </h2>

      {/* Two-column card */}
      <div className="flex flex-col md:flex-row gap-8 border border-gray-100 rounded-3xl shadow-[0_8px_40px_rgba(0,0,0,0.06)] p-8">

        {/* Left column — Booking form (takes more space) */}
        <div className="flex-1">
          <BookingSection />
        </div>

        {/* Vertical divider (desktop only) */}
        <div className="hidden md:block w-px bg-gray-100 self-stretch" />

        {/* Right column — Compact vehicle selector */}
        <div className="w-full md:w-72 shrink-0 flex flex-col gap-3">
          <p className="text-[10px] font-bold tracking-[0.2em] text-gray-400 uppercase">
            Vehicle Type
          </p>
          <VehicleSelector />
        </div>

      </div>
    </section>
  );
};

export default TripPlannerSection;
