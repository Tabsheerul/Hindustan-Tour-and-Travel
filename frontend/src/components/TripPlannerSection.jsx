import { useState } from "react";
import BookingSection from "./BookingSection";
import OlaMapView from "./OlaMapView";

// ─── TripPlannerSection ───────────────────────────────────────────────────────
// Firozabad coordinates: 27.1591°N, 78.3957°E
const FIROZABAD_CENTER = { lat: 27.1591, lng: 78.3957 };

const TripPlannerSection = () => {
  const OLA_API_KEY = import.meta.env.VITE_OLA_MAPS_API_KEY;

  // Stores the resolved { lat, lng } for pickup and destination
  const [pickupCoords, setPickupCoords] = useState(null);
  const [destinationCoords, setDestinationCoords] = useState(null);

  // BookingSection calls this whenever either coordinate changes
  const handleCoordsChange = ({ pickup, destination }) => {
    setPickupCoords(pickup);
    setDestinationCoords(destination);
  };

  return (
    <section id="booking" className="relative mx-auto w-full max-w-7xl px-16 py-24">
      {/* Decorative background blurs */}
      <div className="bg-brand-primary/5 absolute top-0 right-0 -z-10 h-[500px] w-[500px] rounded-full mix-blend-multiply blur-[100px]"></div>
      <div className="bg-brand-secondary/5 absolute bottom-0 left-0 -z-10 h-[400px] w-[400px] rounded-full mix-blend-multiply blur-[80px]"></div>

      {/* Section Label */}
      <span className="text-brand-primary text-xs font-semibold tracking-[0.25em] uppercase">
        Book Your Ride from Firozabad
      </span>

      {/* Heading */}
      <h2 className="text-texture-mask mt-4 mb-16 text-5xl font-bold tracking-tight">
        Where would you like to go?
      </h2>

      {/* Two-column card: form + map */}
      <div className="glass flex flex-col gap-0 overflow-hidden rounded-[2.5rem] md:flex-row">
        {/* Left column — Booking form */}
        <div className="shrink-0 p-10 md:w-[420px]">
          <BookingSection onCoordsChange={handleCoordsChange} />
        </div>

        {/* Vertical divider (desktop only) */}
        <div className="hidden w-px self-stretch bg-gray-200/60 md:block" />

        {/* Right column — Live OLA Map */}
        <div className="min-h-[400px] flex-1 p-4">
          <OlaMapView
            pickupCoords={pickupCoords}
            destinationCoords={destinationCoords}
            defaultCenter={FIROZABAD_CENTER}
            apiKey={OLA_API_KEY}
          />
        </div>
      </div>
    </section>
  );
};

export default TripPlannerSection;
