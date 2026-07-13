import heroBanner from '../assets/hero-banner.png';

const HeroCard = () => {
  return (
    <div className="w-screen min-h-screen bg-white flex items-center justify-between px-16 py-32 max-w-6xl mx-auto relative gap-16">

      {/* Left — Text Content with lots of breathing room */}
      <div className="flex flex-col gap-6 max-w-lg z-10">
        {/* Tiny label */}
        <span className="text-xs font-semibold tracking-[0.2em] text-[#FF5E62] uppercase">
          Explore India
        </span>

        {/* Headline */}
        <h1 className="text-6xl font-bold text-gray-900 leading-tight tracking-tight">
          Travel <br />
          <span className="text-gray-300">without</span> <br />
          limits.
        </h1>

        {/* Subtext */}
        <p className="text-base text-gray-400 leading-relaxed max-w-xs">
          Discover the heart of India with handcrafted tours, personalised for every traveller.
        </p>

        {/* CTA */}
        <div className="flex items-center gap-4 mt-4">
          <button className="px-7 py-3 bg-gray-900 text-white text-sm font-semibold rounded-full hover:bg-gray-700 transition-colors">
            Book a Tour
          </button>
          <button className="text-sm font-medium text-gray-500 hover:text-gray-800 transition-colors flex items-center gap-1">
            View Destinations
            <span className="text-lg leading-none">→</span>
          </button>
        </div>
      </div>

      {/* Right — Small floating image card, not dominating */}
      <div className="hidden md:block relative flex-shrink-0">
        {/* Subtle background blob */}
        <div className="absolute -inset-6 bg-orange-50 rounded-[3rem] -z-10"></div>

        {/* Image Card */}
          <img
            src={heroBanner}
            alt="Tour and Travels Banner"
            className="h-[420px]"
          />

        {/* Small floating badge */}
        <div className="absolute -bottom-4 -left-8 bg-white px-5 py-3 rounded-2xl shadow-[0_8px_30px_rgba(0,0,0,0.08)] flex items-center gap-3">
          <div className="w-8 h-8 bg-[#FF5E62] rounded-full flex items-center justify-center text-white text-sm">✈</div>
          <div>
            <p className="text-xs font-bold text-gray-900">500+ Tours</p>
            <p className="text-xs text-gray-400">across India</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroCard;
