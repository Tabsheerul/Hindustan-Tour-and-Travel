import { useState, useEffect, useRef } from "react";
import ReCAPTCHA from "react-google-recaptcha";
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
// Helper to calculate distance between two coordinates in km
const getDistanceFromLatLonInKm = (lat1, lon1, lat2, lon2) => {
  const R = 6371; // Radius of the earth in km
  const dLat = (lat2 - lat1) * (Math.PI / 180);
  const dLon = (lon2 - lon1) * (Math.PI / 180);
  const a = 
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(lat1 * (Math.PI / 180)) * Math.cos(lat2 * (Math.PI / 180)) * 
    Math.sin(dLon / 2) * Math.sin(dLon / 2); 
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a)); 
  return R * c;
};

// Pickup is restricted to Firozabad & nearby areas (within ~50km)
const FIROZABAD_LAT = 27.1591;
const FIROZABAD_LNG = 78.3957;
// Destination can be anywhere in India

const BookingSection = ({ onCoordsChange, initialState, isBookingPage, serviceType, vehicleVariant, onPickFromMap, pickMode, mapPickedPickup, mapPickedDestination }) => {
  const navigate = useNavigate();

  const [pickup, setPickup] = useState(initialState?.pickup || "");
  const [destination, setDestination] = useState(initialState?.destination || "");
  const [date, setDate] = useState(initialState?.date ? dayjs(initialState.date) : null);
  const [time, setTime] = useState(initialState?.time ? dayjs(initialState.time) : null);
  const [tripType, setTripType] = useState(initialState?.tripType || "One Way");
  const [isLocating, setIsLocating] = useState(false);
  const [isBooking, setIsBooking] = useState(false);
  const [captchaToken, setCaptchaToken] = useState(null);
  const recaptchaRef = useRef(null);

  // Contact Info
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");

  // Holds { lat, lng } objects for the map
  const [pickupCoords, setPickupCoords] = useState(initialState?.pickupCoords || null);
  const [destinationCoords, setDestinationCoords] = useState(initialState?.destinationCoords || null);

  // When BookingPage signals a map-picked pickup → fill our input
  useEffect(() => {
    if (!mapPickedPickup) return;
    setPickup(mapPickedPickup.address);
    setPickupCoords(mapPickedPickup.coords);
    if (onCoordsChange) onCoordsChange({ pickup: mapPickedPickup.coords, destination: destinationCoords });
  }, [mapPickedPickup]);

  // When BookingPage signals a map-picked destination → fill our input
  useEffect(() => {
    if (!mapPickedDestination) return;
    setDestination(mapPickedDestination.address);
    setDestinationCoords(mapPickedDestination.coords);
    if (onCoordsChange) onCoordsChange({ pickup: pickupCoords, destination: mapPickedDestination.coords });
  }, [mapPickedDestination]);

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

  const handleBookTrip = (e) => {
    e.preventDefault(); // Prevent page reload

    if (isBookingPage) {
      // Validate required fields
      if (!pickup || !destination || !name || !phone) {
        alert("Please fill in all required fields (Name, Phone, Pickup, Destination).");
        return;
      }

      // Validate phone number (Indian format)
      const cleanPhone = phone.replace(/[\s\-]/g, "");
      const phoneRegex = /^(\+91)?[6-9]\d{9}$/;
      if (!phoneRegex.test(cleanPhone)) {
        alert("Please enter a valid Indian phone number (e.g. 9876543210 or +919876543210).");
        return;
      }

      if (!date || !time) {
        alert("Please select both a Travel Date and Travel Time.");
        return;
      }

      // Validate 50km Pickup Boundary
      if (pickupCoords) {
        const distance = getDistanceFromLatLonInKm(FIROZABAD_LAT, FIROZABAD_LNG, pickupCoords.lat, pickupCoords.lng);
        if (distance > 50) {
          alert(`Your pickup location is approximately ${Math.round(distance)}km away from Firozabad. We only accept pickups within a 50km radius.`);
          return;
        }
      } else {
        alert("Please select a valid pickup location from the map or suggestions.");
        return;
      }

      if (!captchaToken) {
        alert("Please complete the 'I am not a robot' CAPTCHA check.");
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
        service: `${serviceType || "Cars"}${vehicleVariant ? ` — ${vehicleVariant}` : ""}`,
        "g-recaptcha-response": captchaToken // Required for EmailJS reCAPTCHA integration
      };

      const serviceID = import.meta.env.VITE_EMAILJS_SERVICE_ID;
      const templateID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
      const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

      if (!serviceID || !templateID || !publicKey) {
        setIsBooking(false);
        alert("Booking service is temporarily unavailable. Please call us directly to book your ride.");
        return;
      }

      emailjs.send(serviceID, templateID, templateParams, publicKey)
        .then((response) => {
          setIsBooking(false);
          alert("Booking Confirmed! We have successfully received your request and will contact you shortly.");
          if (recaptchaRef.current) recaptchaRef.current.reset();
          setCaptchaToken(null);
        })
        .catch((error) => {
          setIsBooking(false);
          console.error("EmailJS Error:", error);
          alert("Something went wrong while sending your request. Please try again or contact us directly.");
          if (recaptchaRef.current) recaptchaRef.current.reset();
          setCaptchaToken(null);
        });

    } else {
      // Validate 50km Pickup Boundary on Home Page as well
      if (pickupCoords) {
        const distance = getDistanceFromLatLonInKm(FIROZABAD_LAT, FIROZABAD_LNG, pickupCoords.lat, pickupCoords.lng);
        if (distance > 50) {
          alert(`Your pickup location is approximately ${Math.round(distance)}km away from Firozabad. We only accept pickups within a 50km radius.`);
          return;
        }
      }

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
    <form onSubmit={handleBookTrip} className="flex flex-col gap-4">
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
          icon={<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="shrink-0 text-[#FF5E62]"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/></svg>}
          placeholder="Firozabad, Tundla, Shikohabad..."
          value={pickup}
          onChange={setPickup}
          onCoordinatesChange={handlePickupCoords}
          apiKey={OLA_API_KEY}
          onGetCurrentLocation={handleGetCurrentLocation}
          isLoading={isLocating}
          required={true}
          maxLength={150}
        />
        {onPickFromMap && (
          <button
            type="button"
            onClick={() => onPickFromMap(pickMode === "pickup" ? null : "pickup")}
            className={`flex items-center gap-1.5 self-start rounded-full border px-3 py-1.5 text-xs font-semibold transition-all duration-200 ${
              pickMode === "pickup"
                ? "border-green-500 bg-green-500 text-white shadow"
                : "border-gray-300 bg-white text-gray-600 hover:border-green-500 hover:text-green-600"
            }`}
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/></svg>
            <span>{pickMode === "pickup" ? "Cancel Map Pick" : "Select on Map"}</span>
          </button>
        )}

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
          icon={<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="shrink-0 text-[#FF9933]"><path d="M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1z"/><line x1="4" x2="4" y1="22" y2="15"/></svg>}
          placeholder="Agra, Delhi, Jaipur, Mumbai..."
          value={destination}
          onChange={setDestination}
          onCoordinatesChange={handleDestinationCoords}
          apiKey={OLA_API_KEY}
          required={true}
          maxLength={150}
        />
        {onPickFromMap && (
          <button
            type="button"
            onClick={() => onPickFromMap(pickMode === "destination" ? null : "destination")}
            className={`flex items-center gap-1.5 self-start rounded-full border px-3 py-1.5 text-xs font-semibold transition-all duration-200 ${
              pickMode === "destination"
                ? "border-red-500 bg-red-500 text-white shadow"
                : "border-gray-300 bg-white text-gray-600 hover:border-red-400 hover:text-red-500"
            }`}
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/></svg>
            <span>{pickMode === "destination" ? "Cancel Map Pick" : "Select on Map"}</span>
          </button>
        )}
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
              disablePast
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
              disablePast={dayjs().isSame(date, 'day')} // Only disable past times if the selected date is today
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
        <div className="flex w-full flex-col gap-4 mt-2">
          <div className="flex w-full flex-col gap-1.5">
            <label className="pl-1 text-xs font-bold tracking-wider text-gray-600 uppercase">
              Full Name *
            </label>
            <div className="group flex items-center gap-3 rounded-[1rem] border border-gray-300 bg-white px-4 py-3.5 shadow-sm transition-all focus-within:border-[#FF5E62] focus-within:shadow-[0_0_0_3px_rgba(255,94,98,0.15)] hover:border-gray-400">
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="shrink-0 text-gray-400 group-focus-within:text-[#FF5E62] transition-colors"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
              <input 
                type="text" 
                value={name} 
                onChange={e => setName(e.target.value)} 
                required
                minLength={3}
                maxLength={50}
                className="w-full bg-transparent text-base font-medium text-gray-900 placeholder-gray-500 outline-none"
              />
            </div>
          </div>
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex w-full sm:w-1/2 flex-col gap-1.5 justify-end">
              <label className="pl-1 text-xs font-bold tracking-wider text-gray-600 uppercase">
                Phone Number *
              </label>
              <div className="group flex items-center gap-3 rounded-[1rem] border border-gray-300 bg-white px-4 py-3.5 shadow-sm transition-all focus-within:border-[#FF5E62] focus-within:shadow-[0_0_0_3px_rgba(255,94,98,0.15)] hover:border-gray-400">
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="shrink-0 text-gray-400 group-focus-within:text-[#FF5E62] transition-colors"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
                <input 
                  type="tel" 
                  value={phone} 
                  onChange={e => setPhone(e.target.value)} 
                  required
                  minLength={10}
                  maxLength={15}
                  pattern="[0-9\+\-\s]*"
                  className="w-full bg-transparent text-base font-medium text-gray-900 placeholder-gray-500 outline-none"
                />
              </div>
            </div>
            <div className="flex w-full sm:w-1/2 flex-col gap-1.5 justify-end">
              <label className="pl-1 text-xs font-bold tracking-wider text-gray-600 uppercase">
                Email (Optional)
              </label>
              <div className="group flex items-center gap-3 rounded-[1rem] border border-gray-300 bg-white px-4 py-3.5 shadow-sm transition-all focus-within:border-[#FF5E62] focus-within:shadow-[0_0_0_3px_rgba(255,94,98,0.15)] hover:border-gray-400">
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="shrink-0 text-gray-400 group-focus-within:text-[#FF5E62] transition-colors"><rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>
                <input 
                  type="email" 
                  value={email} 
                  onChange={e => setEmail(e.target.value)} 
                  maxLength={100}
                  className="w-full bg-transparent text-base font-medium text-gray-900 placeholder-gray-500 outline-none"
                />
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Divider */}
      <div className="my-1 h-[2px] w-full bg-gray-200" />

      {/* CAPTCHA Widget */}
      {isBookingPage && (
        <div className="flex justify-center mt-2 mb-2">
          <ReCAPTCHA
            ref={recaptchaRef}
            sitekey={import.meta.env.VITE_RECAPTCHA_SITE_KEY}
            onChange={(token) => setCaptchaToken(token)}
            onExpired={() => setCaptchaToken(null)}
          />
        </div>
      )}

      {/* Action Button */}
      <button
        type="submit"
        disabled={isBooking}
        className={`group mt-3 flex w-full items-center justify-center gap-3 rounded-full bg-gradient-to-r from-[#FF5E62] to-[#FF9933] px-6 py-4 text-base font-bold tracking-wide text-white shadow-lg transition-all duration-300 ${
          isBooking ? "cursor-not-allowed opacity-75" : "hover:scale-[1.02] hover:shadow-xl active:scale-95"
        }`}
      >
        <span>
          {isBooking ? "Sending..." : isBookingPage ? "Confirm Booking" : "Continue to Book"}
        </span>
        {!isBooking && <span className="text-base leading-none">→</span>}
      </button>
    </form>
  );
};

export default BookingSection;
