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
            <div className="flex space-x-6">
              {/* Social Icons (SVGs) */}
              <a href="https://wa.me/919759654651" target="_blank" rel="noopener noreferrer" className="text-gray-400 transition-colors hover:text-[#25D366]">
                <span className="sr-only">WhatsApp</span>
                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
              </a>
            </div>
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
