import React, { useRef, useState, useCallback } from "react";
import { useLocation, Link } from "react-router-dom";
import BookingSection from "../components/BookingSection";
import OlaMapView from "../components/OlaMapView";
import { CONTACT_INFO } from "../data/contactData";

const FIROZABAD_CENTER = { lat: 27.1591, lng: 78.3957 };
const OLA_API_KEY = import.meta.env.VITE_OLA_MAPS_API_KEY;

// Sheet snap positions as percentage of the main area height
// "collapsed" → sheet shows 20%, map shows 80%
// "expanded"  → sheet shows 52%, map shows 48%
const SNAP = {
  collapsed: 90, // translateY as % — sheet peeking at 10vh
  expanded: 45,  // translateY as % — sheet at ~52%
};

export default function BookingPage() {
  const location = useLocation();
  const initialState = location.state || {};

  const [pickupCoords, setPickupCoords] = useState(initialState.pickupCoords || null);
  const [destinationCoords, setDestinationCoords] = useState(initialState.destinationCoords || null);
  const [serviceType, setServiceType] = useState(initialState.serviceType || "Cars");
  const [vehicleVariant, setVehicleVariant] = useState("5 Seater");

  // Sheet state: "expanded" | "collapsed"
  const [sheetSnap, setSheetSnap] = useState("expanded");

  // Touch tracking
  const touchStartY = useRef(null);
  const touchCurrentY = useRef(null);
  const sheetRef = useRef(null);
  const isDragging = useRef(false);

  const handleCoordsChange = ({ pickup, destination }) => {
    setPickupCoords(pickup);
    setDestinationCoords(destination);
  };

  const handleServiceChange = (type) => {
    setServiceType(type);
    if (type === "Cars") setVehicleVariant("5 Seater");
    else if (type === "Tempo") setVehicleVariant("16 Seater");
    else if (type === "Buses") setVehicleVariant("Non AC");
    else setVehicleVariant("");
  };

  // ── Touch / Drag handlers ────────────────────────────────────────────────
  const onTouchStart = useCallback((e) => {
    touchStartY.current = e.touches[0].clientY;
    touchCurrentY.current = e.touches[0].clientY;
    isDragging.current = true;
    // Disable transition while dragging for real-time feel
    if (sheetRef.current) {
      sheetRef.current.style.transition = "none";
    }
  }, []);

  const onTouchMove = useCallback((e) => {
    if (!isDragging.current) return;
    touchCurrentY.current = e.touches[0].clientY;

    const delta = touchCurrentY.current - touchStartY.current;
    const mainHeight = sheetRef.current?.parentElement?.offsetHeight || window.innerHeight;
    const currentSnap = sheetSnap === "expanded" ? SNAP.expanded : SNAP.collapsed;
    // Current translateY in px
    const currentPx = (currentSnap / 100) * mainHeight;
    const newPx = Math.min(Math.max(currentPx + delta, (SNAP.expanded / 100) * mainHeight), (SNAP.collapsed / 100) * mainHeight);

    if (sheetRef.current) {
      sheetRef.current.style.transform = `translateY(${newPx}px)`;
    }
  }, [sheetSnap]);

  const onTouchEnd = useCallback(() => {
    isDragging.current = false;
    // Re-enable transition
    if (sheetRef.current) {
      sheetRef.current.style.transition = "";
    }

    const delta = (touchCurrentY.current || 0) - (touchStartY.current || 0);

    if (delta > 40) {
      // Swiped down → collapse
      setSheetSnap("collapsed");
    } else if (delta < -40) {
      // Swiped up → expand
      setSheetSnap("expanded");
    } else {
      // Snap back to current state (transition handles it)
      setSheetSnap((prev) => prev);
    }

    // Clear the inline transform so CSS class takes over
    if (sheetRef.current) {
      sheetRef.current.style.transform = "";
    }

    touchStartY.current = null;
    touchCurrentY.current = null;
  }, []);

  const isExpanded = sheetSnap === "expanded";

  return (
    <div className="booking-page-root">
      {/* ── Embedded Styles ─────────────────────────────────────────── */}
      <style>{`
        /* Root fills the entire viewport */
        .booking-page-root {
          position: fixed;
          inset: 0;
          display: flex;
          flex-direction: column;
          background: #f8f8f8;
          overflow: hidden;
          font-family: 'Inter', system-ui, sans-serif;
        }

        /* ── HEADER ── */
        .bp-header {
          position: relative;
          z-index: 50;
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 10px 16px;
          background: rgba(255,255,255,0.95);
          backdrop-filter: blur(12px);
          border-bottom: 1px solid rgba(0,0,0,0.06);
          box-shadow: 0 1px 8px rgba(0,0,0,0.06);
          flex-shrink: 0;
        }
        .bp-logo-text { line-height: 1.1; }
        .bp-logo-text .brand { font-size: 15px; font-weight: 900; letter-spacing: 0.12em; text-transform: uppercase; color: #FF5E62; }
        .bp-logo-text .sub   { font-size: 9px;  font-weight: 500; letter-spacing: 0.18em; text-transform: uppercase; color: #9ca3af; }
        .bp-back-btn {
          display: flex; align-items: center; gap: 6px;
          padding: 7px 14px; border-radius: 999px;
          background: #f3f4f6; border: none; cursor: pointer;
          font-size: 12px; font-weight: 700; color: #374151;
          text-decoration: none; transition: background 0.2s;
        }
        .bp-back-btn:hover { background: #e5e7eb; }

        /* ── MAP AREA (fills remaining space) ── */
        .bp-map-area {
          position: relative;
          flex: 1;
          min-height: 0;
          overflow: hidden;
        }
        /* Map viewport shifts up smoothly to stay visible above the sheet */
        .bp-map-viewport {
          position: absolute;
          inset: 0;
          transition: padding-bottom 0.42s cubic-bezier(0.32, 0.72, 0, 1);
        }
        .bp-map-badge {
          position: absolute;
          top: 12px; left: 12px;
          z-index: 10;
          background: rgba(255,255,255,0.92);
          backdrop-filter: blur(10px);
          border: 1px solid rgba(0,0,0,0.08);
          border-radius: 14px;
          padding: 8px 12px;
          box-shadow: 0 4px 16px rgba(0,0,0,0.1);
        }
        .bp-map-badge p:first-child { font-size: 12px; font-weight: 800; color: #111827; margin: 0; }
        .bp-map-badge p:last-child  { font-size: 10px; color: #6b7280; margin: 0; }

        /* ── BOTTOM SHEET ── */
        .bp-sheet-wrapper {
          /* Positioned absolute over the map area */
          position: absolute;
          bottom: 0; left: 0; right: 0;
          z-index: 40;
          /* The sheet height is always 100% of the map area; 
             translateY controls how much is visible */
          height: 100%;
          /* Pointer-events only on the sheet card itself */
          pointer-events: none;
        }
        .bp-sheet {
          position: absolute;
          bottom: 0; left: 0; right: 0;
          height: 100%;
          background: #fff;
          border-radius: 26px 26px 0 0;
          box-shadow: 0 -6px 40px rgba(0,0,0,0.13);
          display: flex;
          flex-direction: column;
          overflow: hidden;
          pointer-events: all;
          /* Default: expanded snap (translateY = SNAP.expanded%) */
          transform: translateY(${SNAP.expanded}%);
          transition: transform 0.42s cubic-bezier(0.32, 0.72, 0, 1);
          will-change: transform;
          touch-action: none;
        }
        .bp-sheet.collapsed {
          transform: translateY(${SNAP.collapsed}%);
        }
        .bp-sheet.expanded {
          transform: translateY(${SNAP.expanded}%);
        }

        /* Handle bar */
        .bp-handle-zone {
          flex-shrink: 0;
          padding: 10px 16px 4px;
          cursor: grab;
          user-select: none;
          -webkit-user-select: none;
          touch-action: none;
        }
        .bp-handle-zone:active { cursor: grabbing; }
        .bp-handle-bar {
          width: 40px; height: 4px;
          background: #d1d5db;
          border-radius: 99px;
          margin: 0 auto 10px;
          transition: background 0.2s;
        }
        .bp-handle-zone:hover .bp-handle-bar { background: #9ca3af; }

        /* Sheet header row */
        .bp-sheet-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 0 16px 12px;
          flex-shrink: 0;
        }
        .bp-sheet-title   { font-size: 22px; font-weight: 900; color: #111827; margin: 0; letter-spacing: -0.4px; }
        .bp-sheet-subtitle{ font-size: 12px; color: #6b7280; margin: 4px 0 0; }
        .bp-chevron-btn {
          width: 34px; height: 34px;
          border-radius: 50%;
          background: #f3f4f6;
          border: none; cursor: pointer;
          display: flex; align-items: center; justify-content: center;
          color: #6b7280;
          transition: background 0.2s, transform 0.35s cubic-bezier(0.32,0.72,0,1);
          flex-shrink: 0;
        }
        .bp-chevron-btn:hover { background: #e5e7eb; }
        .bp-chevron-btn.rotated { transform: rotate(180deg); }

        /* Sheet scrollable body */
        .bp-sheet-body {
          flex: 1;
          overflow-y: auto;
          overscroll-behavior: contain;
          padding: 0 16px 32px;
          display: flex;
          flex-direction: column;
          gap: 14px;
          -webkit-overflow-scrolling: touch;
        }
        .bp-sheet-body::-webkit-scrollbar { display: none; }

        /* Collapsed overlay hint */
        .bp-collapsed-hint {
          position: absolute;
          inset: 0;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          gap: 6px;
          cursor: pointer;
          padding-bottom: env(safe-area-inset-bottom, 0px);
        }
        .bp-collapsed-hint-text { font-size: 13px; font-weight: 700; color: #374151; }
        .bp-collapsed-hint-sub  { font-size: 11px; color: #9ca3af; }

        /* ── Service Tab Pills ── */
        .bp-service-tabs {
          display: flex;
          background: #f3f4f6;
          border-radius: 16px;
          padding: 4px;
          gap: 2px;
          flex-shrink: 0;
        }
        .bp-tab-btn {
          flex: 1; padding: 9px 0;
          border: none; background: transparent;
          border-radius: 12px;
          font-size: 13px; font-weight: 700;
          color: #9ca3af; cursor: pointer;
          transition: all 0.25s;
        }
        .bp-tab-btn.active {
          background: #fff;
          color: #111827;
          box-shadow: 0 2px 10px rgba(0,0,0,0.08);
        }

        /* ── Variant Pills ── */
        .bp-variant-tabs {
          display: flex;
          background: #f9fafb;
          border: 1px solid #f0f0f0;
          border-radius: 14px;
          padding: 3px;
          gap: 2px;
        }
        .bp-variant-btn {
          flex: 1; padding: 7px 0;
          border: none; background: transparent;
          border-radius: 10px;
          font-size: 11px; font-weight: 700;
          color: #9ca3af; cursor: pointer;
          transition: all 0.2s;
        }
        .bp-variant-btn.active {
          background: #fff;
          color: #FF5E62;
          border: 1px solid #fee2e2;
          box-shadow: 0 1px 6px rgba(255,94,98,0.1);
        }

        /* ── Form card ── */
        .bp-form-card {
          background: #fafafa;
          border: 1px solid #e5e7eb;
          border-radius: 20px;
          padding: 16px;
        }

        /* ── Consult card ── */
        .bp-consult-card {
          background: linear-gradient(135deg, #fff5f5 0%, #fff0f0 100%);
          border: 1px solid rgba(255,94,98,0.15);
          border-radius: 20px;
          padding: 18px;
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
          gap: 4px;
          padding-bottom: calc(18px + env(safe-area-inset-bottom, 0px));
        }
        .bp-consult-icon {
          width: 46px; height: 46px;
          background: #fff;
          border-radius: 50%;
          display: flex; align-items: center; justify-content: center;
          font-size: 22px;
          box-shadow: 0 2px 10px rgba(0,0,0,0.08);
          margin-bottom: 8px;
        }
        .bp-consult-title { font-size: 15px; font-weight: 800; color: #111827; margin: 0; }
        .bp-consult-sub   { font-size: 11px; color: #6b7280; margin: 4px 0 10px; line-height: 1.5; }
        .bp-consult-btn {
          display: flex; align-items: center; justify-content: center; gap: 6px;
          width: 100%; padding: 11px 0;
          background: #111827; color: #fff;
          border: none; border-radius: 99px;
          font-size: 13px; font-weight: 700; cursor: pointer;
          text-decoration: none;
          transition: background 0.2s, transform 0.15s;
        }
        .bp-consult-btn:hover { background: #FF5E62; transform: scale(1.02); }

        /* ── DESKTOP LAYOUT (lg+) ── */
        @media (min-width: 1024px) {
          .bp-sheet-wrapper { display: none; }
          .bp-desktop-sidebar {
            display: flex !important;
          }
          .booking-page-root {
            flex-direction: row; /* override below */
          }
        }

        /* Desktop sidebar (hidden on mobile) */
        .bp-desktop-sidebar {
          display: none;
          width: 380px;
          flex-shrink: 0;
          flex-direction: column;
          overflow-y: auto;
          background: #fff;
          border-right: 1px solid #e5e7eb;
          padding: 24px 20px 32px;
          gap: 16px;
        }
        .bp-desktop-sidebar::-webkit-scrollbar { display: none; }
        @media (min-width: 1280px) {
          .bp-desktop-sidebar { width: 440px; }
        }

        /* Desktop main area */
        .bp-desktop-main {
          flex: 1;
          min-width: 0;
          display: flex;
          flex-direction: column;
        }
      `}</style>

      {/* ── HEADER ─────────────────────────────────────────────────────────── */}
      <header className="bp-header">
        <Link to="/" className="bp-logo-text">
          <div className="brand">Hindustan</div>
          <div className="sub">Tour &amp; Travels</div>
        </Link>
        <Link to="/" className="bp-back-btn">
          <svg width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
          </svg>
          <span>Back</span>
        </Link>
      </header>

      {/* ── DESKTOP SIDEBAR (hidden on mobile) ─────────────────────────────── */}
      <div style={{ display: "flex", flex: 1, minHeight: 0 }}>
        <aside className="bp-desktop-sidebar">
          <div>
            <h1 style={{ fontSize: 26, fontWeight: 900, color: "#111827", margin: "0 0 4px", letterSpacing: -0.5 }}>Book Your Ride</h1>
            <p style={{ fontSize: 13, color: "#6b7280", margin: 0 }}>Select a service and confirm your trip details.</p>
          </div>

          {/* Service Tabs */}
          <div className="bp-service-tabs">
            {["Cars", "Buses", "Tempo"].map((type) => (
              <button key={type} className={`bp-tab-btn ${serviceType === type ? "active" : ""}`} onClick={() => handleServiceChange(type)}>
                {type}
              </button>
            ))}
          </div>

          {/* Variant Tabs */}
          {serviceType === "Cars" && (
            <div className="bp-variant-tabs">
              {["5 Seater", "7 Seater"].map((v) => (
                <button key={v} className={`bp-variant-btn ${vehicleVariant === v ? "active" : ""}`} onClick={() => setVehicleVariant(v)}>{v}</button>
              ))}
            </div>
          )}
          {serviceType === "Tempo" && (
            <div className="bp-variant-tabs">
              {["16 Seater", "25 Seater"].map((v) => (
                <button key={v} className={`bp-variant-btn ${vehicleVariant === v ? "active" : ""}`} onClick={() => setVehicleVariant(v)}>{v}</button>
              ))}
            </div>
          )}
          {serviceType === "Buses" && (
            <div>
              <div className="bp-variant-tabs">
                {["AC", "Non AC"].map((v) => (
                  <button key={v} className={`bp-variant-btn ${vehicleVariant === v ? "active" : ""}`} onClick={() => setVehicleVariant(v)}>{v}</button>
                ))}
              </div>
              <p style={{ fontSize: 11, textAlign: "center", color: "#9ca3af", margin: "6px 0 0", fontWeight: 600 }}>Bus seats: 52 seater</p>
            </div>
          )}

          {/* Booking Form */}
          <div className="bp-form-card">
            <BookingSection initialState={initialState} onCoordsChange={handleCoordsChange} isBookingPage={true} serviceType={serviceType} />
          </div>

          {/* Consult */}
          <div className="bp-consult-card">
            <div className="bp-consult-icon">💁‍♂️</div>
            <p className="bp-consult-title">Need help deciding?</p>
            <p className="bp-consult-sub">Call our experts to find the perfect vehicle for your {serviceType.toLowerCase()} trip.</p>
            <a href={`tel:${CONTACT_INFO.phones[1].number.replace(/\s/g, "")}`} className="bp-consult-btn">
              Consult Now
            </a>
          </div>
        </aside>

        {/* ── MAP + MOBILE SHEET ──────────────────────────────────────────── */}
        <div className="bp-desktop-main">
          <div className="bp-map-area">
            {/* Map Badge */}
            <div className="bp-map-badge">
              <p>Live Route Map</p>
              <p>Real-time distance &amp; duration</p>
            </div>

            {/* Map — viewport shrinks upward when sheet is expanded */}
            <div
              className="bp-map-viewport"
              style={{
                // When expanded the sheet covers ~55%, so push map up by that amount
                // When collapsed the sheet only peeks 10%, almost nothing to offset
                paddingBottom: isExpanded ? `${100 - SNAP.expanded}%` : `${100 - SNAP.collapsed}%`,
              }}
            >
              <OlaMapView
                pickupCoords={pickupCoords}
                destinationCoords={destinationCoords}
                defaultCenter={FIROZABAD_CENTER}
                apiKey={OLA_API_KEY}
                isSheetCollapsed={!isExpanded}
              />
            </div>

            {/* ── BOTTOM SHEET (mobile only) ─────────────────────────── */}
            <div className="bp-sheet-wrapper">
              <div
                ref={sheetRef}
                className={`bp-sheet ${sheetSnap}`}
              >
                {/* Handle Zone — always draggable */}
                <div
                  className="bp-handle-zone"
                  onTouchStart={onTouchStart}
                  onTouchMove={onTouchMove}
                  onTouchEnd={onTouchEnd}
                  onClick={() => setSheetSnap(isExpanded ? "collapsed" : "expanded")}
                >
                  <div className="bp-handle-bar" />
                  <div className="bp-sheet-header">
                    <div>
                      <h1 className="bp-sheet-title">Book Your Ride</h1>
                      <p className="bp-sheet-subtitle">
                        {isExpanded ? "Select a service and confirm your trip." : "Tap to open booking form ↑"}
                      </p>
                    </div>
                    <button
                      className={`bp-chevron-btn ${isExpanded ? "rotated" : ""}`}
                      aria-label={isExpanded ? "Collapse sheet" : "Expand sheet"}
                      onClick={(e) => { e.stopPropagation(); setSheetSnap(isExpanded ? "collapsed" : "expanded"); }}
                    >
                      <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 15l7-7 7 7" />
                      </svg>
                    </button>
                  </div>
                </div>

                {/* When collapsed → show tap-to-open hint overlay */}
                {!isExpanded && (
                  <div className="bp-collapsed-hint" onClick={() => setSheetSnap("expanded")}>
                    <span className="bp-collapsed-hint-text">🚗 Tap to continue booking</span>
                    <span className="bp-collapsed-hint-sub">Swipe up to open the form</span>
                  </div>
                )}

                {/* Scrollable Content (only when expanded) */}
                {isExpanded && (
                  <div className="bp-sheet-body">
                    {/* Service Tabs */}
                    <div className="bp-service-tabs">
                      {["Cars", "Buses", "Tempo"].map((type) => (
                        <button key={type} className={`bp-tab-btn ${serviceType === type ? "active" : ""}`} onClick={() => handleServiceChange(type)}>
                          {type}
                        </button>
                      ))}
                    </div>

                    {/* Variant Tabs */}
                    {serviceType === "Cars" && (
                      <div className="bp-variant-tabs">
                        {["5 Seater", "7 Seater"].map((v) => (
                          <button key={v} className={`bp-variant-btn ${vehicleVariant === v ? "active" : ""}`} onClick={() => setVehicleVariant(v)}>{v}</button>
                        ))}
                      </div>
                    )}
                    {serviceType === "Tempo" && (
                      <div className="bp-variant-tabs">
                        {["16 Seater", "25 Seater"].map((v) => (
                          <button key={v} className={`bp-variant-btn ${vehicleVariant === v ? "active" : ""}`} onClick={() => setVehicleVariant(v)}>{v}</button>
                        ))}
                      </div>
                    )}
                    {serviceType === "Buses" && (
                      <div>
                        <div className="bp-variant-tabs">
                          {["AC", "Non AC"].map((v) => (
                            <button key={v} className={`bp-variant-btn ${vehicleVariant === v ? "active" : ""}`} onClick={() => setVehicleVariant(v)}>{v}</button>
                          ))}
                        </div>
                        <p style={{ fontSize: 11, textAlign: "center", color: "#9ca3af", margin: "6px 0 0", fontWeight: 600 }}>Bus seats: 52 seater</p>
                      </div>
                    )}

                    {/* Booking Form */}
                    <div className="bp-form-card">
                      <BookingSection initialState={initialState} onCoordsChange={handleCoordsChange} isBookingPage={true} serviceType={serviceType} />
                    </div>

                    {/* Consult */}
                    <div className="bp-consult-card">
                      <div className="bp-consult-icon">💁‍♂️</div>
                      <p className="bp-consult-title">Need help deciding?</p>
                      <p className="bp-consult-sub">Call our experts to find the perfect vehicle for your {serviceType.toLowerCase()} trip.</p>
                      <a href={`tel:${CONTACT_INFO.phones[1].number.replace(/\s/g, "")}`} className="bp-consult-btn">
                        Consult Now
                      </a>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
