import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import dayjs from "dayjs";
import emailjs from "@emailjs/browser";

import AutocompleteInput from "./AutocompleteInput";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { TimePicker } from "@mui/x-date-pickers/TimePicker";
// ─── Main Component ─────────────────────────────────────────────────────────
// onCoordsChange: optional callback → { pickup, destination } coordinates
// Pickup is restricted to Firozabad & nearby areas (within ~50km)
// Destination can be anywhere in India

const BookingSection = ({ onCoordsChange, initialState, isBookingPage, serviceType, vehicleVariant }) => {
  const navigate = useNavigate();

  const [pickup, setPickup] = useState(initialState?.pickup || "");
  const [destination, setDestination] = useState(initialState?.destination || "");
  const [date, setDate] = useState(initialState?.date ? dayjs(initialState.date) : null);
  const [time, setTime] = useState(initialState?.time ? dayjs(initialState.time) : null);
  const [tripType, setTripType] = useState(initialState?.tripType || "One Way");
  const [isLocating, setIsLocating] = useState(false);
  const [isBooking, setIsBooking] = useState(false); // New state for email submission loading
  
  // Contact Info
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");

  // Holds { lat, lng } objects for the map
  const [pickupCoords, setPickupCoords] = useState(initialState?.pickupCoords || null);
  const [destinationCoords, setDestinationCoords] = useState(initialState?.destinationCoords || null);

  // Get API key from environment variables (MUST start with VITE_ in Vite apps)
  const OLA_API_KEY = import.meta.env.VITE_OLA_MAPS_API_KEY;

  // Called by AutocompleteInput when pickup coordinates are resolved
  const handlePickupCoords = (coords) => {
    setPickupCoords(coords);
    if (onCoordsChange) onCoordsChange({ pickup: coords, destination: destinationCoords });
  };

  // Called by AutocompleteInput when destination coordinates are resolved
  const handleDestinationCoords = (coords) => {
    setDestinationCoords(coords);
    if (onCoordsChange) onCoordsChange({ pickup: pickupCoords, destination: coords });
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
          // Notify the map about the new coordinates!
          handlePickupCoords({ lat: latitude, lng: longitude });
        } catch (error) {
          console.error("Error reverse geocoding:", error);
          setPickup(`${latitude.toFixed(4)}, ${longitude.toFixed(4)}`);
          handlePickupCoords({ lat: latitude, lng: longitude });
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

  const handleBookTrip = () => {
    if (isBookingPage) {
      // Validate required fields
      if (!pickup || !destination || !name || !phone) {
        alert("Please fill in all required fields (Name, Phone, Pickup, Destination).");
        return;
      }

      setIsBooking(true);

      const templateParams = {
        title: `Booking Request - ${name}`,
        name: name,
        phone: phone,
        email: email || "Not provided",
        pickup: pickup,
        destination: destination,
        trip_type: tripType,
        date: date ? date.format("DD MMMM YYYY") : "Not specified",
        time: time ? time.format("HH:mm") : "Not specified",
        service: `${serviceType || "Cars"}${vehicleVariant ? ` — ${vehicleVariant}` : ""}`
      };

      // These credentials should be added to your .env file
      // Check the chat for instructions on how to set this up!
      const serviceID = import.meta.env.VITE_EMAILJS_SERVICE_ID || "YOUR_SERVICE_ID";
      const templateID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID || "YOUR_TEMPLATE_ID";
      const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY || "YOUR_PUBLIC_KEY";

      emailjs.send(serviceID, templateID, templateParams, publicKey)
        .then((response) => {
          setIsBooking(false);
          alert("Booking Confirmed! We have successfully received your request and will contact you shortly.");
          // Optional: clear the form here if you want
        })
        .catch((error) => {
          setIsBooking(false);
          console.error("EmailJS Error:", error);
          alert("Something went wrong while sending your request. Please try again or contact us directly.");
        });

    } else {
      navigate("/booking", {
        state: {
          pickup,
          destination,
          date: date ? date.toISOString() : null,
          time: time ? time.toISOString() : null,
          tripType,
          pickupCoords,
          destinationCoords,
        },
      });
    }
  };

  return (
    <div className="flex flex-col gap-4">
      {/* Trip Type Selector (Only on Booking Page) */}
      {isBookingPage && (
        <div className="flex flex-col gap-2">
          <div className="flex bg-gray-100 rounded-xl p-1 shadow-inner w-full sm:w-fit mx-auto sm:mx-0">
            {["One Way", "Round Trip"].map((type) => (
              <button
                key={type}
                onClick={() => setTripType(type)}
                className={`flex-1 sm:px-6 py-2.5 text-xs font-bold rounded-lg transition-all duration-300 ${
                  tripType === type 
                    ? "bg-white text-gray-900 shadow-sm border border-gray-200" 
                    : "text-gray-500 hover:text-gray-800"
                }`}
              >
                {type}
              </button>
            ))}
          </div>
          {tripType === "Round Trip" && (
            <div className="bg-yellow-50 border border-yellow-200 text-yellow-800 text-xs px-3 py-2 rounded-lg mt-1 flex gap-2 items-start">
              <span className="shrink-0">⚠️</span>
              <span>Driver retention charges will apply separately if the vehicle is held for one or more days.</span>
            </div>
          )}
        </div>
      )}

      {/* Pickup & Destination */}
      <div className="flex flex-col gap-2">
        <AutocompleteInput
          label="Pickup Point"
          icon={<span className="shrink-0 text-lg text-[#FF5E62]">📍</span>}
          placeholder="Firozabad, Tundla, Shikohabad..."
          value={pickup}
          onChange={setPickup}
          onCoordinatesChange={handlePickupCoords}
          apiKey={OLA_API_KEY}
          onGetCurrentLocation={handleGetCurrentLocation}
          isLoading={isLocating}
        />

        {/* Swap Button */}
        <div className="flex items-center gap-3 py-1">
          <div className="h-[2px] flex-1 bg-gray-200" />
          <button
            onClick={() => {
              const tempVal = pickup;
              const tempCoords = pickupCoords;
              setPickup(destination);
              setDestination(tempVal);
              setPickupCoords(destinationCoords);
              setDestinationCoords(tempCoords);
              if (onCoordsChange) onCoordsChange({ pickup: destinationCoords, destination: tempCoords });
            }}
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
          placeholder="Agra, Delhi, Jaipur, Mumbai..."
          value={destination}
          onChange={setDestination}
          onCoordinatesChange={handleDestinationCoords}
          apiKey={OLA_API_KEY}
        />
      </div>

      {/* Travel Date & Time */}
      <div className="flex w-full flex-col gap-4 sm:flex-row">
        <div className="flex w-full flex-col gap-1.5 sm:w-1/2">
          <label className="pb-1 pl-1 text-xs font-bold tracking-wider text-gray-600 uppercase">
            Travel Date
          </label>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker
              value={date}
              onChange={(newValue) => setDate(newValue)}
              views={['year', 'month', 'day']}
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

        <div className="flex w-full flex-col gap-1.5 sm:w-1/2">
          <label className="pb-1 pl-1 text-xs font-bold tracking-wider text-gray-600 uppercase">
            Travel Time
          </label>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <TimePicker
              value={time}
              onChange={(newValue) => setTime(newValue)}
              views={['hours', 'minutes']}
              ampm={false}
              sx={{
                width: "100%",
                "& .MuiOutlinedInput-root": {
                  borderRadius: "1rem",
                  backgroundColor: "white",
                  fontSize: "1rem",
                  fontWeight: "500",
                  color: "#111827",
                  "& fieldset": {
                    borderColor: "#d1d5db",
                    borderWidth: "1px",
                  },
                  "&:hover fieldset": {
                    borderColor: "#9ca3af",
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
      </div>

      {/* Contact Details (Only on Booking Page) */}
      {isBookingPage && (
        <>
          <div className="mt-2 flex w-full flex-col gap-2">
            <label className="pl-1 text-xs font-bold tracking-wider text-gray-600 uppercase">
              Contact Details
            </label>
            <input 
              type="text" 
              placeholder="Full Name *" 
              value={name} 
              onChange={e => setName(e.target.value)} 
              className="w-full rounded-[1rem] border border-gray-300 bg-white px-4 py-3.5 text-base font-medium text-gray-900 outline-none transition-all focus:border-[#FF5E62] focus:shadow-[0_0_0_3px_rgba(255,94,98,0.15)]"
            />
            <div className="flex flex-col sm:flex-row gap-3">
              <input 
                type="tel" 
                placeholder="Phone Number *" 
                value={phone} 
                onChange={e => setPhone(e.target.value)} 
                className="w-full sm:w-1/2 rounded-[1rem] border border-gray-300 bg-white px-4 py-3.5 text-base font-medium text-gray-900 outline-none transition-all focus:border-[#FF5E62] focus:shadow-[0_0_0_3px_rgba(255,94,98,0.15)]"
              />
              <input 
                type="email" 
                placeholder="Email Address (Optional)" 
                value={email} 
                onChange={e => setEmail(e.target.value)} 
                className="w-full sm:w-1/2 rounded-[1rem] border border-gray-300 bg-white px-4 py-3.5 text-base font-medium text-gray-900 outline-none transition-all focus:border-[#FF5E62] focus:shadow-[0_0_0_3px_rgba(255,94,98,0.15)]"
              />
            </div>
          </div>
        </>
      )}

      {/* Divider */}
      <div className="my-1 h-[2px] w-full bg-gray-200" />

      {/* Book Trip CTA */}
      <button 
        onClick={handleBookTrip}
        disabled={isBooking}
        className={`mt-1 flex w-full items-center justify-center gap-2 rounded-full px-7 py-3 text-sm font-semibold text-white transition-colors duration-300 ${
          isBooking ? "bg-gray-400 cursor-not-allowed" : "bg-gray-900 hover:bg-[#FF5E62]"
        }`}
      >
        <span>
          {isBooking ? "Sending..." : isBookingPage ? "Confirm Booking" : "Continue to Book"}
        </span>
        {!isBooking && <span className="text-base leading-none">→</span>}
      </button>
    </div>
  );
};

export default BookingSection;
