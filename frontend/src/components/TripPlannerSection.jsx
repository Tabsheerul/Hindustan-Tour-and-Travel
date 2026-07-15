import BookingSection from "./BookingSection";
import VehicleSelector from "./VehicleSelector";

// ─── TripPlannerSection ───────────────────────────────────────────────────────
// Two-column layout:
//   Left  → BookingSection  (pickup, destination, date, popular cities)
//   Right → VehicleSelector (compact vehicle type pills + 3D model placeholder)
const TripPlannerSection = () => {
  return (
    <section className="relative mx-auto w-full max-w-7xl px-16 py-24">
      {/* Decorative background blurs */}
      <div className="bg-brand-primary/5 absolute top-0 right-0 -z-10 h-[500px] w-[500px] rounded-full mix-blend-multiply blur-[100px]"></div>
      <div className="bg-brand-secondary/5 absolute bottom-0 left-0 -z-10 h-[400px] w-[400px] rounded-full mix-blend-multiply blur-[80px]"></div>

      {/* Section Label */}
      <span className="text-brand-primary text-xs font-semibold tracking-[0.25em] uppercase">
        Plan Your Journey
      </span>

      {/* Heading */}
      <h2 className="text-texture-mask mt-4 mb-16 text-5xl font-bold tracking-tight">
        Where would you like to go?
      </h2>

      {/* Two-column card */}
      <div className="glass flex flex-col gap-10 rounded-[2.5rem] p-10 md:flex-row">
        {/* Left column — Booking form (takes more space) */}
        <div className="flex-1">
          <BookingSection />
        </div>

        {/* Vertical divider (desktop only) */}
        <div className="hidden w-px self-stretch bg-gray-200/50 md:block" />

        {/* Right column — Compact vehicle selector */}
        <div className="flex w-full shrink-0 flex-col gap-4 md:w-80">
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
