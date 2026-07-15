import premiumTajMahal from "../assets/premium_taj_mahal.png";

const HeroCard = () => {
  return (
    <div className="relative mx-auto flex min-h-[90vh] w-full max-w-7xl items-center justify-between gap-16 px-16 py-32">
      {/* Left — Text Content with lots of breathing room */}
      <div className="z-10 flex max-w-xl flex-col gap-6 text-left">
        {/* Tiny label */}
        <span className="text-brand-primary text-xs font-semibold tracking-[0.25em] uppercase">
          Explore India
        </span>

        {/* Headline */}
        <h1 className="text-texture-mask py-2 text-7xl leading-tight font-bold tracking-tight md:text-8xl">
          Travel <br />
          <span className="text-gray-300 mix-blend-multiply">without</span>{" "}
          <br />
          limits.
        </h1>

        {/* Subtext */}
        <p className="mt-4 max-w-sm text-lg leading-relaxed font-light text-gray-500 md:text-xl">
          Discover the heart of India with handcrafted tours, personalised for
          every traveller. Let the journey be as beautiful as the destination.
        </p>

        {/* CTA */}
        <div className="mt-8 flex items-center gap-6">
          <button className="glass-dark rounded-full px-8 py-4 text-sm font-semibold text-white shadow-lg transition-all hover:-translate-y-0.5 hover:bg-gray-800 hover:shadow-xl">
            Book a Tour
          </button>
          <button className="group flex items-center gap-2 text-sm font-medium text-gray-500 transition-colors hover:text-gray-900">
            View Destinations
            <span className="text-xl leading-none transition-transform group-hover:translate-x-1">
              →
            </span>
          </button>
        </div>
      </div>

      {/* Right — Floating image card, glassmorphic style */}
      <div className="relative hidden shrink-0 md:block">
        {/* Subtle background blur element */}
        <div className="bg-brand-primary/10 absolute -inset-10 -z-10 rounded-[4rem] blur-3xl"></div>

        {/* Image Card wrapped in glass */}
        <div className="glass relative rounded-[2.5rem] bg-white/70 p-4 shadow-2xl">
          {/* Subtle gradient overlay to blend perfectly */}
          <div className="pointer-events-none absolute inset-4 z-10 rounded-4xl bg-linear-to-tr from-black/20 to-transparent mix-blend-overlay"></div>
          <img
            src={premiumTajMahal}
            alt="Taj Mahal Premium Travel Photography"
            className="relative z-0 h-[520px] w-auto max-w-[480px] rounded-4xl object-cover"
          />
        </div>

        {/* Small floating badge */}
        <div className="glass absolute -bottom-6 -left-12 z-20 flex items-center gap-4 rounded-3xl bg-white/90 px-6 py-4 shadow-xl transition-transform hover:-translate-y-1">
          <div className="bg-brand-primary/10 text-brand-primary flex h-10 w-10 items-center justify-center rounded-full text-lg">
            ✨
          </div>
          <div>
            <p className="text-sm font-bold text-gray-900">Luxury Tours</p>
            <p className="mt-0.5 text-xs font-medium text-gray-500">
              Handcrafted
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroCard;
