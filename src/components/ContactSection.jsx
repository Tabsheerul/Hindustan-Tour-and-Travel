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
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-16 lg:items-start">

          {/* Left — Contact Details (Clean List) */}
          <div className="flex flex-col gap-10 lg:col-span-5">
            
            {/* Address */}
            <div className="flex gap-5 group">
              <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-brand-primary/10 shadow-sm transition-transform duration-300 group-hover:scale-110 group-hover:bg-brand-primary/20">
                <svg className="h-6 w-6 text-brand-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.242-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
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
            <div className="flex gap-5 group">
              <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-brand-primary/10 shadow-sm transition-transform duration-300 group-hover:scale-110 group-hover:bg-brand-primary/20">
                <svg className="h-6 w-6 text-brand-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
              </div>
              <div className="pt-1 w-full">
                <div className="mb-3 flex items-center gap-13">
                  <h3 className="text-xl font-bold text-gray-900">Contact Numbers</h3>
                  <a href="https://wa.me/919759654651" target="_blank" rel="noopener noreferrer" className="text-[#25D366] transition-all duration-300 hover:scale-110 hover:text-[#1ebd5a] hover:drop-shadow-md">
                    <span className="sr-only">WhatsApp</span>
                    <svg className="h-7 w-7" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
                  </a>
                </div>
                <div className="flex flex-col gap-3">
                  {CONTACT_INFO.phones.map((phone, i) => (
                    <div key={i} className="border-b border-gray-100 pb-2 last:border-0 last:pb-0">
                      <a
                        href={`tel:${phone.number.replace(/\s/g, "")}`}
                        className="text-lg font-bold text-gray-900 transition-colors hover:text-brand-primary"
                      >
                        {phone.number}
                      </a>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Email & Hours */}
            <div className="flex gap-5 group">
              <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-brand-primary/10 shadow-sm transition-transform duration-300 group-hover:scale-110 group-hover:bg-brand-primary/20">
                <svg className="h-6 w-6 text-brand-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
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
          <div className="group relative h-[400px] w-full overflow-hidden rounded-3xl shadow-2xl lg:col-span-7 lg:h-[600px] transition-transform duration-500 hover:shadow-brand-primary/20">
            <div className="absolute inset-0 z-10 pointer-events-none rounded-3xl border border-gray-200/50 transition-colors group-hover:border-brand-primary/30"></div>
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
