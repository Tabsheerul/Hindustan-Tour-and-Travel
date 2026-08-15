import { useEffect, useRef, useState } from "react";
import { defaultStyleJson, OlaMaps } from "olamaps-web-sdk";

// ─── OlaMapView ───────────────────────────────────────────────────────────────
const STYLE_URL = defaultStyleJson;
const FIROZABAD = [78.3957, 27.1591];

const OlaMapView = ({
  pickupCoords,
  destinationCoords,
  defaultCenter,
  apiKey,
  isSheetCollapsed = false,
  pickMode = null,      // "pickup" | "destination" | null
  onMapClick,           // (lat, lng) => void  — fired when user clicks map in pick mode
}) => {
  const mapContainerRef = useRef(null);
  const olaMapsRef = useRef(null);
  const mapRef = useRef(null);
  const pickupMarkerRef = useRef(null);
  const destinationMarkerRef = useRef(null);
  const routeLayerRef = useRef(false);
  const resizeObserverRef = useRef(null);
  const pickModeClickHandler = useRef(null);

  const [mapReady, setMapReady] = useState(false);

  // ── STEP 1: Initialize the map ────────────────────────────────────────────
  useEffect(() => {
    if (!mapContainerRef.current) return;

    const setup = async () => {
      const olaMaps = new OlaMaps({ apiKey });
      olaMapsRef.current = olaMaps;

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

        if (mapContainerRef.current) {
          resizeObserverRef.current = new ResizeObserver(() => map.resize());
          resizeObserverRef.current.observe(mapContainerRef.current);
        }

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

  // ── STEP 1.5: Fly to defaultCenter ──────────────────────────────────────
  useEffect(() => {
    const map = mapRef.current;
    if (!mapReady || !map || !defaultCenter) return;
    if (!pickupCoords && !destinationCoords) {
      map.flyTo({
        center: [defaultCenter.lng, defaultCenter.lat],
        zoom: isSheetCollapsed ? 12 : 11,
        duration: 1500,
      });
    }
  }, [defaultCenter, isSheetCollapsed, mapReady, pickupCoords, destinationCoords]);

  // ── STEP 1.6: Camera control ─────────────────────────────────────────────
  useEffect(() => {
    const map = mapRef.current;
    if (!mapReady || !map) return;

    if (pickupCoords && !destinationCoords) {
      map.flyTo({ center: [pickupCoords.lng, pickupCoords.lat], zoom: 15, duration: 1200 });
    } else if (destinationCoords && !pickupCoords) {
      map.flyTo({ center: [destinationCoords.lng, destinationCoords.lat], zoom: 15, duration: 1200 });
    } else if (pickupCoords && destinationCoords) {
      const minLng = Math.min(pickupCoords.lng, destinationCoords.lng);
      const minLat = Math.min(pickupCoords.lat, destinationCoords.lat);
      const maxLng = Math.max(pickupCoords.lng, destinationCoords.lng);
      const maxLat = Math.max(pickupCoords.lat, destinationCoords.lat);
      map.fitBounds([[minLng, minLat], [maxLng, maxLat]], { padding: 80, duration: 1000 });
    }
  }, [pickupCoords, destinationCoords, mapReady]);

  // ── STEP 1.7: Pick-from-map mode ─────────────────────────────────────────
  useEffect(() => {
    const map = mapRef.current;
    if (!mapReady || !map) return;

    // Remove previous click handler
    if (pickModeClickHandler.current) {
      map.off("click", pickModeClickHandler.current);
      pickModeClickHandler.current = null;
    }

    if (pickMode && onMapClick) {
      map.getCanvas().style.cursor = "crosshair";
      const handler = (e) => {
        const { lat, lng } = e.lngLat;
        onMapClick(lat, lng);
      };
      map.on("click", handler);
      pickModeClickHandler.current = handler;
    } else {
      map.getCanvas().style.cursor = "";
    }

    return () => {
      if (pickModeClickHandler.current && map) {
        map.off("click", pickModeClickHandler.current);
        pickModeClickHandler.current = null;
        if (map.getCanvas()) map.getCanvas().style.cursor = "";
      }
    };
  }, [pickMode, mapReady, onMapClick]);

  // ── STEP 2: Pickup marker ─────────────────────────────────────────────────
  useEffect(() => {
    if (!mapReady || !olaMapsRef.current || !mapRef.current) return;
    if (pickupMarkerRef.current) { pickupMarkerRef.current.remove(); pickupMarkerRef.current = null; }
    if (!pickupCoords) return;

    const el = document.createElement("div");
    el.style.cssText = `width:16px;height:16px;background:#22c55e;border:3px solid white;border-radius:50%;box-shadow:0 2px 8px rgba(0,0,0,0.35);cursor:pointer;`;
    pickupMarkerRef.current = olaMapsRef.current
      .addMarker({ element: el, anchor: "center" })
      .setLngLat([pickupCoords.lng, pickupCoords.lat])
      .addTo(mapRef.current);
  }, [pickupCoords, mapReady]);

  // ── STEP 3: Destination marker ────────────────────────────────────────────
  useEffect(() => {
    if (!mapReady || !olaMapsRef.current || !mapRef.current) return;
    if (destinationMarkerRef.current) { destinationMarkerRef.current.remove(); destinationMarkerRef.current = null; }
    if (!destinationCoords) return;

    const el = document.createElement("div");
    el.style.cssText = `width:16px;height:16px;background:#ef4444;border:3px solid white;border-radius:50%;box-shadow:0 2px 8px rgba(0,0,0,0.35);cursor:pointer;`;
    destinationMarkerRef.current = olaMapsRef.current
      .addMarker({ element: el, anchor: "center" })
      .setLngLat([destinationCoords.lng, destinationCoords.lat])
      .addTo(mapRef.current);
  }, [destinationCoords, mapReady]);

  // ── STEP 4: Route polyline ────────────────────────────────────────────────
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

    if (!pickupCoords || !destinationCoords) { clearRoute(); return; }

    const fetchAndDrawRoute = async () => {
      try {
        const res = await fetch(
          `https://api.olamaps.io/routing/v1/directions?origin=${pickupCoords.lat},${pickupCoords.lng}&destination=${destinationCoords.lat},${destinationCoords.lng}&api_key=${apiKey}`,
          { method: "POST" }
        );
        const data = await res.json();
        const encodedPolyline = data?.routes?.[0]?.overview_polyline;
        if (!encodedPolyline) return;

        const coordinates = decodePolyline(encodedPolyline);
        clearRoute();

        map.addSource("ola-route", {
          type: "geojson",
          data: { type: "Feature", geometry: { type: "LineString", coordinates } },
        });
        map.addLayer({
          id: "ola-route",
          type: "line",
          source: "ola-route",
          layout: { "line-join": "round", "line-cap": "round" },
          paint: { "line-color": "#FF5E62", "line-width": 4, "line-opacity": 0.85 },
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

      {/* Pick-mode banner overlay */}
      {pickMode && (
        <div
          style={{
            position: "absolute",
            top: 12,
            left: "50%",
            transform: "translateX(-50%)",
            background: pickMode === "pickup" ? "#22c55e" : "#ef4444",
            color: "white",
            padding: "8px 18px",
            borderRadius: "999px",
            fontSize: 13,
            fontWeight: 700,
            boxShadow: "0 4px 16px rgba(0,0,0,0.25)",
            pointerEvents: "none",
            whiteSpace: "nowrap",
            zIndex: 10,
            display: "flex",
            alignItems: "center",
            gap: 8,
          }}
        >
          <span>{pickMode === "pickup" ? "📍" : "🏁"}</span>
          <span>Click on map to set {pickMode === "pickup" ? "Pickup" : "Destination"} point</span>
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
