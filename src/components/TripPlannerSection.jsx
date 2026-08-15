import { useState, useCallback } from "react";
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

  // Pick-from-map state
  const [pickMode, setPickMode] = useState(null); // "pickup" | "destination" | null
  const [mapPickedPickup, setMapPickedPickup] = useState(null);       // { address, coords }
  const [mapPickedDestination, setMapPickedDestination] = useState(null); // { address, coords }

  // BookingSection calls this whenever either coordinate changes
  const handleCoordsChange = ({ pickup, destination }) => {
    setPickupCoords(pickup);
    setDestinationCoords(destination);
  };

  // Called when user clicks the map in pick mode — reverse-geocodes & fills the field
  const handleMapClick = useCallback(async (lat, lng) => {
    if (!pickMode) return;
    try {
      const res = await fetch(
        `https://api.olamaps.io/places/v1/reverse-geocode?latlng=${lat},${lng}&api_key=${OLA_API_KEY}`
      );
      const data = await res.json();
      const address = data?.results?.[0]?.formatted_address || `${lat.toFixed(5)}, ${lng.toFixed(5)}`;

      if (pickMode === "pickup") {
        setMapPickedPickup({ address, coords: { lat, lng } });
        setPickupCoords({ lat, lng });
      } else {
        setMapPickedDestination({ address, coords: { lat, lng } });
        setDestinationCoords({ lat, lng });
      }
    } catch (err) {
      console.error("Reverse geocode error:", err);
    }
    setPickMode(null); // exit pick mode after selection
  }, [pickMode, OLA_API_KEY]);

  return (
    <section id="booking" className="relative mx-auto w-full max-w-7xl px-5 py-14 sm:px-8 sm:py-18 lg:px-8 lg:py-24">
      {/* Decorative background blurs */}
      <div className="bg-brand-primary/5 absolute top-0 right-0 -z-10 hidden h-[500px] w-[500px] rounded-full mix-blend-multiply blur-[100px] sm:block"></div>
      <div className="bg-brand-secondary/5 absolute bottom-0 left-0 -z-10 hidden h-[400px] w-[400px] rounded-full mix-blend-multiply blur-[80px] sm:block"></div>

      {/* Section Label */}
      <span className="text-brand-primary hidden text-xs font-semibold tracking-[0.25em] uppercase sm:inline">
        Book Your Ride from Firozabad
      </span>

      {/* Heading */}
      <h2 className="text-texture-mask mb-7 max-w-xl text-3xl font-bold tracking-tight sm:mt-3 sm:mb-12 sm:text-5xl">
        Where would you like to go?
      </h2>

      {/* Two-column card: form + map */}
      <div className="glass flex flex-col gap-0 overflow-hidden rounded-[1.75rem] lg:flex-row lg:rounded-[2.5rem]">
        {/* Left column — Booking form */}
        <div className="order-2 shrink-0 p-5 sm:p-8 lg:order-none lg:w-[420px] lg:p-10">
          <BookingSection 
            onCoordsChange={handleCoordsChange} 
            onPickFromMap={(mode) => setPickMode(mode)}
            pickMode={pickMode}
            mapPickedPickup={mapPickedPickup}
            mapPickedDestination={mapPickedDestination}
          />
        </div>

        {/* Vertical divider (desktop only) */}
        <div className="hidden w-px self-stretch bg-gray-200/60 lg:block" />

        {/* Right column — Live OLA Map */}
        <div className="order-1 h-[264px] w-full flex-none p-3 sm:h-[360px] sm:p-4 lg:order-none lg:h-auto lg:min-h-[400px] lg:flex-1">
          <OlaMapView
            pickupCoords={pickupCoords}
            destinationCoords={destinationCoords}
            defaultCenter={FIROZABAD_CENTER}
            apiKey={OLA_API_KEY}
            pickMode={pickMode}
            onMapClick={handleMapClick}
          />
        </div>
      </div>
    </section>
  );
};

export default TripPlannerSection;
