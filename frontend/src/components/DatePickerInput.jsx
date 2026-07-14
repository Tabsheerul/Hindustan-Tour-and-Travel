import { useState, useRef, useEffect } from 'react';
import { DayPicker } from 'react-day-picker';
import { format } from 'date-fns';
import 'react-day-picker/style.css';

const DatePickerInput = ({ date, setDate }) => {
  const [isOpen, setIsOpen] = useState(false);
  const wrapperRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleSelect = (selectedDate) => {
    setDate(selectedDate);
    setIsOpen(false);
  };

  return (
    <div className="flex flex-col gap-1.5" ref={wrapperRef}>
      <label className="text-[10px] font-bold tracking-[0.2em] text-gray-400 uppercase pl-1">
        Travel Date
      </label>
      <div className="relative">
        {/* Input Trigger */}
        <div 
          onClick={() => setIsOpen(!isOpen)}
          className={`group flex items-center gap-3 border rounded-2xl px-4 py-3.5 transition-all bg-white cursor-pointer ${
            isOpen 
              ? 'border-[#FF5E62] shadow-[0_0_0_3px_rgba(255,94,98,0.08)]' 
              : 'border-gray-200 hover:border-gray-300'
          }`}
        >
          <span className={`text-lg shrink-0 transition-colors ${isOpen ? 'text-[#FF5E62]' : 'text-gray-400 group-hover:text-[#FF5E62]'}`}>
            📅
          </span>
          <span className={`w-full text-sm font-medium ${date ? 'text-gray-800' : 'text-gray-400'}`}>
            {date ? format(date, 'MMM dd, yyyy') : 'Select date'}
          </span>
        </div>

        {/* Calendar Popover */}
        {isOpen && (
          <div className="absolute top-full left-0 mt-2 z-50 bg-white border border-gray-100 rounded-2xl shadow-xl p-2 animate-in fade-in slide-in-from-top-2 duration-200">
            <style>{`
              .rdp-day_button {
                border-radius: 9999px !important;
                transition: all 0.2s ease-in-out;
              }
              .rdp-day_button:hover {
                background-color: #f3f4f6 !important;
              }
              .rdp-today .rdp-day_button {
                border: 2px solid #FF5E62 !important;
                color: #FF5E62 !important;
                font-weight: bold !important;
              }
              .rdp-selected .rdp-day_button {
                background-color: #FF5E62 !important;
                color: white !important;
                border: none !important;
              }
              .rdp-selected.rdp-today .rdp-day_button {
                background-color: #FF5E62 !important;
                color: white !important;
              }
            `}</style>
            <DayPicker
              mode="single"
              selected={date}
              onSelect={handleSelect}
              className="font-sans"
              styles={{
                root: {
                  '--rdp-accent-color': '#FF5E62',
                  '--rdp-background-color': '#fff5f5',
                  '--rdp-font-family': 'inherit',
                }
              }}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default DatePickerInput;
