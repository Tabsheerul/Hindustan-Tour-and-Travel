import React, { useState } from "react";

const faqs = [
  {
    question: "Which areas do you provide pickup from?",
    answer:
      "We provide pickup from Firozabad city and all nearby areas within approximately 50 km — including Tundla, Shikohabad, Jasrana, Etmadpur, Bah, and surrounding villages. Your destination can be anywhere in India!",
  },
  {
    question: "What vehicles are available and what are the rates?",
    answer:
      "We offer a wide fleet to suit every need and budget: ERTIGA (available in white, brown, blue, silver, mehroom colours — ideal for 6 passengers), KIA CARENS 2023 (white/black, premium family SUV), Tempo Traveller (12-seater, perfect for group trips), and Bus on Rent (NON AC 2×3, Van, AC 2×2 Bus, SUV and more). Rates depend on vehicle type, distance, and season — call us for an instant quote!",
  },
  {
    question: "How is the pricing/fare decided for outstation trips?",
    answer:
      "Our fares are calculated based on: (1) Distance in km from pickup to destination, (2) Vehicle type selected (hatchback, sedan, SUV, Tempo, Bus), (3) One-way or round trip, (4) Night driving charges if applicable, and (5) Toll taxes & parking (paid actuals). For a round trip, the return journey fare is usually discounted. Call or WhatsApp us for a customised quote!",
  },
  {
    question: "Are toll taxes and parking charges included in the fare?",
    answer:
      "To keep our base fares as affordable as possible, toll taxes and parking fees are usually paid directly by you during the trip as per actuals. However, we also offer all-inclusive packages where everything is covered upfront — just ask when booking!",
  },
  {
    question: "Are your drivers verified and experienced for long trips?",
    answer:
      "Yes, your safety is our absolute top priority. All our drivers are locally vetted professionals from Firozabad with valid commercial licenses and years of experience on highways. We have been in business for 14 years and are MSME certified by the Indian Government.",
  },
  {
    question: "Do you provide decorated cars for weddings (Barat)?",
    answer:
      "Yes, we specialise in Shadi & Barat bookings! We offer premium luxury sedans and spacious SUVs with professional floral decorations. We serve Firozabad, Agra, Mathura and nearby areas. Contact us early to secure your date!",
  },
];


export default function FaqSection() {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleFaq = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section id="faq" className="w-full bg-gray-50 py-16 pb-20 sm:py-20 sm:pb-28 lg:py-24 lg:pb-32">
      <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-8">
        <div className="flex flex-col gap-10 sm:gap-14 lg:flex-row lg:gap-24">
          
          {/* Left Column - Sticky Heading & Contact */}
          <div className="lg:w-1/3 lg:shrink-0">
            <div className="sticky top-20">
              <span className="text-sm font-bold uppercase tracking-widest text-[#FF5E62]">
                Support
              </span>
              <h2 className="mt-3 text-4xl font-extrabold tracking-tight text-gray-900 sm:text-5xl">
                Got questions?
              </h2>
              <p className="mt-5 text-lg leading-relaxed text-gray-600">
                Everything you need to know about our cab services from Firozabad. Can't find the answer you're looking for?
              </p>
              <a href="#contact" className="mt-8 inline-block rounded-full bg-gray-900 px-7 py-3.5 text-sm font-semibold text-white shadow-md transition-all hover:-translate-y-0.5 hover:bg-[#FF5E62] hover:shadow-lg">
                Contact Us
              </a>
            </div>
          </div>

          {/* Right Column - Premium Accordion */}
          <div className="flex-1 space-y-3 sm:space-y-5">
            {faqs.map((faq, index) => {
              const isOpen = openIndex === index;
              return (
                <div
                  key={index}
                  className={`overflow-hidden rounded-[1.5rem] border transition-all duration-300 ${
                    isOpen 
                      ? "border-[#FF5E62]/40 bg-white shadow-lg shadow-[#FF5E62]/5 scale-[1.01]" 
                      : "border-gray-200/60 bg-white/60 hover:bg-white hover:border-gray-300"
                  }`}
                >
                  <button
                    onClick={() => toggleFaq(index)}
                    className="flex w-full items-start justify-between p-5 text-left focus:outline-none sm:p-7"
                  >
                    <span className="pr-4 text-base font-bold text-gray-900 sm:pr-6 sm:text-lg">{faq.question}</span>
                    <span
                      className={`mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-full transition-all duration-300 ${
                        isOpen ? "rotate-180 bg-[#FF5E62] text-white shadow-md" : "bg-gray-100 text-gray-500 hover:bg-gray-200"
                      }`}
                    >
                      <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M19 9l-7 7-7-7" />
                      </svg>
                    </span>
                  </button>
                  <div
                    className={`grid transition-all duration-300 ease-in-out ${
                      isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
                    }`}
                  >
                    <div className="overflow-hidden">
                      <p className="px-5 pb-5 pr-12 text-sm leading-relaxed text-gray-600 sm:px-7 sm:pb-7 sm:pr-16 sm:text-base">
                        {faq.answer}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
          
        </div>
      </div>
    </section>
  );
}
