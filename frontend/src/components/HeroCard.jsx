import React from 'react';

const HeroCard = () => {
  return (
    <div className="flex flex-col md:flex-row w-screen h-screen bg-white overflow-hidden relative">
      {/* Left Orange Section */}
      <div className="w-full md:w-1/2 h-1/2 md:h-full bg-gradient-to-br from-[#FF9933] to-[#FF5E62] rounded-b-[100px] md:rounded-none md:rounded-r-[200px] shadow-[10px_0_20px_rgba(0,0,0,0.05)] z-10">
        {/* Content for the orange section can go here */}
      </div>

      {/* Right White Section with Button */}
      <div className="w-full md:w-1/2 h-1/2 md:h-full relative">
        <div className="absolute top-[20px] md:top-[30px] right-1/2 md:right-[50px] translate-x-1/2 md:translate-x-0 w-[250px] md:w-[300px] h-[45px] bg-gradient-to-r from-[#4b4b4b] to-[#1a1a1a] rounded-[50px] shadow-[0_4px_10px_rgba(0,0,0,0.2)]">
          {/* Button content can go here */}
        </div>
      </div>
    </div>
  );
};

export default HeroCard;
