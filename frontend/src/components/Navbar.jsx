const Navbar = () => {
  return (
    <nav className="absolute top-8 w-full max-w-7xl left-1/2 -translate-x-1/2 z-50 px-16 flex justify-between items-center">

      {/* Logo — full brand name */}
      <div className="flex flex-col">
          <span className="text-[15px] font-black tracking-widest text-brand-primary uppercase drop-shadow-sm">Hindustan</span>
          <span className="text-[13px] font-medium tracking-[0.18em] text-gray-500 uppercase">Tour &amp; Travels</span>
      </div>

      {/* Glass pill — links + CTA */}
      <div className="hidden md:flex items-center glass-dark px-6 py-3 rounded-full gap-7 shadow-lg">
        <a href="#" className="text-sm font-medium text-white/90 hover:text-white transition-colors drop-shadow-md">Home</a>
        <a href="#" className="text-sm font-medium text-white/60 hover:text-white transition-colors">Explore</a>
        <a href="#" className="text-sm font-medium text-white/60 hover:text-white transition-colors">Offers</a>
        <a href="#" className="text-sm font-medium text-white/60 hover:text-white transition-colors">About</a>
        {/* Divider */}
        <div className="w-px h-4 bg-white/20"></div>
        {/* CTA */}
        <button className="text-sm font-semibold text-gray-900 bg-white/90 backdrop-blur-md px-4 py-1.5 rounded-full hover:bg-white hover:scale-105 transition-all shadow-sm">
          Book Now
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
