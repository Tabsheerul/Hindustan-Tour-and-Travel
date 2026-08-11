import React, { useState } from "react";

const faqs = [
  {
    question: "Which areas do you provide pickup from?",
    answer:
      "We provide pickup from Firozabad city and all nearby areas within approximately 50 km — including Tundla, Shikohabad, Jasrana, Etmadpur, Bah, and surrounding villages. Your destination can be anywhere in India!",
  },
  {
    question: "Are toll taxes and parking charges included in the fare?",
    answer:
      "To keep our base fares as affordable as possible, toll taxes and parking fees are usually paid directly by you during the trip as per actuals. However, if you prefer a hassle-free experience, we also offer all-inclusive packages where everything is covered upfront!",
  },
  {
    question: "Are your drivers verified and experienced for long trips?",
    answer:
      "Yes, your safety is our absolute top priority. All our drivers are locally vetted professionals from Firozabad who know the roads well. They undergo rigorous background checks, hold valid commercial licenses, and have years of experience driving safely on highways. You can relax and travel with complete peace of mind.",
  },
  {
    question: "What happens if the cab breaks down during my journey?",
    answer:
      "We maintain our fleet to the highest standards to prevent this. But in the rare event of a breakdown, we guarantee a prompt replacement vehicle. Our 24/7 roadside assistance network ensures you are never left stranded and your journey continues smoothly.",
  },
  {
    question: "Do you provide decorated cars for weddings (Barat)?",
    answer:
      "Yes, we do! We specialize in Shadi & Barat bookings in Firozabad and nearby areas with a premium fleet of luxury sedans and spacious SUVs. We can even arrange for professional floral decorations so your car looks absolutely stunning for your special day.",
  },
];

export default function FaqSection() {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleFaq = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section id="faq" className="w-full bg-gray-50 py-24 pb-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="flex flex-col gap-16 lg:flex-row lg:gap-24">
          
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
          <div className="flex-1 space-y-5">
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
                    className="flex w-full items-start justify-between p-7 text-left focus:outline-none"
                  >
                    <span className="text-lg font-bold text-gray-900 pr-6">{faq.question}</span>
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
                      <p className="px-7 pb-7 pr-16 text-base leading-relaxed text-gray-600">
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
