import { useState } from 'react';

import AutocompleteInput from './AutocompleteInput';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
// ─── Main Component ─────────────────────────────────────────────────────────
const BookingSection = () => {
  const [pickup, setPickup] = useState('');
  const [destination, setDestination] = useState('');
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
      alert('Geolocation is not supported by your browser');
      return;
    }

    setIsLocating(true);
    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude } = position.coords;
        try {
          const response = await fetch(`https://api.olamaps.io/places/v1/reverse-geocode?latlng=${latitude},${longitude}&api_key=${OLA_API_KEY}`);
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
        alert('Unable to retrieve your location. Please check your permissions.');
        setIsLocating(false);
      }
    );
  };

  return (
    <div className="flex flex-col gap-6">

      {/* Pickup & Destination Row */}
      <div className="flex flex-col gap-4">

        <AutocompleteInput 
          label="Pickup Point"
          icon={<span className="text-[#FF5E62] text-lg shrink-0">📍</span>}
          placeholder="Enter pickup city or location"
          value={pickup}
          onChange={setPickup}
          apiKey={OLA_API_KEY}
          onGetCurrentLocation={handleGetCurrentLocation}
          isLoading={isLocating}
        />

        {/* Swap Button */}
        <div className="flex items-center gap-3">
          <div className="flex-1 h-px bg-gray-100" />
          <button
            onClick={handleSwap}
            title="Swap pickup and destination"
            className="w-8 h-8 rounded-full bg-gray-50 border border-gray-200 flex items-center justify-center text-gray-400 hover:bg-[#FF5E62] hover:text-white hover:border-[#FF5E62] hover:rotate-180 transition-all duration-300 shrink-0 text-sm"
          >
            ⇅
          </button>
          <div className="flex-1 h-px bg-gray-100" />
        </div>

        <AutocompleteInput 
          label="Destination"
          icon={<span className="text-[#FF9933] text-lg shrink-0">🏁</span>}
          placeholder="Enter your destination"
          value={destination}
          onChange={setDestination}
          apiKey={OLA_API_KEY}
        />
      </div>

      {/* Travel Date */}
      <div className="flex flex-col gap-1.5 w-full">
        <label className="text-[10px] font-bold tracking-[0.2em] text-gray-400 uppercase pl-1">
          Travel Date
        </label>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DatePicker
            value={date}
            onChange={(newValue) => setDate(newValue)}
            sx={{
              width: '100%',
              '& .MuiOutlinedInput-root': {
                borderRadius: '1rem',
                backgroundColor: 'white',
                '& fieldset': {
                  borderColor: '#e5e7eb',
                },
                '&:hover fieldset': {
                  borderColor: '#d1d5db',
                },
                '&.Mui-focused fieldset': {
                  borderColor: '#FF5E62',
                  borderWidth: '1px',
                  boxShadow: '0 0 0 3px rgba(255,94,98,0.08)',
                },
              },
            }}
          />
        </LocalizationProvider>
      </div>

      {/* Divider */}
      <div className="w-full h-px bg-gray-100" />

      {/* Book Trip CTA */}
      <button className="w-full flex items-center justify-center gap-2 bg-gray-900 text-white text-sm font-semibold px-7 py-3.5 rounded-full hover:bg-[#FF5E62] transition-colors duration-300 mt-2">
        <span>Book Trip</span>
        <span className="text-base leading-none">→</span>
      </button>
    </div>
  );
};

export default BookingSection;
