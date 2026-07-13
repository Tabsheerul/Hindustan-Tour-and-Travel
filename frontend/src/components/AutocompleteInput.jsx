import { useState } from 'react';

const AutocompleteInput = ({ label, icon, placeholder, value, onChange, apiKey }) => {
  const [suggestions, setSuggestions] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);

  const fetchPlaces = async (searchText) => {
    onChange(searchText);

    if (searchText.length < 3) {
      setSuggestions([]);
      return;
    }

    try {
      const response = await fetch(
        `https://api.olamaps.io/places/v1/autocomplete?input=${searchText}&api_key=${apiKey}`
      );
      const data = await response.json();
      
      if (data.predictions) {
        setSuggestions(data.predictions);
        setShowDropdown(true);
      }
    } catch (error) {
      console.error("Error fetching Ola Maps:", error);
    }
  };

  const handleSelectPlace = (placeName) => {
    onChange(placeName);
    setShowDropdown(false);
  };

  return (
    <div className="flex flex-col gap-1.5 relative">
      <label className="text-[10px] font-bold tracking-[0.2em] text-gray-400 uppercase pl-1">
        {label}
      </label>
      <div className="flex items-center gap-3 border border-gray-200 rounded-2xl px-4 py-3.5 focus-within:border-[#FF5E62] focus-within:shadow-[0_0_0_3px_rgba(255,94,98,0.08)] transition-all bg-white">
        {icon}
        <input
          type="text"
          placeholder={placeholder}
          value={value}
          onChange={(e) => fetchPlaces(e.target.value)}
          className="w-full text-sm text-gray-800 placeholder-gray-300 outline-none bg-transparent"
        />
      </div>

      {/* Dropdown UI */}
      {showDropdown && suggestions.length > 0 && (
        <div className="absolute top-[80px] left-0 w-full bg-white border border-gray-100 rounded-xl shadow-[0_10px_40px_rgba(0,0,0,0.08)] z-50 overflow-hidden max-h-60 overflow-y-auto">
          {suggestions.map((place, index) => (
            <button
              key={index}
              onClick={() => handleSelectPlace(place.description)}
              className="w-full text-left px-4 py-3 text-sm text-gray-700 hover:bg-gray-50 border-b border-gray-50 last:border-0 truncate"
              title={place.description}
            >
              {place.description}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default AutocompleteInput;
