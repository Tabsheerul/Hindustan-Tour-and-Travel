import React, { useState } from "react";
import { Link } from "react-router-dom";

// ─── All 47 original images downloaded from JustDial ─────────────────────────
// Source: justdial.com — Hindustan Tour and Travel, Rasulpur, Firozabad

const GALLERY_ITEMS = [
  { id: 1,  file: "jd_1.jpg",  title: "Land Rover Defender",    category: "Cars",           desc: "White Land Rover Defender — premium outstation cab" },
  { id: 2,  file: "jd_2.jpg",  title: "Luxury Wedding Cars",     category: "Wedding",        desc: "Luxury cars for wedding rental — promotional poster" },
  { id: 3,  file: "jd_3.jpg",  title: "Premium Interior",        category: "Interiors",      desc: "Beige leather seats & black dashboard — luxury interior" },
  { id: 4,  file: "jd_4.jpg",  title: "Jaguar XE Sedan",         category: "Cars",           desc: "White Jaguar XE sedan — premium cab for outstation" },
  { id: 5,  file: "jd_5.jpg",  title: "Bus Interior (Orange)",   category: "Interiors",      desc: "Orange seats bus interior — CHAHAR bus" },
  { id: 6,  file: "jd_6.jpg",  title: "KHUSHI Bus (Orange)",     category: "Buses",          desc: "Bus exterior — orange KHUSHI tourist bus" },
  { id: 7,  file: "jd_7.jpg",  title: "Jaguar XE Rear",          category: "Cars",           desc: "White Jaguar XE rear view" },
  { id: 8,  file: "jd_8.jpg",  title: "KHUSHI Blue Bus",         category: "Buses",          desc: "Blue bus exterior front — KHUSHI tourist bus" },
  { id: 9,  file: "jd_9.jpg",  title: "Bus Interior (Blue)",     category: "Interiors",      desc: "Bus interior with blue seats" },
  { id: 10, file: "jd_10.jpg", title: "Tempo Traveller",         category: "Tempo",          desc: "White Tempo Traveller exterior — perfect for group travel" },
  { id: 11, file: "jd_11.jpg", title: "Audi (Rear)",             category: "Cars",           desc: "White Audi rear view — luxury cab" },
  { id: 12, file: "jd_12.jpg", title: "Audi (Front)",            category: "Cars",           desc: "White Audi front view — premium outstation" },
  { id: 13, file: "jd_13.jpg", title: "Skoda Sedan",             category: "Cars",           desc: "Dark Skoda sedan front view" },
  { id: 14, file: "jd_14.jpg", title: "Bus Interior (White)",    category: "Interiors",      desc: "Bus interior — white seats with red carpet" },
  { id: 15, file: "jd_15.jpg", title: "Tempo Interior",          category: "Interiors",      desc: "Tempo Traveller interior with white seats" },
  { id: 16, file: "jd_16.jpg", title: "Tourist Bus (Front)",     category: "Buses",          desc: "White/yellow TOURIST bus — front view" },
  { id: 17, file: "jd_17.jpg", title: "Bus Interior (Yellow)",   category: "Interiors",      desc: "Bus interior with yellow/orange seats" },
  { id: 18, file: "jd_18.jpg", title: "White Bus (Side)",        category: "Buses",          desc: "White bus exterior side view" },
  { id: 19, file: "jd_19.jpg", title: "Wedding Ertiga",          category: "Wedding",        desc: "White Ertiga decorated for wedding — floral decor" },
  { id: 20, file: "jd_20.jpg", title: "Mahindra Bolero Neo",     category: "Cars",           desc: "White Mahindra Bolero Neo SUV — rugged outstation travel" },
  { id: 21, file: "jd_21.jpg", title: "Bus Interior (Pink)",     category: "Interiors",      desc: "Bus interior with pink seats" },
  { id: 22, file: "jd_22.jpg", title: "Tourist Bus (Front)",     category: "Buses",          desc: "White TOURIST bus — side/front view" },
  { id: 23, file: "jd_23.jpg", title: "Hyundai i20",             category: "Cars",           desc: "White Hyundai i20 — compact outstation cab" },
  { id: 24, file: "jd_24.jpg", title: "Hyundai Creta (White)",   category: "Cars",           desc: "White Hyundai Creta SUV — side view" },
  { id: 25, file: "jd_25.jpg", title: "Hyundai Creta (Dark)",    category: "Cars",           desc: "Dark Hyundai Creta SUV — front view" },
  { id: 26, file: "jd_26.jpg", title: "Leather Bus Interior",    category: "Interiors",      desc: "Bus interior — brown/black leather seats" },
  { id: 27, file: "jd_27.jpg", title: "Bus Interior (Blue/Wh)", category: "Interiors",      desc: "Bus interior with blue and white seats" },
  { id: 28, file: "jd_28.jpg", title: "Wedding Sedan",           category: "Wedding",        desc: "White sedan decorated for wedding — rear view" },
  { id: 29, file: "jd_29.jpg", title: "Force Traveller (Front)", category: "Tempo",          desc: "White Force Traveller front view — group tours" },
  { id: 30, file: "jd_30.jpg", title: "Bus Interior (Red/Wh)",  category: "Interiors",      desc: "Bus interior — red and white seats" },
  { id: 31, file: "jd_31.jpg", title: "White Bus Side",          category: "Buses",          desc: "White bus exterior — side view" },
  { id: 32, file: "jd_32.jpg", title: "Silver/Red Bus",          category: "Buses",          desc: "Silver and red bus exterior" },
  { id: 33, file: "jd_33.jpg", title: "Silver Bus",              category: "Buses",          desc: "Silver bus exterior" },
  { id: 34, file: "jd_34.jpg", title: "Ertiga / White Car",      category: "Cars",           desc: "White Ertiga / car front view" },
  { id: 35, file: "jd_35.jpg", title: "Bus Interior (Grey)",     category: "Interiors",      desc: "Bus interior with grey and white seats" },
  { id: 36, file: "jd_36.jpg", title: "Bus Interior (Grey 2)",   category: "Interiors",      desc: "Bus interior — another grey/white seats view" },
  { id: 37, file: "jd_37.jpg", title: "TOURIST ANMOL Bus",       category: "Buses",          desc: "Green TOURIST ANMOL bus — front view" },
  { id: 38, file: "jd_38.jpg", title: "TOURIST GARIMA Bus",      category: "Buses",          desc: "White TOURIST GARIMA bus — side view" },
  { id: 39, file: "jd_39.jpg", title: "Silver Bus (Side)",       category: "Buses",          desc: "Silver bus — side view" },
  { id: 40, file: "jd_40.jpg", title: "White Sedan Rear",        category: "Cars",           desc: "White sedan rear view (Ciaz)" },
  { id: 41, file: "jd_41.jpg", title: "White Sedan Front",       category: "Cars",           desc: "White sedan front view (Ciaz)" },
  { id: 42, file: "jd_42.jpg", title: "Force Traveller (Side)",  category: "Tempo",          desc: "White Force Traveller side view" },
  { id: 44, file: "jd_44.jpg", title: "Force Traveller TOURIST", category: "Tempo",          desc: "White Force Traveller TOURIST — front view" },
];

const CATEGORIES = ["All", "Cars", "Buses", "Tempo", "Wedding", "Interiors"];

export default function GalleryPage() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [lightbox, setLightbox] = useState(null);
  const [lightboxIndex, setLightboxIndex] = useState(0);
  const [showAll, setShowAll] = useState(false);

  const filtered =
    activeCategory === "All"
      ? GALLERY_ITEMS
      : GALLERY_ITEMS.filter((item) => item.category === activeCategory);

  const openLightbox = (item) => {
    const idx = filtered.findIndex((i) => i.id === item.id);
    setLightboxIndex(idx);
    setLightbox(item);
  };

  const prev = () => {
    const newIdx = (lightboxIndex - 1 + filtered.length) % filtered.length;
    setLightboxIndex(newIdx);
    setLightbox(filtered[newIdx]);
  };

  const next = () => {
    const newIdx = (lightboxIndex + 1) % filtered.length;
    setLightboxIndex(newIdx);
    setLightbox(filtered[newIdx]);
  };

  return (
    <div className="min-h-screen bg-white">
      {/* ── Simple Header ── */}
      <header className="sticky top-0 z-40 border-b border-gray-200 bg-white/90 backdrop-blur-md">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 lg:px-8">
          <div className="flex items-center gap-6">
            <Link
              to="/"
              className="flex items-center gap-1.5 text-sm font-semibold text-gray-500 transition-colors hover:text-gray-900"
            >
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
              </svg>
              Back to Home
            </Link>
            <Link to="/" className="flex flex-col border-l border-gray-300 pl-6 hidden sm:flex">
              <span className="text-[15px] font-black tracking-widest uppercase text-[#FF5E62]">Hindustan</span>
              <span className="text-[13px] font-medium tracking-[0.18em] text-gray-500 uppercase">Tour &amp; Travels</span>
            </Link>
          </div>
          <div className="flex items-center gap-4">
            <Link
              to="/#booking"
              className="rounded-full bg-gray-900 px-5 py-2.5 text-sm font-bold text-white shadow-sm transition-all hover:scale-105 hover:bg-[#FF5E62]"
            >
              Book a Ride
            </Link>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-7xl px-6 py-16 lg:px-8">
        {/* ── Page Heading ── */}
        <div className="mb-12">
          <span className="text-sm font-bold uppercase tracking-widest text-[#FF5E62]">
            Fleet & Gallery
          </span>
          <h1 className="mt-3 text-4xl font-extrabold tracking-tight text-gray-900 sm:text-5xl">
            Our Vehicles & Fleet
          </h1>
          <p className="mt-4 max-w-2xl text-lg leading-relaxed text-gray-600">
            Explore our complete fleet — cars, buses, tempo travellers, wedding vehicles and more.
            All {GALLERY_ITEMS.length} photos sourced directly from our JustDial listing.
            Rated <strong>4.9★</strong> by 380+ customers.
          </p>
        </div>

        {/* ── Category Filter ── */}
        <div className="mb-10 flex flex-wrap gap-2">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => { setActiveCategory(cat); setShowAll(false); }}
              className={`rounded-full px-5 py-2 text-sm font-semibold transition-all duration-200 ${
                activeCategory === cat
                  ? "bg-gray-900 text-white shadow-md"
                  : "border border-gray-200 bg-white text-gray-600 hover:border-gray-400 hover:text-gray-900"
              }`}
            >
              {cat}
              {cat === "All" ? ` (${GALLERY_ITEMS.length})` : ` (${GALLERY_ITEMS.filter(i => i.category === cat).length})`}
            </button>
          ))}
        </div>

        {/* ── Grid ── */}
        <div className="relative pb-4">
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {filtered.slice(0, showAll ? filtered.length : 12).map((item) => (
              <div
                key={item.id}
                onClick={() => openLightbox(item)}
                className="group cursor-pointer overflow-hidden rounded-2xl bg-gray-100 shadow-sm transition-all duration-300 hover:shadow-xl hover:-translate-y-1"
              >
                <div className="relative aspect-[4/3] overflow-hidden">
                  <img
                  src={`/src/assets/jd_gallery/${item.file}`}
                  alt={item.title}
                  className="w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  loading="lazy"
                />
                {/* Hover overlay */}
                <div className="absolute inset-0 flex flex-col justify-end bg-gradient-to-t from-black/70 via-black/10 to-transparent opacity-0 p-4 transition-opacity duration-300 group-hover:opacity-100">
                  <span className="mb-1 inline-block self-start rounded-full bg-white/20 px-2 py-0.5 text-xs font-semibold text-white/90 backdrop-blur-sm">
                    {item.category}
                  </span>
                  <p className="text-sm font-bold text-white">{item.title}</p>
                  <p className="mt-0.5 text-xs text-white/70 line-clamp-2">{item.desc}</p>
                </div>
                {/* Zoom icon */}
                <div className="absolute top-3 right-3 rounded-full bg-black/40 p-1.5 opacity-0 backdrop-blur-sm transition-opacity duration-300 group-hover:opacity-100">
                  <svg className="h-4 w-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v6m3-3H7" />
                  </svg>
                </div>
              </div>
              {/* Card caption */}
              <div className="px-4 py-4">
                <p className="text-base font-bold text-gray-900">{item.title}</p>
                <p className="mt-1 text-sm text-gray-500 line-clamp-1">{item.desc}</p>
              </div>
            </div>
          ))}
          </div>

          {/* Blur Overlay & Show More Button */}
          {!showAll && filtered.length > 9 && (
            <div className="absolute bottom-0 left-0 right-0 flex h-72 flex-col items-center justify-end bg-gradient-to-t from-white via-white/95 to-transparent pb-4">
              <button
                onClick={() => setShowAll(true)}
                className="rounded-full border-2 border-gray-900 bg-white px-8 py-3.5 text-sm font-bold text-gray-900 shadow-xl transition-all hover:-translate-y-1 hover:bg-gray-900 hover:text-white"
              >
                Load More Photos ({filtered.length - 9} Hidden) ↓
              </button>
            </div>
          )}
        </div>

        {/* ── Bottom CTA ── */}
        <div className="mt-16 rounded-[2rem] bg-gray-900 p-10 text-center">
          <h2 className="text-2xl font-bold text-white sm:text-3xl">Ready to book your ride?</h2>
          <p className="mt-3 text-gray-400">
            Call us on <a href="tel:+919759654651" className="font-bold text-[#FF5E62] hover:underline">+91 97596 54651</a> or book online right now.
          </p>
          <div className="mt-6 flex flex-wrap items-center justify-center gap-4">
            <Link
              to="/#booking"
              className="rounded-full bg-[#FF5E62] px-8 py-3.5 text-sm font-bold text-white shadow-lg transition-all hover:-translate-y-0.5 hover:bg-[#e0484c] hover:shadow-xl"
            >
              Book Online →
            </Link>
            <a
              href="https://wa.me/919759654651"
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-full border border-white/20 bg-white/10 px-8 py-3.5 text-sm font-bold text-white transition-all hover:bg-white/20"
            >
              💬 WhatsApp Us
            </a>
          </div>
        </div>
      </main>

      {/* ── Lightbox Modal ── */}
      {lightbox && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4 backdrop-blur-sm"
          onClick={() => setLightbox(null)}
        >
          <div
            className="relative flex max-h-[90vh] w-full max-w-4xl flex-col overflow-hidden rounded-[1.5rem] bg-gray-900 shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Image */}
            <div className="relative flex-1 overflow-hidden">
              <img
                src={`/src/assets/jd_gallery/${lightbox.file}`}
                alt={lightbox.title}
                className="max-h-[65vh] w-full object-contain"
              />
              {/* Nav arrows */}
              <button
                onClick={prev}
                className="absolute left-3 top-1/2 -translate-y-1/2 rounded-full bg-black/50 p-3 text-white backdrop-blur-sm transition hover:bg-black/80"
              >
                <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              <button
                onClick={next}
                className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full bg-black/50 p-3 text-white backdrop-blur-sm transition hover:bg-black/80"
              >
                <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                </svg>
              </button>
              {/* Close */}
              <button
                onClick={() => setLightbox(null)}
                className="absolute top-3 right-3 rounded-full bg-black/50 p-2 text-white backdrop-blur-sm transition hover:bg-black/80"
              >
                <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            {/* Info bar */}
            <div className="flex items-center justify-between px-6 py-4">
              <div>
                <span className="mr-2 rounded-full bg-white/10 px-2.5 py-0.5 text-xs font-semibold text-white/70">{lightbox.category}</span>
                <span className="text-base font-bold text-white">{lightbox.title}</span>
                <p className="mt-0.5 text-sm text-gray-400">{lightbox.desc}</p>
              </div>
              <p className="shrink-0 text-sm text-gray-500">{lightboxIndex + 1} / {filtered.length}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
