import premiumTajMahal from '../assets/premium_taj_mahal.png';

const HeroCard = () => {
  return (
    <div className="w-full min-h-[90vh] flex items-center justify-between px-16 py-32 max-w-7xl mx-auto relative gap-16">

      {/* Left — Text Content with lots of breathing room */}
      <div className="flex flex-col gap-6 max-w-xl z-10 text-left">
        {/* Tiny label */}
        <span className="text-xs font-semibold tracking-[0.25em] text-brand-primary uppercase">
          Explore India
        </span>

        {/* Headline */}
        <h1 className="text-7xl md:text-8xl font-bold leading-tight tracking-tight text-texture-mask py-2">
          Travel <br />
          <span className="text-gray-300 mix-blend-multiply">without</span> <br />
          limits.
        </h1>

        {/* Subtext */}
        <p className="text-lg md:text-xl text-gray-500 leading-relaxed max-w-sm mt-4 font-light">
          Discover the heart of India with handcrafted tours, personalised for every traveller. Let the journey be as beautiful as the destination.
        </p>

        {/* CTA */}
        <div className="flex items-center gap-6 mt-8">
          <button className="px-8 py-4 glass-dark text-white text-sm font-semibold rounded-full hover:bg-gray-800 transition-all shadow-lg hover:shadow-xl hover:-translate-y-0.5">
            Book a Tour
          </button>
          <button className="text-sm font-medium text-gray-500 hover:text-gray-900 transition-colors flex items-center gap-2 group">
            View Destinations
            <span className="text-xl leading-none group-hover:translate-x-1 transition-transform">→</span>
          </button>
        </div>
      </div>

      {/* Right — Floating image card, glassmorphic style */}
      <div className="hidden md:block relative shrink-0">
        {/* Subtle background blur element */}
        <div className="absolute -inset-10 bg-brand-primary/10 rounded-[4rem] blur-3xl -z-10"></div>

        {/* Image Card wrapped in glass */}
        <div className="glass p-4 rounded-[2.5rem] shadow-2xl relative bg-white/70">
          {/* Subtle gradient overlay to blend perfectly */}
          <div className="absolute inset-4 rounded-[2rem] bg-gradient-to-tr from-black/20 to-transparent pointer-events-none mix-blend-overlay z-10"></div>
          <img
            src={premiumTajMahal}
            alt="Taj Mahal Premium Travel Photography"
            className="h-[520px] w-auto max-w-[480px] rounded-[2rem] object-cover relative z-0"
          />
        </div>

        {/* Small floating badge */}
        <div className="absolute -bottom-6 -left-12 glass px-6 py-4 rounded-3xl flex items-center gap-4 hover:-translate-y-1 transition-transform shadow-xl bg-white/90 z-20">
          <div className="w-10 h-10 bg-brand-primary/10 rounded-full flex items-center justify-center text-brand-primary text-lg">✨</div>
          <div>
            <p className="text-sm font-bold text-gray-900">Luxury Tours</p>
            <p className="text-xs text-gray-500 font-medium mt-0.5">Handcrafted</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroCard;
