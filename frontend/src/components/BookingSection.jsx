import { useState } from 'react';

import AutocompleteInput from './AutocompleteInput';
import DatePickerInput from './DatePickerInput';
// ─── Main Component ─────────────────────────────────────────────────────────
const BookingSection = () => {
  const [pickup, setPickup] = useState('');
  const [destination, setDestination] = useState('');
  const [date, setDate] = useState(null);

  // Get API key from environment variables (MUST start with VITE_ in Vite apps)
  const OLA_API_KEY = import.meta.env.VITE_OLA_MAPS_API_KEY;

  const handleSwap = () => {
    setPickup(destination);
    setDestination(pickup);
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
      <DatePickerInput date={date} setDate={setDate} />

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
