import { useState } from "react";
import { Link } from "react-router-dom";
import logo from "../assets/logo.png";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const closeMenu = () => setMenuOpen(false);

  return (
    <nav className="absolute inset-x-0 top-0 z-50 mx-auto w-full max-w-7xl px-4 pt-4 sm:px-6 sm:pt-6 lg:px-8">
      <div className="flex items-center justify-between">
        {/* The navbar itself stays completely transparent, so the hero remains open. */}
        <Link to="/" className="flex items-center group" onClick={closeMenu}>
          <img
            src={logo}
            alt="Hindustan Tour & Travels"
            className="h-[60px] pt-3.5 w-auto object-contain drop-shadow-sm transition-transform duration-500 group-hover:scale-105 sm:h-[70px]"
          />
        </Link>

        <div className="hidden items-center gap-8 lg:flex">
          {[
            { name: "Services", href: "#services", isLink: false },
            { name: "Gallery", href: "/gallery", isLink: true },
            { name: "FAQs", href: "#faq", isLink: false },
            { name: "Contact", href: "#contact", isLink: false },
          ].map((item) =>
            item.isLink ? (
              <Link
                key={item.name}
                to={item.href}
                className="relative text-sm font-medium tracking-wide text-gray-700 transition-colors hover:text-brand-primary after:absolute after:-bottom-1.5 after:left-0 after:h-[2px] after:w-0 after:bg-brand-primary after:transition-all after:duration-300 hover:after:w-full"
              >
                {item.name}
              </Link>
            ) : (
              <a
                key={item.name}
                href={item.href}
                className="relative text-sm font-medium tracking-wide text-gray-700 transition-colors hover:text-brand-primary after:absolute after:-bottom-1.5 after:left-0 after:h-[2px] after:w-0 after:bg-brand-primary after:transition-all after:duration-300 hover:after:w-full"
              >
                {item.name}
              </a>
            )
          )}

          <Link
            to="/booking"
            className="group relative ml-4 inline-flex items-center justify-center overflow-hidden rounded-full bg-brand-primary px-7 py-2.5 text-sm font-semibold tracking-wide text-white shadow-lg shadow-brand-primary/30 transition-all duration-300 hover:scale-105 hover:shadow-brand-primary/50"
          >
            <span className="absolute inset-0 bg-white/20 opacity-0 transition-opacity duration-300 group-hover:opacity-100"></span>
            <span className="relative">Book Ride</span>
          </Link>
        </div>

        <div className="flex items-center gap-3 lg:hidden">
          <Link
            to="/booking"
            className="group relative inline-flex items-center justify-center overflow-hidden rounded-full bg-brand-primary px-5 py-2 text-xs font-semibold tracking-wide text-white shadow-md shadow-brand-primary/30 transition-all hover:scale-105"
          >
            <span className="absolute inset-0 bg-white/20 opacity-0 transition-opacity group-hover:opacity-100"></span>
            <span className="relative">Book</span>
          </Link>
          <button
            type="button"
            aria-expanded={menuOpen}
            aria-label={menuOpen ? "Close navigation menu" : "Open navigation menu"}
            onClick={() => setMenuOpen(!menuOpen)}
            className="flex h-10 w-10 items-center justify-center rounded-full bg-white/40 border border-white/60 text-gray-800 shadow-sm backdrop-blur-md transition-all hover:bg-white/70"
          >
            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
              {menuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>
      </div>

      {menuOpen && (
        <div className="absolute right-4 top-20 flex w-56 flex-col items-stretch gap-1 rounded-2xl border border-white/50 bg-white/80 p-3 shadow-2xl shadow-black/10 backdrop-blur-xl lg:hidden z-50">
          {[
            { name: "Services", href: "#services", isLink: false },
            { name: "Gallery", href: "/gallery", isLink: true },
            { name: "FAQs", href: "#faq", isLink: false },
            { name: "Contact", href: "#contact", isLink: false },
          ].map((item) =>
            item.isLink ? (
              <Link
                key={item.name}
                to={item.href}
                onClick={closeMenu}
                className="rounded-xl px-4 py-3 text-sm font-medium text-gray-700 transition-colors hover:bg-white/80 hover:text-brand-primary"
              >
                {item.name}
              </Link>
            ) : (
              <a
                key={item.name}
                href={item.href}
                onClick={closeMenu}
                className="rounded-xl px-4 py-3 text-sm font-medium text-gray-700 transition-colors hover:bg-white/80 hover:text-brand-primary"
              >
                {item.name}
              </a>
            )
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
