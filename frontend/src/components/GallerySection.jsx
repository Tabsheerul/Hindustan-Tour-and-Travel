import React, { useState } from "react";

// Gallery images — our fleet & trip photos
import imgErtiga from "../assets/gallery_ertiga.png";
import imgKiaCarens from "../assets/gallery_kia_carens.png";
import imgTempo from "../assets/gallery_tempo.png";
import imgWedding from "../assets/gallery_wedding.png";
import imgTajMahal from "../assets/gallery_tajmahal.png";
import imgPassengers from "../assets/gallery_passengers.png";

const GALLERY_ITEMS = [
  {
    id: "ertiga",
    src: imgErtiga,
    title: "Maruti Ertiga",
    category: "Fleet",
    desc: "Available in white, brown, blue, silver & more · 6 seater · AC · Perfect for family trips",
  },
  {
    id: "kia",
    src: imgKiaCarens,
    title: "KIA Carens 2023",
    category: "Fleet",
    desc: "2023 model · White/black · Premium family SUV · 6-7 seater",
  },
  {
    id: "tempo",
    src: imgTempo,
    title: "Tempo Traveller",
    category: "Fleet",
    desc: "12-seater · Ideal for group tours, pilgrimages & corporate travel",
  },
  {
    id: "wedding",
    src: imgWedding,
    title: "Wedding & Barat",
    category: "Events",
    desc: "Premium decorated vehicles · Floral arrangements · Luxury sedans & SUVs for your special day",
  },
  {
    id: "tajmahal",
    src: imgTajMahal,
    title: "Agra Day Trip",
    category: "Destinations",
    desc: "Taj Mahal is just ~40 km from Firozabad · Full-day Agra tour package available",
  },
  {
    id: "passengers",
    src: imgPassengers,
    title: "Happy Travellers",
    category: "Experiences",
    desc: "Comfortable rides · Professional drivers · 4.9★ rated by 380+ customers on JustDial",
  },
];

const CATEGORIES = ["All", "Fleet", "Events", "Destinations", "Experiences"];

export default function GallerySection() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [lightbox, setLightbox] = useState(null); // holds the item to show in lightbox

  const filtered =
    activeCategory === "All"
      ? GALLERY_ITEMS
      : GALLERY_ITEMS.filter((item) => item.category === activeCategory);

  return (
    <section id="gallery" className="w-full bg-white py-24">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">

        {/* Header */}
        <div className="mb-12 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div>
            <span className="text-sm font-bold uppercase tracking-widest text-[#FF5E62]">
              Our Fleet & Gallery
            </span>
            <h2 className="mt-3 text-4xl font-extrabold tracking-tight text-gray-900 sm:text-5xl">
              See what we offer
            </h2>
            <p className="mt-4 max-w-xl text-lg leading-relaxed text-gray-600">
              From compact sedans to spacious buses — explore our fleet, event cars, and destination trips.
            </p>
          </div>

          {/* Category Filter Pills */}
          <div className="flex flex-wrap gap-2">
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`rounded-full px-5 py-2 text-sm font-semibold transition-all duration-200 ${
                  activeCategory === cat
                    ? "bg-gray-900 text-white shadow-md"
                    : "border border-gray-200 bg-white text-gray-600 hover:border-gray-400 hover:text-gray-900"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((item) => (
            <div
              key={item.id}
              onClick={() => setLightbox(item)}
              className="group relative cursor-pointer overflow-hidden rounded-[1.5rem] bg-gray-100 shadow-sm transition-all duration-300 hover:shadow-xl hover:-translate-y-1"
            >
              {/* Image */}
              <div className="relative h-56 w-full overflow-hidden">
                <img
                  src={item.src}
                  alt={item.title}
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                {/* Gradient overlay on hover */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                {/* Category pill */}
                <span className="absolute top-4 left-4 rounded-full bg-white/90 px-3 py-1 text-xs font-bold text-gray-700 shadow">
                  {item.category}
                </span>
                {/* Zoom icon */}
                <div className="absolute inset-0 flex items-center justify-center opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                  <span className="rounded-full bg-white/90 p-3 text-lg shadow-lg">🔍</span>
                </div>
              </div>

              {/* Card info */}
              <div className="p-5">
                <h3 className="text-lg font-bold text-gray-900">{item.title}</h3>
                <p className="mt-1 text-sm leading-relaxed text-gray-500">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="mt-14 text-center">
          <p className="mb-5 text-base text-gray-500">
            190+ photos & videos on our JustDial listing. Rated <strong>4.9★</strong> by 380+ customers.
          </p>
          <a
            href="#booking"
            className="inline-flex items-center gap-2 rounded-full bg-gray-900 px-8 py-4 text-sm font-semibold text-white shadow-lg transition-all hover:-translate-y-0.5 hover:bg-[#FF5E62] hover:shadow-xl"
          >
            Book Your Ride Now <span className="text-base">→</span>
          </a>
        </div>
      </div>

      {/* Lightbox */}
      {lightbox && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4 backdrop-blur-sm"
          onClick={() => setLightbox(null)}
        >
          <div
            className="relative max-w-3xl w-full overflow-hidden rounded-[2rem] bg-white shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={lightbox.src}
              alt={lightbox.title}
              className="w-full max-h-[60vh] object-cover"
            />
            <div className="p-6">
              <span className="mb-2 inline-block rounded-full bg-gray-100 px-3 py-1 text-xs font-bold text-gray-600">
                {lightbox.category}
              </span>
              <h3 className="mt-1 text-2xl font-bold text-gray-900">{lightbox.title}</h3>
              <p className="mt-2 text-base text-gray-600">{lightbox.desc}</p>
              <div className="mt-6 flex gap-3">
                <a
                  href="#booking"
                  onClick={() => setLightbox(null)}
                  className="rounded-full bg-gray-900 px-6 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-[#FF5E62]"
                >
                  Book This Vehicle
                </a>
                <button
                  onClick={() => setLightbox(null)}
                  className="rounded-full border border-gray-300 px-6 py-2.5 text-sm font-semibold text-gray-700 transition-colors hover:bg-gray-100"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
