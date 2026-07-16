import { useEffect, useRef, useState } from "react";
import { OlaMaps } from "olamaps-web-sdk";

// ─── OlaMapView ───────────────────────────────────────────────────────────────
// Correct style URL from OLA Maps styles catalog:
// GET /tiles/vector/v1/styles.json → returns array of available styles
// We use "default-light-standard" which matches the app's light theme.
const STYLE_URL =
  "https://api.olamaps.io/tiles/vector/v1/styles/default-light-standard/style.json";

const OlaMapView = ({ pickupCoords, destinationCoords, defaultCenter, apiKey }) => {
  const mapContainerRef = useRef(null);
  const olaMapsRef = useRef(null);    // OlaMaps SDK instance
  const mapRef = useRef(null);        // actual MapLibre map instance (after await)
  const pickupMarkerRef = useRef(null);
  const destinationMarkerRef = useRef(null);
  const routeLayerRef = useRef(false);

  // Track when the map has fully loaded so other effects know it's safe to use
  const [mapReady, setMapReady] = useState(false);

  // ── STEP 1: Initialize the map ────────────────────────────────────────────
  // olaMaps.init() is ASYNC — must be awaited to get the real map instance.
  // Without await, mapRef.current would be a Promise, not a map.
  useEffect(() => {
    if (!mapContainerRef.current) return;

    const setup = async () => {
      const olaMaps = new OlaMaps({ apiKey });
      olaMapsRef.current = olaMaps;

      // Use user's IP-detected city if available, otherwise center of India
      const initialCenter = defaultCenter
        ? [defaultCenter.lng, defaultCenter.lat]
        : [78.9629, 20.5937];

      // await is critical — init() returns a Promise<MapInstance>
      const map = await olaMaps.init({
        style: STYLE_URL,
        container: mapContainerRef.current,
        center: initialCenter,
        zoom: defaultCenter ? 11 : 4,
      });

      mapRef.current = map;

      // Once the style is loaded, signal React the map is interactive
      // Also fly to user's city if no booking coords are set yet
      map.on("load", () => {
        setMapReady(true);
        if (!pickupCoords && !destinationCoords && defaultCenter) {
          map.flyTo({
            center: [defaultCenter.lng, defaultCenter.lat],
            zoom: 11,
            duration: 1500,
          });
        }
      });
    };

    setup();

    return () => {
      mapRef.current = null;
      olaMapsRef.current = null;
    };
  }, []);

  // ── STEP 2: Pickup marker ─────────────────────────────────────────────────
  // Only runs after mapReady is true, so the map is guaranteed to be loaded
  useEffect(() => {
    if (!mapReady || !olaMapsRef.current || !mapRef.current) return;

    // Remove old pickup marker
    if (pickupMarkerRef.current) {
      pickupMarkerRef.current.remove();
      pickupMarkerRef.current = null;
    }

    if (!pickupCoords) return;

    // Green circle = pickup point
    const el = document.createElement("div");
    el.style.cssText = `
      width: 16px; height: 16px;
      background: #22c55e;
      border: 3px solid white;
      border-radius: 50%;
      box-shadow: 0 2px 8px rgba(0,0,0,0.35);
      cursor: pointer;
    `;

    pickupMarkerRef.current = olaMapsRef.current
      .addMarker({ element: el, anchor: "center" })
      .setLngLat([pickupCoords.lng, pickupCoords.lat])
      .addTo(mapRef.current);

    mapRef.current.flyTo({
      center: [pickupCoords.lng, pickupCoords.lat],
      zoom: 11,
      duration: 1200,
    });
  }, [pickupCoords, mapReady]);

  // ── STEP 3: Destination marker ────────────────────────────────────────────
  useEffect(() => {
    if (!mapReady || !olaMapsRef.current || !mapRef.current) return;

    if (destinationMarkerRef.current) {
      destinationMarkerRef.current.remove();
      destinationMarkerRef.current = null;
    }

    if (!destinationCoords) return;

    // Red circle = destination point
    const el = document.createElement("div");
    el.style.cssText = `
      width: 16px; height: 16px;
      background: #ef4444;
      border: 3px solid white;
      border-radius: 50%;
      box-shadow: 0 2px 8px rgba(0,0,0,0.35);
      cursor: pointer;
    `;

    destinationMarkerRef.current = olaMapsRef.current
      .addMarker({ element: el, anchor: "center" })
      .setLngLat([destinationCoords.lng, destinationCoords.lat])
      .addTo(mapRef.current);

    mapRef.current.flyTo({
      center: [destinationCoords.lng, destinationCoords.lat],
      zoom: 11,
      duration: 1200,
    });
  }, [destinationCoords, mapReady]);

  // ── STEP 4: Route polyline between both points ────────────────────────────
  useEffect(() => {
    const map = mapRef.current;
    if (!mapReady || !map) return;

    const clearRoute = () => {
      if (routeLayerRef.current) {
        if (map.getLayer("ola-route")) map.removeLayer("ola-route");
        if (map.getSource("ola-route")) map.removeSource("ola-route");
        routeLayerRef.current = false;
      }
    };

    if (!pickupCoords || !destinationCoords) {
      clearRoute();
      return;
    }

    const fetchAndDrawRoute = async () => {
      try {
        const res = await fetch(
          `https://api.olamaps.io/routing/v1/directions?origin=${pickupCoords.lat},${pickupCoords.lng}&destination=${destinationCoords.lat},${destinationCoords.lng}&api_key=${apiKey}`,
        );
        const data = await res.json();

        const encodedPolyline = data?.routes?.[0]?.overview_polyline?.points;
        if (!encodedPolyline) return;

        const coordinates = decodePolyline(encodedPolyline);

        clearRoute();

        map.addSource("ola-route", {
          type: "geojson",
          data: {
            type: "Feature",
            geometry: { type: "LineString", coordinates },
          },
        });

        map.addLayer({
          id: "ola-route",
          type: "line",
          source: "ola-route",
          layout: { "line-join": "round", "line-cap": "round" },
          paint: {
            "line-color": "#FF5E62",
            "line-width": 4,
            "line-opacity": 0.85,
          },
        });

        routeLayerRef.current = true;

        map.fitBounds(
          [
            [pickupCoords.lng, pickupCoords.lat],
            [destinationCoords.lng, destinationCoords.lat],
          ],
          { padding: 80, duration: 1000 },
        );
      } catch (err) {
        console.error("Error fetching OLA route:", err);
      }
    };

    fetchAndDrawRoute();
  }, [pickupCoords, destinationCoords, mapReady]);

  return (
    <div className="relative h-full w-full overflow-hidden rounded-3xl border border-gray-200 shadow-inner">
      <div ref={mapContainerRef} className="h-full w-full" />

      {!pickupCoords && !destinationCoords && (
        <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center gap-2 bg-white/50 backdrop-blur-sm">
          <span className="text-4xl">🗺️</span>
          <p className="text-sm font-semibold text-gray-500">
            Enter pickup &amp; destination
          </p>
          <p className="text-xs text-gray-400">to see the live route</p>
        </div>
      )}
    </div>
  );
};

// ─── Utility: Decode Google-encoded Polyline → [[lng, lat], ...] ─────────────
function decodePolyline(encoded) {
  const coords = [];
  let index = 0, lat = 0, lng = 0;
  while (index < encoded.length) {
    let b, shift = 0, result = 0;
    do { b = encoded.charCodeAt(index++) - 63; result |= (b & 0x1f) << shift; shift += 5; } while (b >= 0x20);
    lat += result & 1 ? ~(result >> 1) : result >> 1;
    shift = 0; result = 0;
    do { b = encoded.charCodeAt(index++) - 63; result |= (b & 0x1f) << shift; shift += 5; } while (b >= 0x20);
    lng += result & 1 ? ~(result >> 1) : result >> 1;
    coords.push([lng / 1e5, lat / 1e5]);
  }
  return coords;
}

export default OlaMapView;
