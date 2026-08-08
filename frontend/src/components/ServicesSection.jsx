import React from "react";

const services = [
  {
    id: "outstation",
    title: "Outstation Bookings",
    description:
      "Comfortable, affordable, and reliable rides for your out-of-town journeys. Travel with peace of mind.",
    icon: "🛣️",
    bgClass: "bg-linear-to-br from-blue-50/80 to-blue-100/80",
    borderClass: "border-blue-100",
    textClass: "text-blue-900",
    colSpan: "col-span-1 md:col-span-2 lg:col-span-2",
    minHeight: "min-h-[250px]"
  },
  {
    id: "shadi",
    title: "Shadi & Barat",
    description:
      "Premium fleets and spacious vehicles to make your special days grand.",
    icon: "🎉",
    bgClass: "bg-linear-to-br from-rose-50/80 to-rose-100/80",
    borderClass: "border-rose-100",
    textClass: "text-rose-900",
    colSpan: "col-span-1 md:col-span-1 lg:col-span-1",
    minHeight: "min-h-[250px]"
  },
  {
    id: "rentals",
    title: "Hourly Rentals",
    description:
      "Flexible bookings by the hour for errands, meetings, or sightseeing.",
    icon: "⏱️",
    bgClass: "bg-linear-to-br from-amber-50/80 to-amber-100/80",
    borderClass: "border-amber-100",
    textClass: "text-amber-900",
    colSpan: "col-span-1 md:col-span-1 lg:col-span-1",
    minHeight: "min-h-[250px]"
  },
  {
    id: "planning",
    title: "Trip Planning",
    description:
      "Customized itineraries and full-service travel planning for a stress-free vacation.",
    icon: "🗺️",
    bgClass: "bg-linear-to-br from-emerald-50/80 to-emerald-100/80",
    borderClass: "border-emerald-100",
    textClass: "text-emerald-900",
    colSpan: "col-span-1 md:col-span-2 lg:col-span-2",
    minHeight: "min-h-[250px]"
  },
];

export default function ServicesSection() {
  return (
    <section className="relative w-full pb-24 pt-32 mt-10">
      {/* 
        Smooth gradient fade: transparent at the top, solid white at the bottom (128px high).
        This merges the map background smoothly into this section.
      */}
      <div className="pointer-events-none absolute left-0 top-0 h-32 w-full bg-linear-to-b from-transparent to-white" />
      
      {/* Solid white background for the rest of the section starting right after the fade */}
      <div className="absolute inset-x-0 bottom-0 top-32 -z-10 bg-white" />

      <div className="relative z-10 mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mb-14 md:text-left">
          <h2 className="text-4xl font-extrabold tracking-tight text-gray-900 sm:text-5xl">
            More than just a ride
          </h2>
          <p className="mt-4 text-xl text-gray-600 max-w-2xl">
            Explore our premium services tailored for every journey. Whether it's a quick errand or a grand wedding, we've got you covered.
          </p>
        </div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          {services.map((service) => (
            <div
              key={service.id}
              className={`group relative overflow-hidden rounded-[2rem] border transition-all duration-300 hover:-translate-y-1 hover:shadow-xl ${service.bgClass} ${service.borderClass} ${service.colSpan} ${service.minHeight}`}
            >
              <div className="flex h-full flex-col justify-between p-8">
                <div className="flex items-start justify-between">
                  <div className="text-5xl drop-shadow-md transition-transform duration-300 group-hover:scale-110">
                    {service.icon}
                  </div>
                  <button className="flex h-12 w-12 items-center justify-center rounded-full bg-white text-gray-900 opacity-0 shadow-sm transition-all duration-300 group-hover:opacity-100 hover:bg-gray-50 hover:scale-105">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      className="h-6 w-6"
                    >
                      <path
                        fillRule="evenodd"
                        d="M12.97 3.97a.75.75 0 011.06 0l7.5 7.5a.75.75 0 010 1.06l-7.5 7.5a.75.75 0 11-1.06-1.06l6.22-6.22H3a.75.75 0 010-1.5h16.19l-6.22-6.22a.75.75 0 010-1.06z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </button>
                </div>
                <div className="mt-8">
                  <h3 className={`mb-3 text-2xl font-bold ${service.textClass}`}>
                    {service.title}
                  </h3>
                  <p className="text-base font-medium leading-relaxed text-gray-700/80">
                    {service.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
