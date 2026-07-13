import { useState } from 'react';

const popularDestinations = [
  'Delhi', 'Agra', 'Jaipur', 'Varanasi', 'Mumbai', 'Goa', 'Kerala', 'Manali',
];

const BookingSection = () => {
  const [pickup, setPickup] = useState('');
  const [destination, setDestination] = useState('');
  const [date, setDate] = useState('');

  const handleSwap = () => {
    setPickup(destination);
    setDestination(pickup);
  };

  return (
    <section className="w-full bg-white py-24 px-16 max-w-6xl mx-auto">

      {/* Section Label */}
      <span className="text-xs font-semibold tracking-[0.2em] text-[#FF5E62] uppercase">
        Plan Your Journey
      </span>

      {/* Heading */}
      <h2 className="text-4xl font-bold text-gray-900 tracking-tight mt-3 mb-12">
        Where would you like to go?
      </h2>

      {/* Booking Card */}
      <div className="bg-white border border-gray-100 rounded-3xl shadow-[0_8px_40px_rgba(0,0,0,0.06)] p-8 flex flex-col gap-6">

        {/* Inputs Row */}
        <div className="flex flex-col md:flex-row items-stretch gap-4 relative">

          {/* Pickup Input */}
          <div className="flex-1 flex flex-col gap-1.5">
            <label className="text-[10px] font-bold tracking-[0.2em] text-gray-400 uppercase pl-1">
              Pickup Point
            </label>
            <div className="flex items-center gap-3 border border-gray-200 rounded-2xl px-4 py-3.5 focus-within:border-[#FF5E62] focus-within:shadow-[0_0_0_3px_rgba(255,94,98,0.08)] transition-all">
              <span className="text-[#FF5E62] text-lg shrink-0">📍</span>
              <input
                type="text"
                placeholder="Enter pickup city or location"
                value={pickup}
                onChange={(e) => setPickup(e.target.value)}
                className="w-full text-sm text-gray-800 placeholder-gray-300 outline-none bg-transparent"
              />
            </div>
          </div>

          {/* Swap Button */}
          <button
            onClick={handleSwap}
            title="Swap pickup and destination"
            className="self-end mb-1 mx-auto md:mx-0 w-10 h-10 rounded-full bg-gray-50 border border-gray-200 flex items-center justify-center text-gray-400 hover:bg-[#FF5E62] hover:text-white hover:border-[#FF5E62] hover:rotate-180 transition-all duration-300 shrink-0"
          >
            ⇄
          </button>

          {/* Destination Input */}
          <div className="flex-1 flex flex-col gap-1.5">
            <label className="text-[10px] font-bold tracking-[0.2em] text-gray-400 uppercase pl-1">
              Destination
            </label>
            <div className="flex items-center gap-3 border border-gray-200 rounded-2xl px-4 py-3.5 focus-within:border-[#FF5E62] focus-within:shadow-[0_0_0_3px_rgba(255,94,98,0.08)] transition-all">
              <span className="text-[#FF9933] text-lg shrink-0">🏁</span>
              <input
                type="text"
                placeholder="Enter your destination"
                value={destination}
                onChange={(e) => setDestination(e.target.value)}
                className="w-full text-sm text-gray-800 placeholder-gray-300 outline-none bg-transparent"
              />
            </div>
          </div>

          {/* Date Input */}
          <div className="flex-1 flex flex-col gap-1.5">
            <label className="text-[10px] font-bold tracking-[0.2em] text-gray-400 uppercase pl-1">
              Travel Date
            </label>
            <div className="flex items-center gap-3 border border-gray-200 rounded-2xl px-4 py-3.5 focus-within:border-[#FF5E62] focus-within:shadow-[0_0_0_3px_rgba(255,94,98,0.08)] transition-all">
              <span className="text-gray-400 text-lg shrink-0">📅</span>
              <input
                type="date"
                value={date}
                
                onChange={(e) => setDate(e.target.value)}
                className="w-full text-sm text-gray-800 outline-none bg-transparent cursor-pointer uppercase"
              />
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="w-full h-px bg-gray-100"></div>

        {/* Bottom Row — Popular chips + CTA */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">

          {/* Popular destinations */}
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-xs text-gray-400 font-medium mr-1">Popular:</span>
            {popularDestinations.map((city) => (
              <button
                key={city}
                onClick={() => setDestination(city)}
                className="text-xs font-medium text-gray-500 bg-gray-50 border border-gray-200 px-3 py-1.5 rounded-full hover:bg-[#FF5E62] hover:text-white hover:border-[#FF5E62] transition-all"
              >
                {city}
              </button>
            ))}
          </div>

          {/* Search CTA */}
          <button className="shrink-0 flex items-center gap-2 bg-gray-900 text-white text-sm font-semibold px-7 py-3.5 rounded-full hover:bg-[#FF5E62] transition-colors duration-300">
            <span>Book Trip</span>
            <span className="text-base leading-none">→</span>
          </button>
        </div>
      </div>
    </section>
  );
};

export default BookingSection;
