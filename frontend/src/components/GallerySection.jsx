import React from "react";
import { Link } from "react-router-dom";

// Preview images — first 6 of our 47 JustDial photos shown as teaser
const PREVIEW = [
  { file: "jd_1.jpg",  title: "Land Rover Defender", category: "Cars" },
  { file: "jd_10.jpg", title: "Tempo Traveller",      category: "Tempo" },
  { file: "jd_6.jpg",  title: "KHUSHI Bus",           category: "Buses" },
  { file: "jd_19.jpg", title: "Wedding Ertiga",        category: "Wedding" },
  { file: "jd_4.jpg",  title: "Jaguar XE Sedan",      category: "Cars" },
  { file: "jd_20.jpg", title: "Mahindra Bolero Neo",  category: "Cars" },
];

export default function GallerySection() {
  return (
    <section id="gallery" className="w-full bg-white py-24">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">

        {/* Header */}
        <div className="mb-12 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div>
            <span className="text-sm font-bold uppercase tracking-widest text-[#FF5E62]">
              Fleet & Gallery
            </span>
            <h2 className="mt-3 text-4xl font-extrabold tracking-tight text-gray-900 sm:text-5xl">
              See our fleet
            </h2>
            <p className="mt-4 max-w-xl text-lg leading-relaxed text-gray-600">
              Cars, buses, tempo travellers, and wedding vehicles — we have it all. 
              Browse our complete collection of 47 photos.
            </p>
          </div>
          <Link
            to="/gallery"
            className="inline-flex shrink-0 items-center gap-2 rounded-full border border-gray-300 px-6 py-3 text-sm font-semibold text-gray-700 transition-all hover:border-gray-900 hover:bg-gray-900 hover:text-white"
          >
            View All 47 Photos →
          </Link>
        </div>

        {/* Preview Grid — 6 images */}
        <div className="grid grid-cols-2 gap-4 lg:grid-cols-3">
          {PREVIEW.map((item, idx) => (
            <Link
              to="/gallery"
              key={idx}
              className="group relative overflow-hidden rounded-2xl bg-gray-100 shadow-sm transition-all duration-300 hover:shadow-xl hover:-translate-y-1"
            >
              <div className="relative aspect-4/3 overflow-hidden">
                <img
                  src={`/src/assets/jd_gallery/${item.file}`}
                  alt={item.title}
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-linear-to-t from-black/50 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                <span className="absolute top-3 left-3 rounded-full bg-white/90 px-2.5 py-0.5 text-xs font-bold text-gray-700 shadow">
                  {item.category}
                </span>
              </div>
              <div className="p-4">
                <p className="text-sm font-semibold text-gray-900">{item.title}</p>
              </div>
            </Link>
          ))}
        </div>

        {/* CTA Banner */}
        <div className="mt-10 flex flex-col items-center justify-between gap-4 rounded-3xl bg-gray-50 px-8 py-6 sm:flex-row">
          <div>
            <p className="font-bold text-gray-900">190+ Photos & Videos on our JustDial listing</p>
            <p className="text-sm text-gray-500">Rated ⭐ 4.9 by 380+ customers · 14 Years in Business</p>
          </div>
          <Link
            to="/gallery"
            className="shrink-0 rounded-full bg-gray-900 px-7 py-3 text-sm font-bold text-white shadow transition-all hover:bg-[#FF5E62]"
          >
            Open Full Gallery →
          </Link>
        </div>
      </div>
    </section>
  );
}
