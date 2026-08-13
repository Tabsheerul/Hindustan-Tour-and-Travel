import { useEffect, useRef, useState } from "react";
import { defaultStyleJson, OlaMaps } from "olamaps-web-sdk";

// ─── OlaMapView ───────────────────────────────────────────────────────────────
// Use the style revision bundled with the installed SDK. The unversioned endpoint
// can return a 3D layer that references a source layer absent from its vector data.
const STYLE_URL = defaultStyleJson;

// Firozabad coordinates: 27.1591°N, 78.3957°E
const FIROZABAD = [78.3957, 27.1591];

const OlaMapView = ({ pickupCoords, destinationCoords, defaultCenter, apiKey, isSheetCollapsed = false }) => {
  const mapContainerRef = useRef(null);
  const olaMapsRef = useRef(null);    // OlaMaps SDK instance
  const mapRef = useRef(null);        // actual MapLibre map instance (after await)
  const pickupMarkerRef = useRef(null);
  const destinationMarkerRef = useRef(null);
  const routeLayerRef = useRef(false);
  const resizeObserverRef = useRef(null);

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

      // await is critical — init() returns a Promise<MapInstance>
      // Default center is Firozabad with a closer zoom since this is a local business
      const center = defaultCenter
        ? [defaultCenter.lng, defaultCenter.lat]
        : FIROZABAD;

      try {
        const map = await olaMaps.init({
          style: STYLE_URL,
          container: mapContainerRef.current,
          center,
          zoom: 11,
        });

        mapRef.current = map;

        // The container changes size when the responsive layout stacks. Explicitly
        // resizing keeps the canvas visible instead of leaving a blank map on mobile.
        resizeObserverRef.current = new ResizeObserver(() => map.resize());
        resizeObserverRef.current.observe(mapContainerRef.current);

        map.on("load", () => {
          map.resize();
          setMapReady(true);
        });
      } catch (error) {
        console.error("Unable to initialize OLA map:", error);
      }
    };

    setup();

    return () => {
      resizeObserverRef.current?.disconnect();
      mapRef.current?.remove();
      mapRef.current = null;
      olaMapsRef.current = null;
    };
  }, []);

  // ── STEP 1.5: Fly to defaultCenter when it becomes available ────────────────
  useEffect(() => {
    const map = mapRef.current;
    if (!mapReady || !map || !defaultCenter) return;
    
    // Only fly to defaultCenter if user hasn't set custom coords yet
    if (!pickupCoords && !destinationCoords) {
      map.flyTo({
        center: [defaultCenter.lng, defaultCenter.lat],
        zoom: isSheetCollapsed ? 12 : 11,
        duration: 1500,
      });
    }
  }, [defaultCenter, isSheetCollapsed, mapReady, pickupCoords, destinationCoords]);

  // ── STEP 1.6: Camera control for single point selection ─────────────────────
  // If user only selected ONE point, zoom in close (15) to that point.
  // If both are selected, frame them both instantly.
  useEffect(() => {
    const map = mapRef.current;
    if (!mapReady || !map) return;

    if (pickupCoords && !destinationCoords) {
      map.flyTo({
        center: [pickupCoords.lng, pickupCoords.lat],
        zoom: 15,
        duration: 1200,
      });
    } else if (destinationCoords && !pickupCoords) {
      map.flyTo({
        center: [destinationCoords.lng, destinationCoords.lat],
        zoom: 15,
        duration: 1200,
      });
    } else if (pickupCoords && destinationCoords) {
      const minLng = Math.min(pickupCoords.lng, destinationCoords.lng);
      const minLat = Math.min(pickupCoords.lat, destinationCoords.lat);
      const maxLng = Math.max(pickupCoords.lng, destinationCoords.lng);
      const maxLat = Math.max(pickupCoords.lat, destinationCoords.lat);
      
      map.fitBounds(
        [
          [minLng, minLat],
          [maxLng, maxLat],
        ],
        { padding: 80, duration: 1000 },
      );
    }
  }, [pickupCoords, destinationCoords, mapReady]);

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
          { method: "POST" }
        );
        const data = await res.json();

        // OLA Maps returns the encoded string directly on overview_polyline (unlike Google Maps)
        const encodedPolyline = data?.routes?.[0]?.overview_polyline;
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
      } catch (err) {
        console.error("Error fetching OLA route:", err);
      }
    };

    fetchAndDrawRoute();
  }, [pickupCoords, destinationCoords, mapReady]);

  return (
    <div className="relative h-full min-h-[240px] w-full overflow-hidden rounded-3xl border border-gray-200 bg-gray-100 shadow-inner sm:min-h-[340px] lg:min-h-0">
      <div ref={mapContainerRef} className="h-full w-full" />
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
