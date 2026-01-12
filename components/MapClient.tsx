"use client";

import { useEffect, useState } from "react";
import "leaflet/dist/leaflet.css";
import {
  MapContainer,
  TileLayer,
  Marker,
  useMapEvents,
} from "react-leaflet";

export default function MapClient() {
  const [ready, setReady] = useState(false);
  const [point, setPoint] = useState<{ lat: number; lon: number } | null>(null);
  const [ndwi, setNdwi] = useState<number | null>(null);
  const [ndwiTile, setNdwiTile] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    import("leaflet").then((L) => {
      delete (L.Icon.Default.prototype as any)._getIconUrl;
      L.Icon.Default.mergeOptions({
        iconRetinaUrl:
          "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
        iconUrl:
          "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
        shadowUrl:
          "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
      });
      setReady(true);
    });
  }, []);

  async function fetchNdwi(lat: number, lon: number) {
    try {
      setLoading(true);
      const API = process.env.NEXT_PUBLIC_API_URL!;
      const res = await fetch(
        `${API}/ndwi?lat=${lat}&lon=${lon}`,
        { headers: { "ngrok-skip-browser-warning": "true" } }
      );
      const data = await res.json();
      setNdwi(data.mean_ndwi);
      setNdwiTile(data.ndwi_tile_url);
    } finally {
      setLoading(false);
    }
  }

  function ClickHandler() {
    useMapEvents({
      click(e: any) {
        const { lat, lng } = e.latlng;
        setPoint({ lat, lon: lng });
        fetchNdwi(lat, lng);
      },
    });
    return null;
  }

  if (!ready) return <p style={{ color: "white" }}>Loading map…</p>;

  return (
    <div
      style={{
        width: "92%",
        margin: "0 auto",
        padding: "16px",
        borderRadius: "20px",
        background: "rgba(255, 255, 255, 0.15)",
        backdropFilter: "blur(14px)",
        WebkitBackdropFilter: "blur(14px)",
        border: "1px solid rgba(255, 255, 255, 0.25)",
        boxShadow: "0 8px 32px rgba(0, 0, 0, 0.25)",
        color: "white",
      }}
    >
      {/* Map */}
      <MapContainer
        center={[20, 78]}
        zoom={5}
        style={{
          height: "450px",
          width: "100%",
          borderRadius: "16px",
          overflow: "hidden",
        }}
      >
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        <ClickHandler />
        {point && <Marker position={[point.lat, point.lon]} />}
        {ndwiTile && <TileLayer url={ndwiTile} opacity={0.6} />}
      </MapContainer>

      {/* Glass Info Panel */}
      <div
        style={{
          marginTop: "12px",
          padding: "12px 16px",
          borderRadius: "14px",
          background:
            "linear-gradient(135deg, rgba(255,255,255,0.25), rgba(255,255,255,0.05))",
          backdropFilter: "blur(10px)",
          WebkitBackdropFilter: "blur(10px)",
          border: "1px solid rgba(255, 255, 255, 0.2)",
          boxShadow: "0 0 20px rgba(255, 255, 255, 0.15)",
        }}
      >
        {loading && <p>Fetching NDWI…</p>}
        {ndwi !== null && (
          <p>
            Mean NDWI: <b>{ndwi.toFixed(3)}</b>
          </p>
        )}
      </div>
    </div>
  );
}
