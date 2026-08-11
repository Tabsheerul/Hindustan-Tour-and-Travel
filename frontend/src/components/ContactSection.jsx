import React from "react";

// ─── Real Contact Info from JustDial ─────────────────────────────────────────
// Source: justdial.com — Hindustan Tour and Travel, Rasulpur, Firozabad
const CONTACT_INFO = {
  phones: [
    { label: "Booking Line", number: "+91 84011 41577" },
    { label: "WhatsApp", number: "+91 97596 54651" },
    { label: "Office", number: "+91 73006 69318" },
    { label: "Emergency (24/7)", number: "+91 95288 41152" },
  ],
  email: "info@hindustantourandtravels.com",
  hours: "Open daily · Closes at 11:00 PM",
  established: "14 Years in Business",
  rating: "4.9★ (380 Ratings)",
  address: {
    line1: "Hindustan Tour and Travel",
    line2: "Opposite Maula Ali Inter College, Rasulpur Road",
    city: "Rasulpur, Firozabad – 283203",
    state: "Uttar Pradesh, India",
  },
  // Google Maps embed — EXACT office location pinned at:
  // Opposite Maula Ali Inter College, Rasulpur Road, Rasulpur, Firozabad
  // Coordinates: 27.142121, 78.407983
  mapEmbedUrl:
    "https://maps.google.com/maps?q=27.142121,78.407983&z=15&output=embed",
};

export default function ContactSection() {
  return (
    <section id="contact" className="w-full bg-white py-24">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">

        {/* Section Header */}
        <div className="mb-16 max-w-2xl">
          <span className="text-sm font-bold uppercase tracking-widest text-[#FF5E62]">
            Get in Touch
          </span>
          <h2 className="mt-3 text-4xl font-extrabold tracking-tight text-gray-900 sm:text-5xl">
            Visit Us in Firozabad
          </h2>
          <p className="mt-5 text-lg leading-relaxed text-gray-600">
            Call us directly, send a WhatsApp message, or visit our office in Rasulpur, Firozabad. We're available until 11 PM every day!
          </p>
        </div>

        {/* Trust Badges Row */}
        <div className="mb-10 flex flex-wrap gap-4">
          {[
            { icon: "⭐", label: "4.9 Rating", sub: "380 JustDial Reviews" },
            { icon: "🏢", label: "14 Years in Business", sub: "Est. 2010" },
            { icon: "🏅", label: "MSME Certified", sub: "Indian Government 2023" },
            { icon: "✅", label: "Claimed Business", sub: "Verified on JustDial" },
          ].map((b, i) => (
            <div key={i} className="flex items-center gap-3 rounded-2xl border border-gray-200 bg-gray-50 px-5 py-3">
              <span className="text-2xl">{b.icon}</span>
              <div>
                <p className="text-sm font-bold text-gray-900">{b.label}</p>
                <p className="text-xs text-gray-500">{b.sub}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Content Grid: Info Cards + Map */}
        <div className="flex flex-col gap-10 lg:flex-row lg:gap-12">

          {/* Left — Contact Cards */}
          <div className="flex flex-col gap-6 lg:w-[420px] lg:shrink-0">

            {/* Phone Numbers Card */}
            <div className="rounded-[1.5rem] border border-gray-200 bg-gray-50 p-8">
              <div className="mb-6 flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#FF5E62]/10 text-lg">📞</div>
                <h3 className="text-lg font-bold text-gray-900">Call / WhatsApp</h3>
              </div>
              <div className="space-y-4">
                {CONTACT_INFO.phones.map((phone, i) => (
                  <div key={i} className="flex items-center justify-between">
                    <span className="text-sm font-medium text-gray-500">{phone.label}</span>
                    <a
                      href={`tel:${phone.number.replace(/\s/g, "")}`}
                      className="text-sm font-bold text-gray-900 transition-colors hover:text-[#FF5E62]"
                    >
                      {phone.number}
                    </a>
                  </div>
                ))}
              </div>
            </div>

            {/* Hours + Email */}
            <div className="rounded-[1.5rem] border border-gray-200 bg-gray-50 p-8 space-y-5">
              <div>
                <div className="mb-2 flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-green-100 text-lg">🕙</div>
                  <h3 className="text-lg font-bold text-gray-900">Business Hours</h3>
                </div>
                <p className="text-base font-semibold text-green-600">{CONTACT_INFO.hours}</p>
                <p className="text-sm text-gray-500 mt-1">Monday to Sunday</p>
              </div>
              <div className="h-px bg-gray-200" />
              <div>
                <div className="mb-2 flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#FF9933]/10 text-lg">✉️</div>
                  <h3 className="text-lg font-bold text-gray-900">Email</h3>
                </div>
                <a
                  href={`mailto:${CONTACT_INFO.email}`}
                  className="text-base font-semibold text-gray-900 transition-colors hover:text-[#FF5E62] break-all"
                >
                  {CONTACT_INFO.email}
                </a>
              </div>
            </div>

            {/* Address Card */}
            <div className="rounded-[1.5rem] border border-gray-200 bg-gray-50 p-8">
              <div className="mb-4 flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-100 text-lg">📍</div>
                <h3 className="text-lg font-bold text-gray-900">Our Office</h3>
              </div>
              <div className="text-base leading-relaxed text-gray-700 space-y-1">
                <p className="font-bold text-gray-900">{CONTACT_INFO.address.line1}</p>
                <p>{CONTACT_INFO.address.line2}</p>
                <p>{CONTACT_INFO.address.city}</p>
                <p className="text-sm text-gray-500">{CONTACT_INFO.address.state}</p>
              </div>
              <a
                href="https://maps.google.com/?q=27.142121,78.407983"
                target="_blank"
                rel="noopener noreferrer"
                className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-[#FF5E62] transition-colors hover:text-[#e0484c]"
              >
                Get Directions <span className="text-base">→</span>
              </a>
            </div>
          </div>

          {/* Right — Google Maps Embed */}
          <div className="flex-1 overflow-hidden rounded-[2rem] border border-gray-200 shadow-lg">
            <iframe
              src={CONTACT_INFO.mapEmbedUrl}
              width="100%"
              height="100%"
              style={{ border: 0, minHeight: "520px" }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Hindustan Tour and Travel — Rasulpur, Firozabad Office Location"
            ></iframe>
          </div>

        </div>
      </div>
    </section>
  );
}
