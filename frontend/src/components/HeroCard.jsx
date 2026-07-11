import React from 'react';
import './HeroCard.css';

const HeroCard = () => {
  return (
    <div className="hero-container">
      {/* Left Orange Section */}
      <div className="hero-orange-section">
        {/* Content for the orange section can go here */}
      </div>

      {/* Right White Section with Button */}
      <div className="hero-white-section">
        <div className="top-right-pill">
          {/* Button content can go here */}
        </div>
      </div>
    </div>
  );
};

export default HeroCard;
