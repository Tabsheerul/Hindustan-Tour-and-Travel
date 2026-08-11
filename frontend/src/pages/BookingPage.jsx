import React, { useState } from "react";
import { useLocation, Link } from "react-router-dom";
import BookingSection from "../components/BookingSection";
import OlaMapView from "../components/OlaMapView";
import { CONTACT_INFO } from "../data/contactData";

const FIROZABAD_CENTER = { lat: 27.1591, lng: 78.3957 };
const OLA_API_KEY = import.meta.env.VITE_OLA_MAPS_API_KEY;

export default function BookingPage() {
  const location = useLocation();
  const initialState = location.state || {};

  // For the map
  const [pickupCoords, setPickupCoords] = useState(initialState.pickupCoords || null);
  const [destinationCoords, setDestinationCoords] = useState(initialState.destinationCoords || null);

  const [serviceType, setServiceType] = useState("Cars");

  const handleCoordsChange = ({ pickup, destination }) => {
    setPickupCoords(pickup);
    setDestinationCoords(destination);
  };

  return (
    <div className="min-h-screen bg-white flex flex-col">
      {/* Header */}
      <header className="sticky top-0 z-40 border-b border-gray-200 bg-white/90 backdrop-blur-md">
        <div className="mx-auto flex max-w-7xl items-center px-6 py-4 lg:px-8">
          <Link to="/" className="flex flex-col mr-8">
            <span className="text-[15px] font-black tracking-widest uppercase text-[#FF5E62]">Hindustan</span>
            <span className="text-[13px] font-medium tracking-[0.18em] text-gray-500 uppercase">Tour &amp; Travels</span>
          </Link>
          <div className="flex-1"></div>
          <a href={`tel:${CONTACT_INFO.phones[0].number.replace(/\s/g, "")}`} className="flex items-center gap-2 font-bold text-gray-900 transition-colors hover:text-[#FF5E62]">
            <span className="text-xl">📞</span> <span className="hidden sm:inline">{CONTACT_INFO.phones[0].number}</span>
          </a>
        </div>
      </header>

      <main className="flex-1 mx-auto w-full max-w-7xl px-6 py-8 lg:px-8 flex flex-col lg:flex-row gap-10">
        
        {/* Left Side: Forms */}
        <div className="lg:w-[450px] shrink-0 flex flex-col gap-8">
          <div>
            <div className="mb-4">
              <Link
                to="/"
                className="inline-flex items-center gap-1.5 text-sm font-semibold text-gray-500 transition-colors hover:text-gray-900"
              >
                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
                </svg>
                Back to Home
              </Link>
            </div>
            <h1 className="text-4xl font-extrabold text-gray-900 mb-2 tracking-tight">Book Your Ride</h1>
            <p className="text-gray-600 text-lg">Select a service and confirm your trip details.</p>
          </div>

          {/* Service Selection */}
          <div className="flex bg-gray-100 rounded-2xl p-1.5 shadow-inner">
            {["Cars", "Buses", "Tempo", "Wedding"].map((type) => (
              <button
                key={type}
                onClick={() => setServiceType(type)}
                className={`flex-1 py-2.5 text-sm font-bold rounded-xl transition-all duration-300 ${
                  serviceType === type ? "bg-white text-gray-900 shadow-sm" : "text-gray-500 hover:text-gray-800"
                }`}
              >
                {type}
              </button>
            ))}
          </div>

          {/* Form wrapper */}
          <div className="bg-gray-50/50 p-6 sm:p-8 rounded-[2rem] border border-gray-200">
            {/* The BookingSection component uses the initialState prop to prefill */}
            <BookingSection 
              initialState={initialState} 
              onCoordsChange={handleCoordsChange} 
              isBookingPage={true} 
            />
          </div>

          {/* Consult Banner */}
          <div className="bg-[#FF5E62]/10 border border-[#FF5E62]/20 rounded-3xl p-8 text-center flex flex-col items-center">
            <div className="h-12 w-12 rounded-full bg-white flex items-center justify-center text-2xl shadow-sm mb-4">
              💁‍♂️
            </div>
            <h3 className="text-xl font-extrabold text-gray-900 mb-2">Need help deciding?</h3>
            <p className="text-sm text-gray-600 mb-6 leading-relaxed">Call our experts to find the perfect vehicle for your {serviceType.toLowerCase()} trip.</p>
            <a 
              href={`tel:${CONTACT_INFO.phones[1].number.replace(/\s/g, "")}`} 
              className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-gray-900 px-7 py-3.5 text-sm font-bold text-white transition-all hover:bg-[#FF5E62]"
            >
              Consult Now 
            </a>
          </div>
        </div>

        {/* Right Side: Map */}
        <div className="flex-1 bg-gray-50 rounded-[2.5rem] border border-gray-200 overflow-hidden min-h-[500px] lg:min-h-full p-4 relative">
          <div className="absolute top-8 left-8 z-10 bg-white/90 backdrop-blur-md px-4 py-2 rounded-xl shadow-md border border-gray-100">
            <p className="text-sm font-bold text-gray-900">Live Route Map</p>
            <p className="text-xs text-gray-500">Real-time distance & duration</p>
          </div>
           <OlaMapView
             pickupCoords={pickupCoords}
             destinationCoords={destinationCoords}
             defaultCenter={FIROZABAD_CENTER}
             apiKey={OLA_API_KEY}
           />
        </div>
      </main>
    </div>
  );
}
