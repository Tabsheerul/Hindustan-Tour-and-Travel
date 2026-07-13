const Navbar = () => {
  return (
    <nav className="absolute top-8 w-full max-w-6xl left-1/2 -translate-x-1/2 z-50 px-16 flex justify-between items-center">

      {/* Logo — full brand name */}
      <div className="flex flex-col">
          <span className="text-[15px] font-black tracking-widest text-[#FF5E62] uppercase">Hindustan</span>
          <span className="text-[13px] font-medium tracking-[0.18em] text-gray-400 uppercase">Tour &amp; Travels</span>
      </div>

      {/* Black pill — links + CTA */}
      <div className="hidden md:flex items-center bg-gray-900 px-6 py-3 rounded-full gap-7">
        <a href="#" className="text-sm font-medium text-white/90 hover:text-white transition-colors">Home</a>
        <a href="#" className="text-sm font-medium text-white/60 hover:text-white transition-colors">Explore</a>
        <a href="#" className="text-sm font-medium text-white/60 hover:text-white transition-colors">Offers</a>
        <a href="#" className="text-sm font-medium text-white/60 hover:text-white transition-colors">About</a>
        {/* Divider */}
        <div className="w-px h-4 bg-white/20"></div>
        {/* CTA */}
        <button className="text-sm font-semibold text-gray-900 bg-white px-4 py-1.5 rounded-full hover:bg-gray-100 transition-colors">
          Book Now
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
