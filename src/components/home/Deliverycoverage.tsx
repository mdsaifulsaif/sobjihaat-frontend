'use client';

import React, { useEffect, useRef, useMemo, useState } from 'react';
import RequestAreaModal from './RequestAreaModal';

/* ─── Known Barisal coordinates fallback mapping ─── */
const KNOWN_COORDINATES: Record<string, [number, number]> = {
  'bangla bazar': [22.6950, 90.3690],
  'banglabazar': [22.6950, 90.3690],
  'rupatoli': [22.6975, 90.3755],
  'barisal sadar': [22.7055, 90.3555],
  'sadar': [22.7055, 90.3555],
  'kashipur': [22.7185, 90.3680],
  'natullabad': [22.6885, 90.3625],
  'amtala': [22.6755, 90.3745],
  'choumatha': [22.7020, 90.3580],
  'c&b road': [22.7100, 90.3600],
  'sagordi': [22.6850, 90.3700],
  'chandmari': [22.6910, 90.3780],
  'notun bazar': [22.7080, 90.3700],
  'launch ghat': [22.7060, 90.3750],
  'band road': [22.7020, 90.3720],
  'goriar par': [22.7300, 90.3400],
};

/* ─── Generate organic polygon zone around a center coordinate ─── */
function generateOrganicPolygon(center: [number, number], radiusKm = 0.65, seed = 1): [number, number][] {
  const points: [number, number][] = [];
  const numPoints = 8;
  const latRadius = radiusKm / 110.574;
  const lngRadius = radiusKm / (111.320 * Math.cos((center[0] * Math.PI) / 180));

  for (let i = 0; i < numPoints; i++) {
    const angle = (i * 2 * Math.PI) / numPoints;
    // Add subtle variation (8-15%) so it appears as a smooth, organic delivery zone
    const factor = 0.88 + 0.22 * Math.sin(angle * 2 + seed);
    const lat = center[0] + latRadius * factor * Math.sin(angle);
    const lng = center[1] + lngRadius * factor * Math.cos(angle);
    points.push([Number(lat.toFixed(6)), Number(lng.toFixed(6))]);
  }
  return points;
}

/* ─── Hash function to place unknown area names deterministically around Barisal ─── */
function hashNameToOffset(name: string, index: number): [number, number] {
  let hash = 0;
  for (let i = 0; i < name.length; i++) {
    hash = (hash << 5) - hash + name.charCodeAt(i);
    hash |= 0;
  }
  const angle = ((Math.abs(hash) % 360) + index * 45) * (Math.PI / 180);
  const distance = 0.012 + ((Math.abs(hash) % 20) * 0.001); // 1-2 km from center
  const baseLat = 22.7010;
  const baseLng = 90.3535;
  return [baseLat + distance * Math.sin(angle), baseLng + distance * Math.cos(angle)];
}

export interface AreaItem {
  _id?: string;
  id?: string | number;
  name: string;
  isActive?: boolean;
  latitude?: number | null;
  longitude?: number | null;
  radius?: number;
}

interface Zone {
  id: string | number;
  name: string;
  status: 'active' | 'coming_soon';
  center: [number, number];
  polygon: [number, number][];
}

const PRIMARY = '#5CAF90';
const COMING = '#94a3b8';

/* ─── Leaflet Map Subcomponent ─── */
function LeafletMap({ zones }: { zones: Zone[] }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<import('leaflet').Map | null>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    let isCancelled = false;

    (async () => {
      try {
        const L = (await import('leaflet')).default;
        if (isCancelled || !containerRef.current) return;

        // Clean up previous instance if needed
        if (mapRef.current) {
          mapRef.current.remove();
          mapRef.current = null;
        }

        if ((containerRef.current as any)._leaflet_id) {
          delete (containerRef.current as any)._leaflet_id;
        }

        // Initialize map
        const defaultCenter: [number, number] = zones[0]?.center || [22.7010, 90.3650];
        const map = L.map(containerRef.current, {
          center: defaultCenter,
          zoom: 13,
          zoomControl: true,
          scrollWheelZoom: false,
          attributionControl: false,
        });

        if (isCancelled) {
          map.remove();
          return;
        }

        mapRef.current = map;

        // 100% Free OpenStreetMap Tiles (No API key, No watermark)
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
          maxZoom: 19,
          subdomains: ['a', 'b', 'c'],
        }).addTo(map);

        const allLatLngs: [number, number][] = [];

        zones.forEach((zone) => {
          const isActive = zone.status === 'active';
          const color = isActive ? PRIMARY : COMING;

          // Delivery coverage zone polygon
          L.polygon(zone.polygon as [number, number][], {
            color,
            weight: isActive ? 2 : 1.5,
            dashArray: isActive ? undefined : '5, 5',
            fillColor: color,
            fillOpacity: isActive ? 0.22 : 0.10,
          }).addTo(map);

          zone.polygon.forEach(([lat, lng]) => allLatLngs.push([lat, lng]));

          // Custom Marker with Pin & Name Label Badge
          const pinSvg = `
            <svg xmlns="http://www.w3.org/2000/svg" width="28" height="38" viewBox="0 0 30 40">
              <defs>
                <filter id="sh_${zone.id}" x="-30%" y="-10%" width="160%" height="150%">
                  <feDropShadow dx="0" dy="2" stdDeviation="2" flood-color="#000" flood-opacity="0.25"/>
                </filter>
              </defs>
              <g filter="url(#sh_${zone.id})">
                <path d="M15 1C8 1 2 7 2 14c0 10.5 13 25 13 25S28 24.5 28 14C28 7 22 1 15 1Z" fill="${color}"/>
                <circle cx="15" cy="13.5" r="5.5" fill="white"/>
                <circle cx="15" cy="13.5" r="2.8" fill="${color}"/>
              </g>
            </svg>`;

          const labelHtml = `
            <div style="display:flex;flex-direction:column;align-items:center;gap:3px;pointer-events:auto;cursor:pointer">
              ${pinSvg}
              <div style="
                background:white;
                border:1px solid ${isActive ? '#d1fae5' : '#e2e8f0'};
                border-radius:20px;
                padding:3px 12px;
                font-size:11px;
                font-weight:700;
                color:#1f2937;
                white-space:nowrap;
                box-shadow:0 3px 10px rgba(0,0,0,0.12);
                line-height:1.4;
              ">
                ${zone.name}
              </div>
            </div>`;

          const marker = L.marker(zone.center, {
            icon: L.divIcon({
              html: labelHtml,
              className: '',
              iconSize: [120, 80],
              iconAnchor: [60, 78],
            }),
          }).addTo(map);

          // Popup on click
          marker.bindPopup(`
            <div style="padding:6px 4px;font-family:sans-serif">
              <h4 style="margin:0 0 4px;font-size:13px;font-weight:bold;color:#111827">${zone.name}</h4>
              <p style="margin:0;font-size:11px;color:${isActive ? '#059669' : '#64748b'};font-weight:600">
                ${isActive ? '✓ ডেলিভারি এভেইলেবল (30-45 মিনিট)' : '🕒 শীঘ্রই আসছে (Coming Soon)'}
              </p>
            </div>
          `);
        });

        // Auto-fit map to show all zones nicely
        if (allLatLngs.length && !isCancelled) {
          map.fitBounds(allLatLngs as [number, number][], { padding: [45, 45] });
        }
      } catch (err) {
        console.warn('Leaflet map initialization warning:', err);
      }
    })();

    return () => {
      isCancelled = true;
      if (mapRef.current) {
        try {
          mapRef.current.remove();
        } catch (e) {
          // ignore
        }
        mapRef.current = null;
      }
      if (containerRef.current && (containerRef.current as any)._leaflet_id) {
        delete (containerRef.current as any)._leaflet_id;
      }
    };
  }, [zones]);

  return <div ref={containerRef} style={{ height: '100%', width: '100%' }} />;
}

/* ─── Main DeliveryCoverage Component ─── */
interface DeliveryCoverageProps {
  areas?: AreaItem[];
}

const defaultFallbackZones: Zone[] = [
  {
    id: 1,
    name: 'Bangla Bazar',
    status: 'active',
    center: [22.6950, 90.3690],
    polygon: generateOrganicPolygon([22.6950, 90.3690], 0.7, 1),
  },
  {
    id: 2,
    name: 'Barisal Sadar',
    status: 'active',
    center: [22.7055, 90.3555],
    polygon: generateOrganicPolygon([22.7055, 90.3555], 0.8, 2),
  },
  {
    id: 3,
    name: 'Kashipur',
    status: 'active',
    center: [22.7185, 90.3680],
    polygon: generateOrganicPolygon([22.7185, 90.3680], 0.7, 3),
  },
  {
    id: 4,
    name: 'Rupatoli',
    status: 'active',
    center: [22.6780, 90.3450],
    polygon: generateOrganicPolygon([22.6780, 90.3450], 0.75, 4),
  },
  {
    id: 5,
    name: 'Natullabad',
    status: 'active',
    center: [22.6885, 90.3625],
    polygon: generateOrganicPolygon([22.6885, 90.3625], 0.7, 5),
  },
  {
    id: 6,
    name: 'Amtala',
    status: 'coming_soon',
    center: [22.6755, 90.3745],
    polygon: generateOrganicPolygon([22.6755, 90.3745], 0.65, 6),
  },
];

const DeliveryCoverage: React.FC<DeliveryCoverageProps> = ({ areas = [] }) => {
  const [displayAreas, setDisplayAreas] = useState<AreaItem[]>(areas);
  const [isRequestModalOpen, setIsRequestModalOpen] = useState(false);

  useEffect(() => {
    setDisplayAreas(areas);
  }, [areas]);

  useEffect(() => {
    // Client-side fetch to ensure immediate sync when admin adds or modifies areas
    let isMounted = true;
    const fetchLatestAreas = async () => {
      try {
        const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5001/api/v1';
        const res = await fetch(`${apiUrl}/area`, { cache: 'no-store' });
        if (res.ok) {
          const json = await res.json();
          if (isMounted && json?.data && Array.isArray(json.data) && json.data.length > 0) {
            setDisplayAreas(json.data);
          }
        }
      } catch (err) {
        // Silently use prop areas
      }
    };
    fetchLatestAreas();
    return () => {
      isMounted = false;
    };
  }, []);

  // Convert dynamic database areas into Map Zones
  const zones: Zone[] = useMemo(() => {
    if (!displayAreas || displayAreas.length === 0) {
      return defaultFallbackZones;
    }

    return displayAreas.map((area, index) => {
      const nameLower = area.name.trim().toLowerCase();

      // 1. Check if area has direct coordinates from DB
      let center: [number, number];
      if (area.latitude && area.longitude) {
        center = [Number(area.latitude), Number(area.longitude)];
      } else if (KNOWN_COORDINATES[nameLower]) {
        // 2. Check if matched in known Barisal coordinates
        center = KNOWN_COORDINATES[nameLower];
      } else {
        // 3. Fallback deterministic offset for any new area
        center = hashNameToOffset(area.name, index);
      }

      const radiusKm = area.radius ? area.radius / 1000 : 0.7;
      const polygon = generateOrganicPolygon(center, radiusKm, index);
      const status: 'active' | 'coming_soon' = area.isActive !== false ? 'active' : 'coming_soon';

      return {
        id: area._id || area.id || index + 1,
        name: area.name,
        status,
        center,
        polygon,
      };
    });
  }, [areas]);

  const activeZones = zones.filter((z) => z.status === 'active');

  return (
    <section className="bg-white px-3 py-10 sm:px-6 sm:py-14">
      {/* Leaflet CSS and clean map styles */}
      <style>{`
        @import url('https://unpkg.com/leaflet@1.9.4/dist/leaflet.css');
        .leaflet-tile {
          filter: saturate(0.85) contrast(0.96) brightness(1.02);
        }
        .leaflet-popup-content-wrapper {
          border-radius: 12px !important;
          box-shadow: 0 4px 16px rgba(0,0,0,0.12) !important;
          padding: 0 !important;
        }
        .leaflet-popup-content {
          margin: 10px 14px !important;
        }
        .leaflet-control-zoom {
          border: none !important;
          box-shadow: 0 2px 8px rgba(0,0,0,0.10) !important;
          border-radius: 10px !important;
          overflow: hidden;
        }
        .leaflet-control-zoom a {
          color: #374151 !important;
          font-size: 15px !important;
          width: 32px !important;
          height: 32px !important;
          line-height: 32px !important;
        }
        .leaflet-control-zoom a:hover {
          background: #f0faf0 !important;
        }
      `}</style>

      <div className="mx-auto container">
        {/* ── Header ── */}
        <div className="mb-5 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-3">
            <div
              className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl"
              style={{ backgroundColor: 'color-mix(in srgb, var(--color-primary, #5CAF90) 12%, white)' }}
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                <path
                  d="M3 16V6a1 1 0 0 1 1-1h9a1 1 0 0 1 1 1v10M3 16h11M3 16a2 2 0 1 0 4 0M14 16a2 2 0 1 0 4 0M14 9h4l3 3v4h-3M14 9v7"
                  stroke="var(--color-primary, #5CAF90)"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
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
              <path
                d="M12 21s7-7.2 7-12a7 7 0 1 0-14 0c0 4.8 7 12 7 12Z"
                stroke="var(--color-primary, #5CAF90)"
                strokeWidth="1.8"
                strokeLinejoin="round"
              />
              <circle cx="12" cy="9" r="2.4" stroke="var(--color-primary, #5CAF90)" strokeWidth="1.8" />
            </svg>
            <div className="min-w-0 flex-1">
              <p className="text-xs font-bold text-gray-900 sm:text-sm">Can't find your area?</p>
              <p className="text-xs text-gray-400">We'd love to deliver to you!</p>
            </div>
            <button
              onClick={() => setIsRequestModalOpen(true)}
              className="shrink-0 rounded-xl px-3 py-2 text-xs font-bold text-white hover:opacity-90 transition-opacity sm:px-4 sm:text-sm cursor-pointer"
              style={{ backgroundColor: 'var(--color-primary, #5CAF90)' }}
            >
              Request →
            </button>
          </div>
        </div>

        {/* ── Map ── */}
        <div className="relative isolate h-72 overflow-hidden rounded-2xl border border-gray-100 shadow-sm sm:h-96 lg:h-[480px]">
          <LeafletMap zones={zones} />

          {/* Legend */}
          <div className="absolute bottom-3 right-3 z-20 rounded-xl border border-gray-100 bg-white/95 px-3 py-2.5 shadow-md backdrop-blur-sm sm:bottom-4 sm:right-4 sm:px-4 sm:py-3">
            <div className="flex items-center gap-2 text-xs font-semibold text-gray-800">
              <span className="h-2.5 w-2.5 rounded-full" style={{ backgroundColor: 'var(--color-primary, #5CAF90)' }} />
              Currently Delivering
            </div>
            <div className="mt-1.5 flex items-center gap-2 text-xs font-semibold text-gray-400">
              <span className="h-2.5 w-2.5 rounded-full border-2 border-gray-300" />
              Coming Soon
            </div>
          </div>
        </div>

        {/* ── Currently Delivering list ── */}
        <div className="mt-5 z-0">
          <h3 className="mb-3 text-sm font-bold text-gray-900 sm:text-base">
            Currently Delivering ({activeZones.length})
          </h3>

          <div className="grid grid-cols-2 gap-2 sm:gap-3 lg:grid-cols-4">
            {activeZones.map((zone) => (
              <div
                key={zone.id}
                className="flex items-center justify-between rounded-xl border border-gray-100 bg-white px-3 py-3 transition-shadow hover:shadow-md sm:px-4"
              >
                <div className="flex items-center gap-2 sm:gap-3 min-w-0">
                  <div
                    className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full sm:h-9 sm:w-9"
                    style={{ backgroundColor: 'color-mix(in srgb, var(--color-primary, #5CAF90) 12%, white)' }}
                  >
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                      <path
                        d="M12 21s7-7.2 7-12a7 7 0 1 0-14 0c0 4.8 7 12 7 12Z"
                        stroke="var(--color-primary, #5CAF90)"
                        strokeWidth="2"
                        strokeLinejoin="round"
                      />
                      <circle cx="12" cy="9" r="2.4" stroke="var(--color-primary, #5CAF90)" strokeWidth="2" />
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
                    style={{ backgroundColor: 'var(--color-primary, #5CAF90)' }}
                  >
                    Active
                  </span>
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" className="hidden sm:block">
                    <path d="M9 18l6-6-6-6" stroke="#9ca3af" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
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
              style={{ backgroundColor: 'color-mix(in srgb, var(--color-primary, #5CAF90) 14%, white)' }}
            >
              <svg width="26" height="26" viewBox="0 0 24 24" fill="none">
                <path
                  d="M12 21s7-7.2 7-12a7 7 0 1 0-14 0c0 4.8 7 12 7 12Z"
                  stroke="var(--color-primary, #5CAF90)"
                  strokeWidth="1.8"
                  strokeLinejoin="round"
                />
                <circle cx="12" cy="9" r="2.5" stroke="var(--color-primary, #5CAF90)" strokeWidth="1.8" />
                <path d="M12 14v4M10 16h4" stroke="var(--color-primary, #5CAF90)" strokeWidth="1.8" strokeLinecap="round" />
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
            onClick={() => setIsRequestModalOpen(true)}
            className="w-full shrink-0 rounded-xl px-5 py-3 text-sm font-bold text-white transition-opacity hover:opacity-90 sm:w-auto cursor-pointer"
            style={{ backgroundColor: 'var(--color-primary, #5CAF90)' }}
          >
            Request Delivery in Your Area →
          </button>
        </div>
      </div>

      {/* Request Area Delivery Modal */}
      <RequestAreaModal
        isOpen={isRequestModalOpen}
        onClose={() => setIsRequestModalOpen(false)}
      />
    </section>
  );
};

export default DeliveryCoverage;
