import premiumTajMahal from "../assets/premium_taj_mahal.png";

const HeroCard = () => {
  return (
    <div className="relative mx-auto flex min-h-[760px] w-full max-w-7xl flex-col justify-center gap-10 px-5 pb-16 pt-48 sm:px-10 md:min-h-[860px] md:flex-row md:items-center md:gap-12 md:px-8 md:pt-56 md:pb-32 lg:gap-16">
      {/* Left — Text Content with lots of breathing room */}
      <div className="z-10 flex max-w-xl flex-col gap-5 text-left sm:gap-6 md:flex-1">

        {/* Headline */}
        <h1 className="text-texture-mask max-w-[10ch] py-2 text-[3.5rem] leading-[0.98] font-bold tracking-[-0.05em] sm:text-6xl md:max-w-none md:text-7xl lg:text-8xl">
          Your Ride <br />
          <span className="text-gray-300 mix-blend-multiply">from</span>{" "}
          <br />
          Firozabad.
        </h1>

        {/* Subtext */}
        <p className="mt-3 max-w-md text-base leading-relaxed font-light text-gray-500 sm:text-lg md:mt-4 md:text-xl">
          Book reliable outstation cabs from Firozabad & nearby cities to
          anywhere in India. Comfortable rides, honest pricing, always on time.
        </p>

        {/* CTA */}
        <div className="mt-5 flex flex-wrap items-center gap-4 sm:mt-8 sm:gap-6">
          <a
            href="#booking"
            className="glass-dark rounded-full px-6 py-3.5 text-sm font-semibold text-white shadow-lg transition-all hover:-translate-y-0.5 hover:bg-gray-800 hover:shadow-xl sm:px-8 sm:py-4"
          >
            Book a Ride
          </a>
          <a
            href="#contact"
            className="group flex items-center gap-2 text-sm font-medium text-gray-500 transition-colors hover:text-gray-900"
          >
            Contact Us
            <span className="text-xl leading-none transition-transform group-hover:translate-x-1">
              →
            </span>
          </a>
        </div>
      </div>

      {/* Right — Floating image card, glassmorphic style */}
      <div className="relative flex w-full shrink-0 justify-center md:w-auto">
        {/* Subtle background blur element */}
        <div className="bg-brand-primary/10 absolute -inset-10 -z-10 rounded-[4rem] blur-3xl"></div>

        {/* Image Card wrapped in glass */}
        <div className="glass relative w-full max-w-[360px] rounded-[2rem] bg-white/70 p-3 shadow-2xl sm:max-w-[420px] sm:p-4 md:rounded-[2.5rem]">
          {/* Subtle gradient overlay to blend perfectly */}
          <div className="pointer-events-none absolute inset-4 z-10 rounded-4xl bg-linear-to-tr from-black/20 to-transparent mix-blend-overlay"></div>
          <img
            src={premiumTajMahal}
            alt="Taj Mahal — Just 40km from Firozabad"
            className="relative z-0 aspect-[0.86] h-auto w-full rounded-[1.5rem] object-cover sm:rounded-4xl md:h-[520px] md:w-auto md:max-w-[480px]"
          />
        </div>

        {/* Small floating badge */}
        <div className="glass absolute -bottom-5 left-2 z-20 flex items-center gap-3 rounded-2xl bg-white/90 px-4 py-3 shadow-xl transition-transform hover:-translate-y-1 sm:-left-8 sm:gap-4 sm:rounded-3xl sm:px-6 sm:py-4">
          <div className="bg-brand-primary/10 text-brand-primary flex h-10 w-10 items-center justify-center rounded-full text-lg">
            🚗
          </div>
          <div>
            <p className="text-sm font-bold text-gray-900">Firozabad's #1</p>
            <p className="mt-0.5 text-xs font-medium text-gray-500">
              Tour & Travels
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroCard;
