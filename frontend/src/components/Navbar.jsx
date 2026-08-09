const Navbar = () => {
  return (
    <nav className="absolute top-8 left-1/2 z-50 flex w-full max-w-7xl -translate-x-1/2 items-center justify-between px-16">
      {/* Logo — full brand name */}
      <div className="flex flex-col">
        <span className="text-brand-primary text-[15px] font-black tracking-widest uppercase drop-shadow-sm">
          Hindustan
        </span>
        <span className="text-[13px] font-medium tracking-[0.18em] text-gray-500 uppercase">
          Tour &amp; Travels
        </span>
      </div>

      {/* Glass pill — links + CTA */}
      <div className="bg-gray-900 hidden items-center gap-6 rounded-full pl-7 pr-2 py-2 shadow-lg lg:flex">
        <a
          href="#services"
          className="text-sm font-medium text-white/70 transition-colors hover:text-white"
        >
          Services
        </a>
        <a
          href="#"
          className="text-sm font-medium text-white/70 transition-colors hover:text-white"
        >
          Partner with Us
        </a>
        <a
          href="#"
          className="text-sm font-medium text-white/70 transition-colors hover:text-white"
        >
          About
        </a>
        
        {/* Divider */}
        <div className="mx-2 h-4 w-px bg-white/20"></div>
        
        <a
          href="#"
          className="flex items-center gap-2 text-sm font-medium text-white/70 transition-colors hover:text-white"
        >
          Log in
        </a>

        {/* CTA */}
        <a 
          href="#booking"
          className="ml-2 rounded-full bg-white/95 px-5 py-2.5 text-sm font-bold text-gray-900 shadow-sm transition-all hover:scale-105 hover:bg-white"
        >
          Book Ride
        </a>
      </div>
    </nav>
  );
};

export default Navbar;
