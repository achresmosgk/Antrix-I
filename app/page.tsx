"use client";

import dynamic from "next/dynamic";
import LiquidEther from "./LiquidEther";

const MapClient = dynamic(
  () => import("../components/MapClient"),
  { ssr: false }
);

export default function Home() {
  return (
    <main style={{ padding: "20px" }}>
      <div
        style={{
          width: "100%",
          height: "1000px",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Background Layer */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            zIndex: 1,
          }}
        >
          <LiquidEther
            colors={["#5227FF", "#FF9FFC", "#B19EEF"]}
            mouseForce={20}
            cursorSize={100}
            isViscous={false}
            viscous={30}
            iterationsViscous={32}
            iterationsPoisson={32}
            resolution={0.5}
            isBounce={false}
            autoDemo={true}
            autoSpeed={0.5}
            autoIntensity={2.2}
            takeoverDuration={0.25}
            autoResumeDelay={3000}
            autoRampDuration={0.6}
          />
        </div>

        {/*Glass Navbar */}
        <div
          style={{
            position: "fixed",
            top: 16,
            left: "50%",
            transform: "translateX(-50%)",
            width: "90%",
            height: "64px",
            zIndex: 100,
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            padding: "0 24px",
            borderRadius: "20px",
            background:
              "linear-gradient(135deg, rgba(255,255,255,0.25), rgba(255,255,255,0.05))",
            backdropFilter: "blur(14px)",
            WebkitBackdropFilter: "blur(14px)",
            border: "1px solid rgba(255,255,255,0.25)",
            boxShadow: "0 8px 32px rgba(0,0,0,0.25)",
            color: "white",
          }}
        >
          {/* Left */}
          <div style={{ fontWeight: 700, fontSize: "18px" }}>
            Antrix-I
          </div>

          {/* Center */}
          <div style={{ opacity: 0.85, fontSize: "14px" }}>
            Click Anywhere On The Map To Compute NDWI
          </div>

          {/* Right */}
          <div style={{ display: "flex", gap: "14px" }}>
            <button
              style={{
                background: "rgba(255,255,255,0.2)",
                border: "1px solid rgba(255,255,255,0.3)",
                borderRadius: "12px",
                padding: "6px 14px",
                color: "white",
                cursor: "pointer",
              }}
            >
              About
            </button>
            <button
              style={{
                background: "rgba(255,255,255,0.2)",
                border: "1px solid rgba(255,255,255,0.3)",
                borderRadius: "12px",
                padding: "6px 14px",
                color: "white",
                cursor: "pointer",
              }}
            >
              Docs
            </button>
          </div>
        </div>

        {/* 🗺️ Foreground Content */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            zIndex: 2,
            pointerEvents: "auto",
            paddingTop: "100px", // 👈 space for navbar
          }}
        >
          <MapClient />
        </div>
      </div>
    </main>
  );
}
