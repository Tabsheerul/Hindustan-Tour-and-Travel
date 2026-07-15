import { useState } from "react";

// ─── Vehicle Options ─────────────────────────────────────────────────────────
const vehicles = [
  { id: "mini", name: "Mini", icon: "🚗", seats: "4" },
  { id: "sedan", name: "Sedan", icon: "🚙", seats: "4" },
  { id: "suv", name: "SUV", icon: "🛻", seats: "6–7" },
  { id: "tempo", name: "Tempo", icon: "🚐", seats: "12" },
  { id: "bus", name: "Bus", icon: "🚌", seats: "40+" },
];

// ─── Component ───────────────────────────────────────────────────────────────
// Renders a compact vehicle type picker + 3D model placeholder.
// Layout is managed by TripPlannerSection.jsx
const VehicleSelector = () => {
  const [selected, setSelected] = useState("sedan");

  const selectedVehicle = vehicles.find((v) => v.id === selected);

  return (
    <div className="flex h-full flex-col gap-5">
      {/* Compact vehicle type pill buttons */}
      <div className="flex flex-wrap gap-2">
        {vehicles.map((vehicle) => (
          <button
            key={vehicle.id}
            onClick={() => setSelected(vehicle.id)}
            className={`flex items-center gap-1.5 rounded-full border px-3 py-2 text-xs font-semibold transition-all duration-200 ${
              selected === vehicle.id
                ? "border-gray-900 bg-gray-900 text-white"
                : "border-gray-200 bg-gray-50 text-gray-500 hover:border-gray-400 hover:text-gray-800"
            }`}
          >
            <span>{vehicle.icon}</span>
            <span>{vehicle.name}</span>
          </button>
        ))}
      </div>

      {/* ── 3D Model Placeholder ─────────────────────────────────────────────
          TODO: Replace this div with your actual 3D canvas.
          e.g. <Canvas camera={{ position: [0, 1, 5] }}>
                 <CarModel type={selected} />
               </Canvas>
      ──────────────────────────────────────────────────────────────────────── */}
      <div className="relative flex min-h-[240px] flex-1 flex-col items-center justify-center gap-3 overflow-hidden rounded-2xl border border-gray-100 bg-gray-50">
        {/* Selected vehicle label — top left */}
        <div className="absolute top-4 left-4 flex items-center gap-1.5">
          <span className="text-base">{selectedVehicle.icon}</span>
          <div className="leading-none">
            <p className="text-xs font-bold text-gray-700">
              {selectedVehicle.name}
            </p>
            <p className="text-[10px] text-gray-400">
              {selectedVehicle.seats} seats
            </p>
          </div>
        </div>

        {/* Placeholder content */}
        <div className="mb-1 text-4xl">{selectedVehicle.icon}</div>
        <p className="text-[10px] font-bold tracking-widest text-gray-300 uppercase">
          3D Model
        </p>

        {/* Subtle decorative circles */}
        <div className="pointer-events-none absolute -right-8 -bottom-8 h-32 w-32 rounded-full bg-orange-100/40" />
      </div>
    </div>
  );
};

export default VehicleSelector;
