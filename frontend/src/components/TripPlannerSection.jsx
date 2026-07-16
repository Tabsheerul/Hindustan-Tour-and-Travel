import { useState, useEffect } from "react";
import BookingSection from "./BookingSection";
import OlaMapView from "./OlaMapView";

// ─── TripPlannerSection ───────────────────────────────────────────────────────

const TripPlannerSection = () => {
  const OLA_API_KEY = import.meta.env.VITE_OLA_MAPS_API_KEY;

  // Stores the resolved { lat, lng } for pickup and destination
  const [pickupCoords, setPickupCoords] = useState(null);
  const [destinationCoords, setDestinationCoords] = useState(null);
  // User's city fetched silently via IP geolocation (no browser permission needed)
  const [userLocation, setUserLocation] = useState(null);

  // On mount: fetch user's approximate city from their IP address
  // ipapi.co is free (1000 req/day), no API key required
  useEffect(() => {
    const fetchUserCity = async () => {
      try {
        const res = await fetch("https://ipapi.co/json/");
        const data = await res.json();
        if (data.latitude && data.longitude) {
          setUserLocation({ lat: data.latitude, lng: data.longitude });
        }
      } catch (err) {
        console.warn("IP geolocation failed, using default map center.", err);
      }
    };
    fetchUserCity();
  }, []);

  // BookingSection calls this whenever either coordinate changes
  const handleCoordsChange = ({ pickup, destination }) => {
    setPickupCoords(pickup);
    setDestinationCoords(destination);
  };

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
            defaultCenter={userLocation}
            apiKey={OLA_API_KEY}
          />
        </div>
      </div>
    </section>
  );
};

export default TripPlannerSection;
