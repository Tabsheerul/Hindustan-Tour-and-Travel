import React from "react";

import { CONTACT_INFO } from "../data/contactData";

export default function ContactSection() {
  return (
    <section id="contact" className="w-full bg-white py-16 sm:py-20 lg:py-24">
      <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-8">

        {/* Section Header */}
        <div className="mb-12 max-w-2xl">
          <span className="text-sm font-bold uppercase tracking-widest text-brand-primary">
            Get in Touch
          </span>
          <h2 className="mt-3 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            Visit Us in Firozabad
          </h2>
          <p className="mt-4 text-lg leading-relaxed text-gray-600">
            Call us directly, send a WhatsApp message, or visit our office in Rasulpur, Firozabad. We're available 24/7 to serve you!
          </p>
        </div>

        {/* Content Grid: Info + Map */}
        <div className="flex flex-col gap-12 lg:flex-row lg:items-center">

          {/* Left — Contact Details (Clean List) */}
          <div className="flex flex-col gap-8 lg:w-[420px] lg:shrink-0">
            
            {/* Address */}
            <div className="flex gap-5">
              <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-brand-primary/10 text-2xl shadow-sm">
                📍
              </div>
              <div className="pt-1">
                <h3 className="mb-2 text-xl font-bold text-gray-900">Our Office</h3>
                <div className="text-[15px] leading-relaxed text-gray-600">
                  <p className="font-semibold text-gray-800">{CONTACT_INFO.address.line1}</p>
                  <p>{CONTACT_INFO.address.line2}</p>
                  <p>{CONTACT_INFO.address.city}, {CONTACT_INFO.address.state}</p>
                </div>
                <a
                  href="https://maps.google.com/?q=27.142121,78.407983"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-3 inline-flex items-center gap-1.5 text-sm font-bold text-brand-primary transition-colors hover:text-[#e0484c]"
                >
                  Get Directions <span className="text-lg leading-none">→</span>
                </a>
              </div>
            </div>

            {/* Phones */}
            <div className="flex gap-5">
              <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-brand-primary/10 text-2xl shadow-sm">
                📞
              </div>
              <div className="pt-1 w-full">
                <h3 className="mb-3 text-xl font-bold text-gray-900">Call / WhatsApp</h3>
                <div className="flex flex-col gap-3">
                  {CONTACT_INFO.phones.map((phone, i) => (
                    <div key={i} className="flex items-center justify-between border-b border-gray-100 pb-2 last:border-0 last:pb-0">
                      <span className="text-sm font-medium text-gray-500">{phone.label}</span>
                      <a
                        href={`tel:${phone.number.replace(/\s/g, "")}`}
                        className="font-bold text-gray-900 transition-colors hover:text-brand-primary"
                      >
                        {phone.number}
                      </a>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Email & Hours */}
            <div className="flex gap-5">
              <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-brand-primary/10 text-2xl shadow-sm">
                ✉️
              </div>
              <div className="pt-1">
                <h3 className="mb-2 text-xl font-bold text-gray-900">Business Hours & Email</h3>
                <p className="mb-1 text-[15px] font-semibold text-gray-800">{CONTACT_INFO.hours}</p>
                <a
                  href={`mailto:${CONTACT_INFO.email}`}
                  className="inline-block text-[15px] font-bold text-brand-primary transition-colors hover:text-[#e0484c]"
                >
                  {CONTACT_INFO.email}
                </a>
              </div>
            </div>

          </div>

          {/* Right — Google Maps Embed */}
          <div className="h-[400px] w-full overflow-hidden rounded-3xl shadow-xl lg:h-[500px]">
            <iframe
              src={CONTACT_INFO.mapEmbedUrl}
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Hindustan Tour and Travel Office Location"
            ></iframe>
          </div>

        </div>
      </div>
    </section>
  );
}
