import { useState } from 'react';

import AutocompleteInput from './AutocompleteInput';

// ─── Main Component ─────────────────────────────────────────────────────────
const BookingSection = () => {
  const [pickup, setPickup] = useState('');
  const [destination, setDestination] = useState('');
  const [date, setDate] = useState('');

  // Get API key from environment variables
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
      <div className="flex flex-col gap-1.5 relative">
        <label className="text-[10px] font-bold tracking-[0.2em] text-gray-400 uppercase pl-1">
          Travel Date
        </label>
        <div className="flex items-center gap-3 border border-gray-200 rounded-2xl px-4 py-3.5 focus-within:border-[#FF5E62] focus-within:shadow-[0_0_0_3px_rgba(255,94,98,0.08)] transition-all bg-white">
          <span className="text-gray-400 text-lg shrink-0">📅</span>
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="w-full text-sm text-gray-800 outline-none bg-transparent cursor-pointer uppercase"
          />
        </div>
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
