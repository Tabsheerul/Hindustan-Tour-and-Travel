import React from "react";
import { Link, useNavigate } from "react-router-dom";

// Import generated 3D images
import outstationImg from "../assets/service_outstation_cab.png";
import weddingImg from "../assets/service_wedding_car.png";
import rentalImg from "../assets/service_hourly_rental.png";
import planningImg from "../assets/service_trip_planning_car.png";

const services = [
  {
    id: "outstation",
    title: "Outstation Cabs",
    description: "Book affordable outstation cabs from Firozabad to Agra, Delhi, Jaipur, Mathura & beyond.",
    image: outstationImg,
  },
  {
    id: "rentals",
    title: "Hourly Rentals",
    description: "Need a cab for a few hours? Hire by the hour for local errands, meetings, or sightseeing near Firozabad.",
    image: rentalImg,
  },
  {
    id: "planning",
    title: "Trip Planning",
    description: "From Firozabad to anywhere in India — we plan your itinerary, hotels, and transport end-to-end.",
    image: planningImg,
  },
  {
    id: "shadi",
    title: "Shadi Rental",
    description: "Premium decorated cars & spacious vehicles for weddings, barats, and special occasions in Firozabad.",
    image: weddingImg,
  },
];

export default function ServicesSection() {
  const navigate = useNavigate();

  return (
    <section id="services" className="relative w-full pt-12 pb-32">
      {/* Smooth fade from map background to solid white */}
      {/* 
        The top 32px has a gradient that goes from transparent (showing the map behind) 
        to solid white. 
        This merges the map background smoothly into this section.
      */}
      <div className="pointer-events-none absolute left-0 top-0 h-32 w-full bg-linear-to-b from-transparent to-white" />
      
      {/* Solid white background for the rest of the section starting right after the fade */}
      <div className="absolute inset-x-0 bottom-0 top-32 -z-10 bg-white" />

      <div className="relative z-10 mx-auto max-w-7xl px-5 pt-12 sm:px-8 sm:pt-16 lg:px-8 lg:pt-18">
        <h2 className="mb-8 text-3xl font-bold tracking-tight text-gray-900 md:mb-10 md:text-4xl">
          Our Services in Firozabad
        </h2>

        {/* Clean, business-standard grid */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-2">
          {services.map((service) => (
            <div
              key={service.id}
              onClick={() => navigate('/booking', { state: { serviceType: 'Cars' } })}
              className="group relative flex min-h-[280px] flex-col justify-between overflow-hidden rounded-[1.5rem] bg-[#F5F5F5] p-6 transition-all hover:bg-[#EAEAEA] sm:p-8 md:min-h-[240px]"
            >
              <div className="relative z-10 max-w-[68%] sm:max-w-[65%]">
                <h3 className="mb-3 text-xl font-bold text-gray-900 sm:text-2xl">
                  {service.title}
                </h3>
                <p className="text-[15px] font-medium leading-relaxed text-gray-600">
                  {service.description}
                </p>
              </div>


              
              {/* Prominent Image perfectly positioned on the right */}
              <div className="absolute bottom-0 right-0 h-full w-[45%] pointer-events-none">
                <img 
                  src={service.image} 
                  alt={service.title} 
                  className="absolute bottom-4 right-0 h-[85%] w-full object-contain object-right-bottom mix-blend-multiply transition-transform duration-500 group-hover:scale-110" 
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
