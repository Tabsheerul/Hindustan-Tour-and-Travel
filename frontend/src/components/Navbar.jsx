import { Link } from "react-router-dom";
import logo from "../assets/logo.png";

const Navbar = () => {
  return (
    <nav className="absolute left-1/2 top-4 z-50 flex w-[calc(100%-2rem)] max-w-7xl -translate-x-1/2 items-center justify-between sm:top-6 sm:w-[calc(100%-3rem)] lg:top-8 lg:px-8">
      {/* Logo */}
      <Link to="/" className="flex items-center">
        <img src={logo} alt="Hindustan Tour & Travels" className="h-14 w-auto object-contain drop-shadow-md transition-all hover:scale-105 sm:h-16 lg:h-20" />
      </Link>

      {/* Glass pill — links + CTA */}
      <div className="bg-gray-900 hidden items-center gap-6 rounded-full pl-7 pr-2 py-2 shadow-lg lg:flex">
        <a
          href="#services"
          className="text-sm font-medium text-white/70 transition-colors hover:text-white"
        >
          Services
        </a>
        <Link
          to="/gallery"
          className="text-sm font-medium text-white/70 transition-colors hover:text-white"
        >
          Gallery
        </Link>
        <a
          href="#faq"
          className="text-sm font-medium text-white/70 transition-colors hover:text-white"
        >
          FAQs
        </a>
        <a
          href="#contact"
          className="text-sm font-medium text-white/70 transition-colors hover:text-white"
        >
          Contact
        </a>
        
        {/* Divider */}
        <div className="mx-2 h-4 w-px bg-white/20"></div>

        {/* CTA */}
        <Link 
          to="/booking"
          className="ml-2 rounded-full bg-white/95 px-5 py-2.5 text-sm font-bold text-gray-900 shadow-sm transition-all hover:scale-105 hover:bg-white"
        >
          Book Ride
        </Link>
      </div>
      <Link to="/booking" className="rounded-full bg-gray-900 px-4 py-2.5 text-xs font-bold text-white shadow-lg lg:hidden sm:px-5 sm:text-sm">
        Book a ride
      </Link>
    </nav>
  );
};

export default Navbar;
