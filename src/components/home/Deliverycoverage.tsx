'use client';

import React, { useEffect, useRef } from 'react';

/* ─── Zone data — Barisal City real coordinates ─── */
interface Zone {
  id: number;
  name: string;
  status: 'active' | 'coming_soon';
  center: [number, number];
  polygon: [number, number][];
}

const zones: Zone[] = [
  {
    id: 1,
    name: 'Rupatoli',
    status: 'active',
    center: [22.6975, 90.3755],
    polygon: [
      [22.703, 90.368],[22.707, 90.374],[22.705, 90.382],
      [22.699, 90.385],[22.693, 90.382],[22.690, 90.374],
      [22.693, 90.368],[22.699, 90.365],
    ],
  },
  {
    id: 2,
    name: 'Barisal Sadar',
    status: 'active',
    center: [22.7055, 90.3555],
    polygon: [
      [22.712, 90.348],[22.716, 90.355],[22.713, 90.363],
      [22.706, 90.365],[22.699, 90.362],[22.696, 90.354],
      [22.700, 90.347],[22.707, 90.345],
    ],
  },
  {
    id: 3,
    name: 'Kashipur',
    status: 'active',
    center: [22.7185, 90.3680],
    polygon: [
      [22.724, 90.362],[22.727, 90.368],[22.725, 90.375],
      [22.719, 90.377],[22.713, 90.374],[22.710, 90.367],
      [22.713, 90.361],[22.719, 90.359],
    ],
  },
  {
    id: 4,
    name: 'Natullabad',
    status: 'active',
    center: [22.6885, 90.3625],
    polygon: [
      [22.695, 90.357],[22.698, 90.363],[22.695, 90.369],
      [22.689, 90.371],[22.683, 90.368],[22.681, 90.362],
      [22.684, 90.356],[22.690, 90.354],
    ],
  },
  {
    id: 5,
    name: 'Amtala',
    status: 'coming_soon',
    center: [22.6755, 90.3745],
    polygon: [
      [22.681, 90.369],[22.684, 90.375],[22.681, 90.381],
      [22.675, 90.383],[22.669, 90.380],[22.667, 90.374],
      [22.670, 90.368],[22.676, 90.366],
    ],
  },
];

const PRIMARY = '#619d23';
const COMING  = '#94a3b8';

/* ─── Leaflet Map ─── */
function LeafletMap() {
  const containerRef = useRef<HTMLDivElement>(null);
  const mapRef       = useRef<import('leaflet').Map | null>(null);

  useEffect(() => {
    if (!containerRef.current || mapRef.current) return;

    (async () => {
      const L = (await import('leaflet')).default;

      /* Fix marker icons for Next.js / webpack */
      // @ts-ignore
      delete L.Icon.Default.prototype._getIconUrl;
      L.Icon.Default.mergeOptions({
        iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
        iconUrl:       'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
        shadowUrl:     'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
      });

      /* Map — start with a placeholder center; fitBounds will correct it */
      const map = L.map(containerRef.current!, {
        center: [22.700, 90.365],
        zoom: 14,
        zoomControl: true,
        scrollWheelZoom: false,
        attributionControl: false,
      });
      mapRef.current = map;

      /* Tile */
      L.tileLayer('https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png', {
        maxZoom: 19,
      }).addTo(map);

      /* Build all polygons & markers, collect bounds */
      const allLatLngs: [number, number][] = [];

      zones.forEach((zone) => {
        const isActive  = zone.status === 'active';
        const color     = isActive ? PRIMARY : COMING;

        /* Zone polygon */
        const poly = L.polygon(zone.polygon as [number,number][], {
          color,
          weight:      isActive ? 2   : 1.5,
          dashArray:   isActive ? undefined : '6 5',
          fillColor:   color,
          fillOpacity: isActive ? 0.18 : 0.10,
        }).addTo(map);

        zone.polygon.forEach(([lat, lng]) => allLatLngs.push([lat, lng]));

        /* Custom label icon: pin SVG + area name below */
        const pinSvg = `
          <svg xmlns="http://www.w3.org/2000/svg" width="30" height="40" viewBox="0 0 30 40">
            <defs>
              <filter id="sh${zone.id}" x="-30%" y="-10%" width="160%" height="150%">
                <feDropShadow dx="0" dy="2" stdDeviation="2" flood-color="#000" flood-opacity="0.22"/>
              </filter>
            </defs>
            <g filter="url(#sh${zone.id})">
              <path d="M15 1C8 1 2 7 2 14c0 10.5 13 25 13 25S28 24.5 28 14C28 7 22 1 15 1Z" fill="${color}"/>
              <circle cx="15" cy="13.5" r="5.5" fill="white"/>
              <circle cx="15" cy="13.5" r="2.8" fill="${color}"/>
            </g>
          </svg>`;

        const labelHtml = `
          <div style="display:flex;flex-direction:column;align-items:center;gap:4px;pointer-events:none">
            ${pinSvg}
            <div style="
              background:white;
              border:1px solid #e5e7eb;
              border-radius:8px;
              padding:3px 10px;
              font-size:12px;
              font-weight:700;
              color:#1f2937;
              white-space:nowrap;
              box-shadow:0 2px 8px rgba(0,0,0,0.10);
              line-height:1.4;
            ">${zone.name}</div>
          </div>`;

        L.marker(zone.center, {
          icon: L.divIcon({
            html:       labelHtml,
            className:  '',
            iconSize:   [120, 80],
            iconAnchor: [60, 78], /* bottom of pin aligns to coord */
          }),
        }).addTo(map);
      });

      /* Auto-fit map so ALL zones are visible with padding */
      if (allLatLngs.length) {
        map.fitBounds(allLatLngs as [number,number][], { padding: [40, 40] });
      }
    })();

    return () => {
      mapRef.current?.remove();
      mapRef.current = null;
    };
  }, []);

  return <div ref={containerRef} style={{ height: '100%', width: '100%' }} />;
}

/* ─── Stats ─── */
const stats = [
  {
    svg: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
        <path d="M12 21s7-7.2 7-12a7 7 0 1 0-14 0c0 4.8 7 12 7 12Z" stroke="var(--color-primary)" strokeWidth="1.8" strokeLinejoin="round"/>
        <circle cx="12" cy="9" r="2.5" stroke="var(--color-primary)" strokeWidth="1.8"/>
      </svg>
    ),
    value: '4', label: 'Active Areas', sub: 'Currently Delivering',
  },
  {
    svg: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
        <circle cx="12" cy="12" r="9" stroke="var(--color-primary)" strokeWidth="1.8"/>
        <path d="M12 7v5l3 3" stroke="var(--color-primary)" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
    value: '30 min', label: 'Avg. Delivery Time', sub: 'Within coverage',
  },
  {
    svg: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
        <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16Z" stroke="var(--color-primary)" strokeWidth="1.8" strokeLinejoin="round"/>
      </svg>
    ),
    value: '1200+', label: 'Orders Delivered', sub: 'This Month',
  },
  {
    svg: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
        <path d="M12 3l7 3v6c0 5-3.5 7.5-7 9-3.5-1.5-7-4-7-9V6l7-3Z" stroke="var(--color-primary)" strokeWidth="1.8" strokeLinejoin="round"/>
        <path d="M9 12l2 2 4-4" stroke="var(--color-primary)" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
    value: '95%', label: 'Successful Delivery', sub: 'On-time rate',
  },
];

/* ─── Main Component ─── */
const DeliveryCoverage: React.FC = () => {
  const activeZones = zones.filter((z) => z.status === 'active');

  return (
    <section className="bg-white px-3 py-10 sm:px-6 sm:py-14">
      {/* Leaflet CSS */}
      <style>{`
        @import url('https://unpkg.com/leaflet@1.9.4/dist/leaflet.css');
        .leaflet-popup-content-wrapper{border-radius:12px!important;box-shadow:0 4px 16px rgba(0,0,0,.12)!important;padding:0!important}
        .leaflet-popup-content{margin:10px 14px!important}
        .leaflet-control-zoom{border:none!important;box-shadow:0 2px 8px rgba(0,0,0,.10)!important;border-radius:10px!important;overflow:hidden}
        .leaflet-control-zoom a{color:#374151!important;font-size:15px!important;width:32px!important;height:32px!important;line-height:32px!important}
        .leaflet-control-zoom a:hover{background:#f0faf0!important}
      `}</style>

      <div className="mx-auto max-w-6xl">

        {/* ── Header ── */}
        <div className="mb-5 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-3">
            <div
              className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl"
              style={{ backgroundColor: 'color-mix(in srgb, var(--color-primary) 12%, white)' }}
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                <path d="M3 16V6a1 1 0 0 1 1-1h9a1 1 0 0 1 1 1v10M3 16h11M3 16a2 2 0 1 0 4 0M14 16a2 2 0 1 0 4 0M14 9h4l3 3v4h-3M14 9v7"
                  stroke="var(--color-primary)" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
            <div>
              <h2 className="text-2xl font-extrabold text-gray-900 sm:text-3xl">Delivery Coverage</h2>
              <p className="text-sm text-gray-500">Fast and reliable delivery across our service areas</p>
            </div>
          </div>

          {/* Can't find your area */}
          <div className="flex items-center gap-3 rounded-2xl border border-gray-100 bg-gray-50 px-4 py-3">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" className="shrink-0">
              <path d="M12 21s7-7.2 7-12a7 7 0 1 0-14 0c0 4.8 7 12 7 12Z" stroke="var(--color-primary)" strokeWidth="1.8" strokeLinejoin="round"/>
              <circle cx="12" cy="9" r="2.4" stroke="var(--color-primary)" strokeWidth="1.8"/>
            </svg>
            <div className="min-w-0 flex-1">
              <p className="text-xs font-bold text-gray-900 sm:text-sm">Can't find your area?</p>
              <p className="text-xs text-gray-400">We'd love to deliver to you!</p>
            </div>
            <button
              className="shrink-0 rounded-xl px-3 py-2 text-xs font-bold text-white hover:opacity-90 transition-opacity sm:px-4 sm:text-sm"
              style={{ backgroundColor: 'var(--color-primary)' }}
            >
              Request →
            </button>
          </div>
        </div>

        {/* ── Map ── */}
        {/* 
            Mobile:  h-72 (288px)  — compact but usable
            sm:      h-96 (384px)
            lg:      h-[480px]
        */}
        <div
          className="relative h-72 overflow-hidden rounded-2xl border border-gray-100 shadow-sm sm:h-96 lg:h-[480px]"
        >
          <LeafletMap />

          {/* Legend */}
          <div className="absolute bottom-3 right-3 z-[1000] rounded-xl border border-gray-100 bg-white/95 px-3 py-2.5 shadow-md backdrop-blur-sm sm:bottom-4 sm:right-4 sm:px-4 sm:py-3">
            <div className="flex items-center gap-2 text-xs font-semibold text-gray-800">
              <span className="h-2.5 w-2.5 rounded-full" style={{ backgroundColor: 'var(--color-primary)' }}/>
              Currently Delivering
            </div>
            <div className="mt-1.5 flex items-center gap-2 text-xs font-semibold text-gray-400">
              <span className="h-2.5 w-2.5 rounded-full border-2 border-gray-300"/>
              Coming Soon
            </div>
          </div>
        </div>

        {/* ── Stats ── */}
        <div className="mt-4 grid grid-cols-2 gap-2 sm:grid-cols-4 sm:gap-3">
          {stats.map((s) => (
            <div
              key={s.label}
              className="flex items-center gap-3 rounded-2xl border border-gray-100 bg-gray-50 px-3 py-3 sm:px-4 sm:py-4"
            >
              <div
                className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full sm:h-11 sm:w-11"
                style={{ backgroundColor: 'color-mix(in srgb, var(--color-primary) 12%, white)' }}
              >
                {s.svg}
              </div>
              <div>
                <p className="text-base font-extrabold leading-tight text-gray-900 sm:text-xl">{s.value}</p>
                <p className="text-xs font-semibold text-gray-700 leading-tight">{s.label}</p>
                <p className="text-xs text-gray-400 leading-tight">{s.sub}</p>
              </div>
            </div>
          ))}
        </div>

        {/* ── Currently Delivering list ── */}
        <div className="mt-5">
          <h3 className="mb-3 text-sm font-bold text-gray-900 sm:text-base">
            Currently Delivering ({activeZones.length})
          </h3>
          {/* 
              Mobile:  2 columns
              lg:      4 columns (one per zone) 
          */}
          <div className="grid grid-cols-2 gap-2 sm:gap-3 lg:grid-cols-4">
            {activeZones.map((zone) => (
              <div
                key={zone.id}
                className="flex items-center justify-between rounded-xl border border-gray-100 bg-white px-3 py-3 transition-shadow hover:shadow-md sm:px-4"
              >
                <div className="flex items-center gap-2 sm:gap-3 min-w-0">
                  <div
                    className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full sm:h-9 sm:w-9"
                    style={{ backgroundColor: 'color-mix(in srgb, var(--color-primary) 12%, white)' }}
                  >
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                      <path d="M12 21s7-7.2 7-12a7 7 0 1 0-14 0c0 4.8 7 12 7 12Z" stroke="var(--color-primary)" strokeWidth="2" strokeLinejoin="round"/>
                      <circle cx="12" cy="9" r="2.4" stroke="var(--color-primary)" strokeWidth="2"/>
                    </svg>
                  </div>
                  <div className="min-w-0">
                    <p className="truncate text-xs font-bold text-gray-900 sm:text-sm">{zone.name}</p>
                    <p className="text-xs text-gray-400 hidden sm:block">Delivery Available</p>
                  </div>
                </div>
                <div className="flex items-center gap-1 shrink-0">
                  <span
                    className="rounded-full px-2 py-0.5 text-xs font-bold text-white"
                    style={{ backgroundColor: 'var(--color-primary)' }}
                  >
                    Active
                  </span>
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" className="hidden sm:block">
                    <path d="M9 18l6-6-6-6" stroke="#9ca3af" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ── Expanding CTA ── */}
        <div className="mt-5 flex flex-col gap-4 overflow-hidden rounded-2xl bg-gray-50 p-5 sm:flex-row sm:items-center sm:justify-between sm:p-6">
          <div className="flex items-center gap-3 sm:gap-4">
            <div
              className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl sm:h-14 sm:w-14"
              style={{ backgroundColor: 'color-mix(in srgb, var(--color-primary) 14%, white)' }}
            >
              <svg width="26" height="26" viewBox="0 0 24 24" fill="none">
                <path d="M12 21s7-7.2 7-12a7 7 0 1 0-14 0c0 4.8 7 12 7 12Z" stroke="var(--color-primary)" strokeWidth="1.8" strokeLinejoin="round"/>
                <circle cx="12" cy="9" r="2.5" stroke="var(--color-primary)" strokeWidth="1.8"/>
                <path d="M12 14v4M10 16h4" stroke="var(--color-primary)" strokeWidth="1.8" strokeLinecap="round"/>
              </svg>
            </div>
            <div>
              <p className="font-extrabold text-gray-900 text-sm sm:text-base">We're expanding!</p>
              <p className="text-xs text-gray-500 sm:text-sm">
                Don't see your area? Request delivery and we'll bring our service to you.
              </p>
            </div>
          </div>
          <button
            className="w-full shrink-0 rounded-xl px-5 py-3 text-sm font-bold text-white transition-opacity hover:opacity-90 sm:w-auto"
            style={{ backgroundColor: 'var(--color-primary)' }}
          >
            Request Delivery in Your Area →
          </button>
        </div>

      </div>
    </section>
  );
};

export default DeliveryCoverage;