import { useState } from 'react';

const AutocompleteInput = ({ label, icon, placeholder, value, onChange, apiKey, onGetCurrentLocation, isLoading }) => {
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
      <div className="flex justify-between items-center pr-1 pb-1">
        <label className="text-xs font-bold tracking-wider text-gray-600 uppercase pl-1">
          {label}
        </label>
        {isLoading && <span className="text-xs font-semibold text-[#FF5E62] animate-pulse">Locating...</span>}
      </div>
      <div className="flex items-center gap-3 border border-gray-300 hover:border-gray-400 rounded-2xl px-4 py-3.5 focus-within:!border-[#FF5E62] focus-within:shadow-[0_0_0_3px_rgba(255,94,98,0.15)] transition-all bg-white group shadow-sm">
        {icon}
        <input
          type="text"
          placeholder={placeholder}
          value={value}
          onChange={(e) => fetchPlaces(e.target.value)}
          className="w-full text-base font-medium text-gray-900 placeholder-gray-500 outline-none bg-transparent"
        />
        {onGetCurrentLocation && (
          <button 
            onClick={onGetCurrentLocation}
            title="Use Current Location"
            className="text-gray-400 hover:text-[#FF5E62] transition-colors shrink-0"
            type="button"
          >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
              <path fillRule="evenodd" d="M11.54 22.351l.07.04.028.016a.76.76 0 00.723 0l.028-.015.071-.041a16.975 16.975 0 001.144-.742 19.58 19.58 0 002.683-2.282c1.944-1.99 3.963-4.98 3.963-8.827a8.25 8.25 0 00-16.5 0c0 3.846 2.02 6.837 3.963 8.827a19.58 19.58 0 002.682 2.282 16.975 16.975 0 001.145.742zM12 13.5a3 3 0 100-6 3 3 0 000 6z" clipRule="evenodd" />
            </svg>
          </button>
        )}
      </div>

      {/* Dropdown UI */}
      {showDropdown && suggestions.length > 0 && (
        <div className="absolute top-[85px] left-0 w-full bg-white border border-gray-200 rounded-xl shadow-lg z-50 overflow-hidden max-h-60 overflow-y-auto">
          {suggestions.map((place, index) => (
            <button
              key={index}
              onClick={() => handleSelectPlace(place.description)}
              className="w-full text-left px-4 py-3.5 text-base text-gray-800 font-medium hover:bg-gray-100 border-b border-gray-100 last:border-0 truncate transition-colors"
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
