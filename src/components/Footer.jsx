import React from "react";
import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="mx-auto max-w-7xl px-5 pb-8 pt-12 sm:px-8 sm:pt-16 lg:px-8 lg:pt-24">
        <div className="xl:grid xl:grid-cols-3 xl:gap-8">
          
          {/* Brand & Description */}
          <div className="space-y-8 xl:col-span-1">
            <div className="flex items-center gap-3">
              <span className="flex h-10 w-10 items-center justify-center rounded-full bg-linear-to-br from-[#FF5E62] to-[#FF9933] text-white font-bold text-xl shadow-lg">
                H
              </span>
              <span className="text-2xl font-bold tracking-tight text-white">
                Hindustan Tours
              </span>
            </div>
            <p className="text-base leading-6 text-gray-400 max-w-xs">
              Firozabad's trusted tour & travels agency since 2010. 4.9★ rated on JustDial · MSME Certified · Open daily until 11 PM.
            </p>
          </div>
          
          {/* Links Sections */}
          <div className="mt-16 grid grid-cols-2 gap-8 xl:col-span-2 xl:mt-0">
            <div className="md:grid md:grid-cols-2 md:gap-8">
              <div>
                <h3 className="text-sm font-semibold leading-6 text-white uppercase tracking-wider">Services</h3>
                <ul className="mt-6 space-y-4">
                  <li><a href="#services" className="text-sm leading-6 text-gray-400 transition-colors hover:text-[#FF5E62]">Outstation Cabs</a></li>
                  <li><a href="#services" className="text-sm leading-6 text-gray-400 transition-colors hover:text-[#FF5E62]">Hourly Rentals</a></li>
                  <li><a href="#services" className="text-sm leading-6 text-gray-400 transition-colors hover:text-[#FF5E62]">Shadi & Barat</a></li>
                  <li><a href="#services" className="text-sm leading-6 text-gray-400 transition-colors hover:text-[#FF5E62]">Trip Planning</a></li>
                </ul>
              </div>
              <div className="mt-10 md:mt-0">
                <h3 className="text-sm font-semibold leading-6 text-white uppercase tracking-wider">Quick Links</h3>
                <ul className="mt-6 space-y-4">
                  <li><Link to="/booking" className="text-sm leading-6 text-gray-400 transition-colors hover:text-[#FF5E62]">Book a Ride</Link></li>
                  <li><a href="#faq" className="text-sm leading-6 text-gray-400 transition-colors hover:text-[#FF5E62]">FAQs</a></li>
                  <li><a href="#contact" className="text-sm leading-6 text-gray-400 transition-colors hover:text-[#FF5E62]">Contact Us</a></li>
                </ul>
              </div>
            </div>
            
            <div className="md:grid md:grid-cols-2 md:gap-8">
              <div>
                <h3 className="text-sm font-semibold leading-6 text-white uppercase tracking-wider">Contact</h3>
                <ul className="mt-6 space-y-4">
                  <li><a href="tel:+918401141577" className="text-sm leading-6 text-gray-400 transition-colors hover:text-[#FF5E62]">+91 84011 41577</a></li>
                  <li><a href="tel:+919759654651" className="text-sm leading-6 text-gray-400 transition-colors hover:text-[#FF5E62]">+91 97596 54651</a></li>
                  <li><a href="tel:+917300669318" className="text-sm leading-6 text-gray-400 transition-colors hover:text-[#FF5E62]">+91 73006 69318</a></li>
                  <li><a href="tel:+919528841152" className="text-sm leading-6 text-gray-400 transition-colors hover:text-[#FF5E62]">+91 95288 41152</a></li>
                </ul>
              </div>
              <div className="mt-10 md:mt-0">
                <h3 className="text-sm font-semibold leading-6 text-white uppercase tracking-wider">Office</h3>
                <div className="mt-6 text-sm leading-6 text-gray-400 space-y-1">
                  <p>Opp. Maula Ali Inter College</p>
                  <p>Rasulpur Road, Rasulpur</p>
                  <p>Firozabad, UP 283203</p>
                </div>
              </div>
            </div>
          </div>
          
        </div>
        
        {/* Bottom Banner */}
        <div className="mt-16 border-t border-gray-800 pt-8 sm:mt-20 md:flex md:items-center md:justify-between lg:mt-24">
          <p className="text-sm leading-5 text-gray-400 md:order-1 md:mt-0">
            &copy; {new Date().getFullYear()} Hindustan Tour & Travels, Firozabad. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
