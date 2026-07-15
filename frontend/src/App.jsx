import HeroCard from './components/HeroCard';
import Navbar from './components/Navbar';
import TripPlannerSection from './components/TripPlannerSection';

function App() {
  return (
    <div className="relative w-full min-h-screen">
      {/* Professional GPS Map & Travel Route Background */}
      <div className="absolute inset-0 overflow-hidden -z-20 pointer-events-none">
        
        {/* Soft glowing ambient light */}
        <div className="absolute top-[30vh] left-0 w-full h-[40vh] bg-gradient-to-t from-[#FF9933]/10 to-transparent blur-3xl mix-blend-multiply"></div>
        <div className="absolute top-[35vh] left-1/2 -translate-x-1/2 w-[70vw] h-[30vh] bg-gradient-to-t from-[#FF5E62]/5 to-transparent blur-3xl mix-blend-multiply"></div>

        {/* GPS Map Interface Layer */}
        <svg className="absolute top-0 left-0 w-full h-full mix-blend-multiply pointer-events-none" viewBox="0 0 1500 2000" preserveAspectRatio="xMidYMid slice">
          <defs>
            {/* Minimalist City Street Map Pattern */}
            <pattern id="street-map-pattern" width="400" height="400" patternUnits="userSpaceOnUse">
              <g fill="none" stroke="#cbd5e1" strokeWidth="1.5" opacity="0.3">
                <path d="M 0,100 L 400,100 M 0,300 L 400,300 M 150,0 L 150,400 M 350,0 L 350,400" />
                <path d="M 0,50 L 150,50 M 150,250 L 350,250 M 250,100 L 250,300 M 50,300 L 50,400" strokeDasharray="4 4" />
                <path d="M 0,200 L 400,200 M 100,0 L 100,400" stroke="#94a3b8" strokeWidth="2" opacity="0.4" />
              </g>
            </pattern>

            {/* Route: starts right → sweeps behind hero poster → descends with wide zigzags */}
            <path id="gps-route" d="
              M 1600,100 
              L 1100,100 Q 1050,100 1050,150 
              L 1050,400 Q 1050,450 1000,450 
              L 300,450 Q 250,450 250,500 
              L 250,900 Q 250,950 300,950 
              L 1200,950 Q 1250,950 1250,1000 
              L 1250,1400 Q 1250,1450 1200,1450 
              L 200,1450 Q 150,1450 150,1500 
              L 150,2100
            " />
            
            {/* Sleek Professional Top-Down Car */}
            <g id="sleek-car">
              {/* Soft Drop shadow for depth */}
              <rect x="-12" y="-22" width="24" height="44" rx="12" fill="rgba(0,0,0,0.2)" transform="translate(6, 6)" filter="blur(4px)"/>
              {/* Car Body */}
              <rect x="-12" y="-22" width="24" height="44" rx="12" fill="#ffffff" stroke="#e2e8f0" strokeWidth="1"/>
              {/* Roof & Windshields */}
              <rect x="-9" y="-8" width="18" height="20" rx="4" fill="#0f172a" opacity="0.9" />
              {/* Subtle tail lights */}
              <rect x="-9" y="20" width="6" height="2" rx="1" fill="#FF5E62" />
              <rect x="3" y="20" width="6" height="2" rx="1" fill="#FF5E62" />
              {/* Subtle headlights */}
              <rect x="-9" y="-22" width="6" height="2" rx="1" fill="#FF9933" opacity="0.5" />
              <rect x="3" y="-22" width="6" height="2" rx="1" fill="#FF9933" opacity="0.5" />
            </g>

            {/* Professional Map Pin */}
            <g id="map-pin">
              <path d="M 0,0 C -8,-10 -16,-20 -16,-28 C -16,-38 -8,-44 0,-44 C 8,-44 16,-38 16,-28 C 16,-20 8,-10 0,0 Z" fill="#FF5E62" />
              <circle cx="0" cy="-28" r="6" fill="#ffffff" />
              <ellipse cx="0" cy="4" rx="10" ry="3" fill="rgba(0,0,0,0.15)" filter="blur(2px)" />
            </g>
          </defs>

          {/* Draw Fake Minimalist Map Grid */}
          <rect x="0" y="0" width="100%" height="100%" fill="url(#street-map-pattern)" />

          {/* Draw GPS Route Glow (very subtle) */}
          <use href="#gps-route" fill="none" stroke="#FF5E62" strokeWidth="20" strokeLinecap="round" opacity="0.06" filter="blur(6px)" />
          
          {/* Draw GPS Route Outer Border */}
          <use href="#gps-route" fill="none" stroke="#0f172a" strokeWidth="14" strokeLinecap="round" opacity="0.04" />
          
          {/* Draw GPS Route Inner Track */}
          <use href="#gps-route" fill="none" stroke="#FF5E62" strokeWidth="6" strokeLinecap="round" opacity="0.35" />
          
          {/* Draw Flowing Directional Dashes */}
          <use href="#gps-route" fill="none" stroke="#ffffff" strokeWidth="2" strokeDasharray="12 24" strokeLinecap="round" opacity="0.5">
            <animate attributeName="stroke-dashoffset" from="72" to="0" dur="1.5s" repeatCount="indefinite" />
          </use>

          {/* ── Indian Landmark Pins with Place Names ── */}

          {/* Taj Mahal — where route enters from right and turns down */}
          <g transform="translate(1050, 100)">
            <use href="#map-pin" />
            <text x="24" y="-28" fill="#334155" fontSize="18" fontWeight="700" fontFamily="Inter, system-ui, sans-serif" opacity="0.5">Taj Mahal</text>
            <text x="24" y="-12" fill="#94a3b8" fontSize="12" fontFamily="Inter, system-ui, sans-serif" opacity="0.4">Agra</text>
          </g>

          {/* Hawa Mahal — where route sweeps left behind poster */}
          <g transform="translate(650, 450)">
            <use href="#map-pin" />
            <text x="24" y="-28" fill="#334155" fontSize="18" fontWeight="700" fontFamily="Inter, system-ui, sans-serif" opacity="0.5">Hawa Mahal</text>
            <text x="24" y="-12" fill="#94a3b8" fontSize="12" fontFamily="Inter, system-ui, sans-serif" opacity="0.4">Jaipur</text>
          </g>

          {/* Qutub Minar — far left where route drops down */}
          <g transform="translate(250, 900)">
            <use href="#map-pin" />
            <text x="24" y="-28" fill="#334155" fontSize="18" fontWeight="700" fontFamily="Inter, system-ui, sans-serif" opacity="0.5">Qutub Minar</text>
            <text x="24" y="-12" fill="#94a3b8" fontSize="12" fontFamily="Inter, system-ui, sans-serif" opacity="0.4">New Delhi</text>
          </g>

          {/* Gateway of India — far right where route zigzags back */}
          <g transform="translate(1250, 1000)">
            <use href="#map-pin" />
            <text x="-190" y="-28" fill="#334155" fontSize="18" fontWeight="700" fontFamily="Inter, system-ui, sans-serif" opacity="0.5">Gateway of India</text>
            <text x="-100" y="-12" fill="#94a3b8" fontSize="12" fontFamily="Inter, system-ui, sans-serif" opacity="0.4">Mumbai</text>
          </g>

          {/* India Gate — far left bottom where route ends */}
          <g transform="translate(200, 1450)">
            <use href="#map-pin" />
            <text x="24" y="-28" fill="#334155" fontSize="18" fontWeight="700" fontFamily="Inter, system-ui, sans-serif" opacity="0.5">India Gate</text>
            <text x="24" y="-12" fill="#94a3b8" fontSize="12" fontFamily="Inter, system-ui, sans-serif" opacity="0.4">New Delhi</text>
          </g>

          {/* Draw Animated Sleek Car */}
          <g>
            <use href="#sleek-car">
              <animateMotion dur="30s" repeatCount="indefinite" rotate="auto">
                <mpath href="#gps-route" />
              </animateMotion>
            </use>
          </g>
        </svg>
      </div>

      <Navbar />
      <HeroCard />
      <TripPlannerSection />
    </div>
  )
}

export default App