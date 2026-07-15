import { useState } from "react";

import AutocompleteInput from "./AutocompleteInput";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
// ─── Main Component ─────────────────────────────────────────────────────────
const BookingSection = () => {
  const [pickup, setPickup] = useState("");
  const [destination, setDestination] = useState("");
  const [date, setDate] = useState(null);
  const [isLocating, setIsLocating] = useState(false);

  // Get API key from environment variables (MUST start with VITE_ in Vite apps)
  const OLA_API_KEY = import.meta.env.VITE_OLA_MAPS_API_KEY;

  const handleSwap = () => {
    setPickup(destination);
    setDestination(pickup);
  };

  const handleGetCurrentLocation = () => {
    if (!navigator.geolocation) {
      alert("Geolocation is not supported by your browser");
      return;
    }

    setIsLocating(true);
    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude } = position.coords;
        try {
          const response = await fetch(
            `https://api.olamaps.io/places/v1/reverse-geocode?latlng=${latitude},${longitude}&api_key=${OLA_API_KEY}`,
          );
          const data = await response.json();
          if (data.results && data.results.length > 0) {
            setPickup(data.results[0].formatted_address);
          } else {
            setPickup(`${latitude.toFixed(4)}, ${longitude.toFixed(4)}`);
          }
        } catch (error) {
          console.error("Error reverse geocoding:", error);
          setPickup(`${latitude.toFixed(4)}, ${longitude.toFixed(4)}`);
        } finally {
          setIsLocating(false);
        }
      },
      (error) => {
        console.error("Error getting location:", error);
        alert(
          "Unable to retrieve your location. Please check your permissions.",
        );
        setIsLocating(false);
      },
    );
  };

  return (
    <div className="flex flex-col gap-6">
      {/* Pickup & Destination Row */}
      <div className="flex flex-col gap-4">
        <AutocompleteInput
          label="Pickup Point"
          icon={<span className="shrink-0 text-lg text-[#FF5E62]">📍</span>}
          placeholder="Enter pickup city or location"
          value={pickup}
          onChange={setPickup}
          apiKey={OLA_API_KEY}
          onGetCurrentLocation={handleGetCurrentLocation}
          isLoading={isLocating}
        />

        {/* Swap Button */}
        <div className="flex items-center gap-3 py-1">
          <div className="h-[2px] flex-1 bg-gray-200" />
          <button
            onClick={handleSwap}
            title="Swap pickup and destination"
            className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-gray-300 bg-white text-base text-gray-600 shadow-sm transition-all duration-300 hover:rotate-180 hover:border-[#FF5E62] hover:bg-[#FF5E62] hover:text-white"
          >
            ⇅
          </button>
          <div className="h-[2px] flex-1 bg-gray-200" />
        </div>

        <AutocompleteInput
          label="Destination"
          icon={<span className="shrink-0 text-lg text-[#FF9933]">🏁</span>}
          placeholder="Enter your destination"
          value={destination}
          onChange={setDestination}
          apiKey={OLA_API_KEY}
        />
      </div>

      {/* Travel Date */}
      <div className="flex w-full flex-col gap-1.5">
        <label className="pb-1 pl-1 text-xs font-bold tracking-wider text-gray-600 uppercase">
          Travel Date
        </label>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DatePicker
            value={date}
            onChange={(newValue) => setDate(newValue)}
            sx={{
              width: "100%",
              "& .MuiOutlinedInput-root": {
                borderRadius: "1rem",
                backgroundColor: "white",
                fontSize: "1rem",
                fontWeight: "500",
                color: "#111827", // gray-900
                "& fieldset": {
                  borderColor: "#d1d5db", // gray-300
                  borderWidth: "1px",
                },
                "&:hover fieldset": {
                  borderColor: "#9ca3af", // gray-400
                },
                "&.Mui-focused fieldset": {
                  borderColor: "#FF5E62",
                  borderWidth: "1px",
                  boxShadow: "0 0 0 3px rgba(255,94,98,0.15)",
                },
              },
            }}
          />
        </LocalizationProvider>
      </div>

      {/* Divider */}
      <div className="my-1 h-[2px] w-full bg-gray-200" />

      {/* Book Trip CTA */}
      <button className="mt-2 flex w-full items-center justify-center gap-2 rounded-full bg-gray-900 px-7 py-3.5 text-sm font-semibold text-white transition-colors duration-300 hover:bg-[#FF5E62]">
        <span>Book Trip</span>
        <span className="text-base leading-none">→</span>
      </button>
    </div>
  );
};

export default BookingSection;
