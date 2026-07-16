import { useState } from "react";

const AutocompleteInput = ({
  label,
  icon,
  placeholder,
  value,
  onChange,
  onCoordinatesChange, // NEW: called with { lat, lng } when a place is selected
  apiKey,
  onGetCurrentLocation,
  isLoading,
}) => {
  const [suggestions, setSuggestions] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);

  const fetchPlaces = async (searchText) => {
    onChange(searchText);
    // Clear coordinates when user starts typing again
    if (onCoordinatesChange) onCoordinatesChange(null);

    if (searchText.length < 3) {
      setSuggestions([]);
      return;
    }

    try {
      const response = await fetch(
        `https://api.olamaps.io/places/v1/autocomplete?input=${searchText}&api_key=${apiKey}`,
      );
      const data = await response.json();

      if (data.predictions) {
        setSuggestions(data.predictions);
        setShowDropdown(true);
      }
    } catch (error) {
      console.error("Error fetching Ola Maps autocomplete:", error);
    }
  };

  // Called when user clicks a suggestion from the dropdown
  const handleSelectPlace = async (place) => {
    onChange(place.description);
    setShowDropdown(false);
    setSuggestions([]);

    // Geocode: convert the place name → lat/lng coordinates
    if (onCoordinatesChange && place.place_id) {
      try {
        const res = await fetch(
          `https://api.olamaps.io/places/v1/details?place_id=${place.place_id}&api_key=${apiKey}`,
        );
        const data = await res.json();
        const loc = data?.result?.geometry?.location;
        if (loc) {
          onCoordinatesChange({ lat: loc.lat, lng: loc.lng });
        }
      } catch (err) {
        console.error("Error geocoding place:", err);
      }
    }
  };

  return (
    <div className="relative flex flex-col gap-1.5">
      <div className="flex items-center justify-between pr-1 pb-1">
        <label className="pl-1 text-xs font-bold tracking-wider text-gray-600 uppercase">
          {label}
        </label>
        {isLoading && (
          <span className="animate-pulse text-xs font-semibold text-[#FF5E62]">
            Locating...
          </span>
        )}
      </div>
      <div className="group flex items-center gap-3 rounded-2xl border border-gray-300 bg-white px-4 py-3.5 shadow-sm transition-all focus-within:border-[#FF5E62]! focus-within:shadow-[0_0_0_3px_rgba(255,94,98,0.15)] hover:border-gray-400">
        {icon}
        <input
          type="text"
          placeholder={placeholder}
          value={value}
          onChange={(e) => fetchPlaces(e.target.value)}
          className="w-full bg-transparent text-base font-medium text-gray-900 placeholder-gray-500 outline-none"
        />
        {onGetCurrentLocation && (
          <button
            onClick={onGetCurrentLocation}
            title="Use Current Location"
            className="shrink-0 text-gray-400 transition-colors hover:text-[#FF5E62]"
            type="button"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="h-5 w-5"
            >
              <path
                fillRule="evenodd"
                d="M11.54 22.351l.07.04.028.016a.76.76 0 00.723 0l.028-.015.071-.041a16.975 16.975 0 001.144-.742 19.58 19.58 0 002.683-2.282c1.944-1.99 3.963-4.98 3.963-8.827a8.25 8.25 0 00-16.5 0c0 3.846 2.02 6.837 3.963 8.827a19.58 19.58 0 002.682 2.282 16.975 16.975 0 001.145.742zM12 13.5a3 3 0 100-6 3 3 0 000 6z"
                clipRule="evenodd"
              />
            </svg>
          </button>
        )}
      </div>

      {/* Dropdown UI */}
      {showDropdown && suggestions.length > 0 && (
        <div className="absolute top-[85px] left-0 z-50 max-h-60 w-full overflow-hidden overflow-y-auto rounded-xl border border-gray-200 bg-white shadow-lg">
          {suggestions.map((place, index) => (
            <button
              key={index}
              onClick={() => handleSelectPlace(place)}
              className="w-full truncate border-b border-gray-100 px-4 py-3.5 text-left text-base font-medium text-gray-800 transition-colors last:border-0 hover:bg-gray-100"
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
