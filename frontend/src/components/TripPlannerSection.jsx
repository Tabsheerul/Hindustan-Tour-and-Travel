import BookingSection from "./BookingSection";

// ─── TripPlannerSection ───────────────────────────────────────────────────────
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

      {/* Centered Booking Card */}
      <div className="mx-auto max-w-2xl">
        <div className="glass flex flex-col gap-10 rounded-[2.5rem] p-10">
          <BookingSection />
        </div>
      </div>
    </section>
  );
};

export default TripPlannerSection;
