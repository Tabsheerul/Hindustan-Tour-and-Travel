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
      <div className="glass-dark hidden items-center gap-7 rounded-full px-6 py-3 shadow-lg md:flex">
        <a
          href="#"
          className="text-sm font-medium text-white/90 drop-shadow-md transition-colors hover:text-white"
        >
          Home
        </a>
        <a
          href="#"
          className="text-sm font-medium text-white/60 transition-colors hover:text-white"
        >
          Explore
        </a>
        <a
          href="#"
          className="text-sm font-medium text-white/60 transition-colors hover:text-white"
        >
          Offers
        </a>
        <a
          href="#"
          className="text-sm font-medium text-white/60 transition-colors hover:text-white"
        >
          About
        </a>
        {/* Divider */}
        <div className="h-4 w-px bg-white/20"></div>
        {/* CTA */}
        <button className="rounded-full bg-white/90 px-4 py-1.5 text-sm font-semibold text-gray-900 shadow-sm backdrop-blur-md transition-all hover:scale-105 hover:bg-white">
          Book Now
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
