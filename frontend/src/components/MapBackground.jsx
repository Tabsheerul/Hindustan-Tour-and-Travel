import React from 'react';

// Cartoon 3D Landmarks
import cartoonTajMahal from '../assets/cartoon_taj_mahal.png';
import cartoonHawaMahal from '../assets/cartoon_hawa_mahal.png';
import cartoonQutubMinar from '../assets/cartoon_qutub_minar.png';
import cartoonGateway from '../assets/cartoon_gateway.png';
import cartoonIndiaGate from '../assets/cartoon_india_gate.png';

export default function MapBackground() {
  return (
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

          {/* Route: enters from right → behind poster → only goes down into next sections */}
          <path id="gps-route" d="
            M 1600,450 
            L 900,450 Q 850,450 850,500 
            L 850,700 Q 850,750 800,750 
            L 500,750 Q 450,750 450,800 
            L 450,1050 Q 450,1100 500,1100 
            L 1300,1100 Q 1350,1100 1350,1150 
            L 1350,1500 Q 1350,1550 1300,1550 
            L 200,1550 Q 150,1550 150,1600 
            L 150,2100
          " />
          
          {/* Sleek Professional Top-Down Car (rotated -90° for correct orientation) */}
          <g id="sleek-car" transform="rotate(-90)">
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

          {/* Intersection Node on Main Route */}
          <g id="route-exit">
            <circle cx="0" cy="0" r="6" fill="#ffffff" stroke="#FF5E62" strokeWidth="3" />
            <circle cx="0" cy="0" r="12" fill="none" stroke="#FF5E62" strokeWidth="1" opacity="0.4">
              <animate attributeName="r" from="6" to="16" dur="2s" repeatCount="indefinite" />
              <animate attributeName="opacity" from="0.5" to="0" dur="2s" repeatCount="indefinite" />
            </circle>
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

        {/* ── Secondary Connector Paths (Driveways) ── */}
        <path d="
          M 450,950 L 390,950 
          M 1250,1100 L 1250,1040 
          M 1350,1400 L 1410,1400 
          M 150,1750 L 210,1750
        " fill="none" stroke="#94a3b8" strokeWidth="3" strokeDasharray="4 6" strokeLinecap="round" opacity="0.6" />

        {/* ── Route Exit Nodes ── */}
        {/* <use href="#route-exit" x="1300" y="450" /> */}
        <use href="#route-exit" x="450" y="950" />
        <use href="#route-exit" x="1250" y="1100" />
        <use href="#route-exit" x="1350" y="1400" />
        <use href="#route-exit" x="150" y="1750" />

        {/* ── Cartoon 3D Models ── */}

        {/* Taj Mahal — top right, just above the route entry (Hidden for later use) */}
        {/* 
        <g transform="translate(1300, 390)">
          <circle cx="0" cy="0" r="40" fill="rgba(0,0,0,0.1)" filter="blur(6px)" />
          <image href={cartoonTajMahal} x="-75" y="-85" width="150" height="150" />
          <text x="0" y="70" textAnchor="middle" fill="#334155" fontSize="16" fontWeight="700" fontFamily="Inter, system-ui, sans-serif" opacity="0.8">Taj Mahal</text>
          <text x="0" y="86" textAnchor="middle" fill="#94a3b8" fontSize="12" fontFamily="Inter, system-ui, sans-serif" opacity="0.6">Agra</text>
        </g>
        */}

        {/* Hawa Mahal — left side, just left of the route dropping down */}
        <g transform="translate(390, 950)">
          <circle cx="0" cy="0" r="40" fill="rgba(0,0,0,0.1)" filter="blur(6px)" />
          <image href={cartoonHawaMahal} x="-75" y="-85" width="150" height="150" />
          <text x="0" y="70" textAnchor="middle" fill="#334155" fontSize="16" fontWeight="700" fontFamily="Inter, system-ui, sans-serif" opacity="0.8">Hawa Mahal</text>
          <text x="0" y="86" textAnchor="middle" fill="#94a3b8" fontSize="12" fontFamily="Inter, system-ui, sans-serif" opacity="0.6">Jaipur</text>
        </g>

        {/* Qutub Minar — right side, just above the horizontal route sweep */}
        <g transform="translate(1250, 1040)">
          <circle cx="0" cy="0" r="40" fill="rgba(0,0,0,0.1)" filter="blur(6px)" />
          <image href={cartoonQutubMinar} x="-75" y="-85" width="150" height="150" />
          <text x="0" y="70" textAnchor="middle" fill="#334155" fontSize="16" fontWeight="700" fontFamily="Inter, system-ui, sans-serif" opacity="0.8">Qutub Minar</text>
          <text x="0" y="86" textAnchor="middle" fill="#94a3b8" fontSize="12" fontFamily="Inter, system-ui, sans-serif" opacity="0.6">New Delhi</text>
        </g>

        {/* Gateway of India — far right, just outside the final drop */}
        <g transform="translate(1410, 1400)">
          <circle cx="0" cy="0" r="40" fill="rgba(0,0,0,0.1)" filter="blur(6px)" />
          <image href={cartoonGateway} x="-75" y="-85" width="150" height="150" />
          <text x="0" y="70" textAnchor="middle" fill="#334155" fontSize="16" fontWeight="700" fontFamily="Inter, system-ui, sans-serif" opacity="0.8">Gateway of India</text>
          <text x="0" y="86" textAnchor="middle" fill="#94a3b8" fontSize="12" fontFamily="Inter, system-ui, sans-serif" opacity="0.6">Mumbai</text>
        </g>

        {/* India Gate — bottom left, just right of the final route exit */}
        <g transform="translate(210, 1750)">
          <circle cx="0" cy="0" r="40" fill="rgba(0,0,0,0.1)" filter="blur(6px)" />
          <image href={cartoonIndiaGate} x="-75" y="-85" width="150" height="150" />
          <text x="0" y="70" textAnchor="middle" fill="#334155" fontSize="16" fontWeight="700" fontFamily="Inter, system-ui, sans-serif" opacity="0.8">India Gate</text>
          <text x="0" y="86" textAnchor="middle" fill="#94a3b8" fontSize="12" fontFamily="Inter, system-ui, sans-serif" opacity="0.6">New Delhi</text>
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
  );
}
