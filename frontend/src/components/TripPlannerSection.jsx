import BookingSection from './BookingSection';
import VehicleSelector from './VehicleSelector';

// ─── TripPlannerSection ───────────────────────────────────────────────────────
// Two-column layout:
//   Left  → BookingSection  (pickup, destination, date, popular cities)
//   Right → VehicleSelector (compact vehicle type pills + 3D model placeholder)
const TripPlannerSection = () => {
  return (
    <section className="w-full py-24 px-16 max-w-7xl mx-auto relative">

      {/* Decorative background blurs */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-brand-primary/5 rounded-full blur-[100px] -z-10 mix-blend-multiply"></div>
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-brand-secondary/5 rounded-full blur-[80px] -z-10 mix-blend-multiply"></div>

      {/* Section Label */}
      <span className="text-xs font-semibold tracking-[0.25em] text-brand-primary uppercase">
        Plan Your Journey
      </span>

      {/* Heading */}
      <h2 className="text-5xl font-bold tracking-tight mt-4 mb-16 text-texture-mask">
        Where would you like to go?
      </h2>

      {/* Two-column card */}
      <div className="glass flex flex-col md:flex-row gap-10 rounded-[2.5rem] p-10">

        {/* Left column — Booking form (takes more space) */}
        <div className="flex-1">
          <BookingSection />
        </div>

        {/* Vertical divider (desktop only) */}
        <div className="hidden md:block w-px bg-gray-200/50 self-stretch" />

        {/* Right column — Compact vehicle selector */}
        <div className="w-full md:w-80 shrink-0 flex flex-col gap-4">
          <p className="text-xs font-bold tracking-[0.2em] text-gray-500 uppercase">
            Vehicle Type
          </p>
          <VehicleSelector />
        </div>

      </div>
    </section>
  );
};

export default TripPlannerSection;
