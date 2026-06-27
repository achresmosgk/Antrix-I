<div align="center">

# ANTRIX-I

### **Real-Time Satellite Water Index Computation — Powered by Geospatial AI**

<br/>

[![Next.js](https://img.shields.io/badge/Next.js-16.1.1-black?style=for-the-badge&logo=next.js)](https://nextjs.org)
[![React](https://img.shields.io/badge/React-19-61DAFB?style=for-the-badge&logo=react)](https://react.dev)
[![Three.js](https://img.shields.io/badge/Three.js-0.182-white?style=for-the-badge&logo=three.js)](https://threejs.org)
[![Leaflet](https://img.shields.io/badge/Leaflet-1.9.4-199900?style=for-the-badge&logo=leaflet)](https://leafletjs.com)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?style=for-the-badge&logo=typescript)](https://typescriptlang.org)

<br/>

> *Click anywhere on Earth. Get satellite-derived water index data in seconds.*

<br/>

![Antrix-I Demo](https://workfolk.vercel.app/)

</div>

---

## ✦ What Is This?

**Antrix-I** is a geospatial intelligence interface for computing the **Normalized Difference Water Index (NDWI)** from satellite imagery — in real time, on any point on Earth.

Click a point on the interactive map. The backend fetches the nearest Sentinel-2 or Landsat tile, processes the band math, and returns:
- The **mean NDWI** value for the area
- A **live NDWI tile overlay** rendered directly on the map

All wrapped in a fluid, GPU-accelerated WebGL interface built with Three.js fluid simulation and glassmorphism UI.

---

## ✦ What Is NDWI?

The **Normalized Difference Water Index** isolates open water bodies from satellite multispectral imagery using the formula:

```
NDWI = (Green − NIR) / (Green + NIR)
```

| Value Range | Interpretation |
|-------------|---------------|
| `> 0.3` | Open water (rivers, lakes, ocean) |
| `0.0 – 0.3` | Potential flood zone / wetland |
| `< 0.0` | Dry land / vegetation / urban |

NDWI is widely used in hydrology, flood monitoring, drought assessment, and environmental change detection.

---

## ✦ Architecture

```
┌─────────────────────────────────────────────────────────┐
│                     ANTRIX-I FRONTEND                   │
│                                                         │
│  ┌───────────────┐     ┌──────────────────────────────┐ │
│  │  LiquidEther  │     │        MapClient.tsx         │ │
│  │  (WebGL BG)   │     │                              │ │
│  │               │     │  Leaflet Map + OSM Tiles     │ │
│  │  Three.js     │     │  Click Handler               │ │
│  │  GPU Fluid    │     │  NDWI Tile Overlay           │ │
│  │  Simulation   │     │  Geocoder Search             │ │
│  └───────────────┘     └──────────────┬───────────────┘ │
│                                       │                  │
│                              GET /ndwi?lat=&lon=         │
└───────────────────────────────────────┼─────────────────┘
                                        │
                               ┌────────▼────────┐
                               │  Python Backend  │
                               │                  │
                               │  Sentinel / GEE  │
                               │  Band Processing │
                               │  NDWI Tile Gen   │
                               └─────────────────-┘
```

**Frontend** — Next.js 16 App Router, TypeScript, React-Leaflet, Three.js fluid WebGL background

**Backend** — REST API at `NEXT_PUBLIC_API_URL`, returns `{ mean_ndwi, ndwi_tile_url }`

---

## ✦ Tech Stack

| Layer | Technology |
|-------|------------|
| Framework | Next.js 16 (App Router) |
| UI | React 19, TypeScript |
| Map | React-Leaflet + OpenStreetMap |
| Geocoding | Nominatim (OSM) |
| Visual FX | Three.js GPU fluid simulation (WebGL) |
| Styling | Tailwind CSS v4, Glassmorphism |
| Satellite Data | Via backend (Sentinel-2 / Landsat) |

---

## ✦ Features

- **Click-to-Compute** — Click anywhere on the interactive Leaflet map to instantly query NDWI
- **Place Search** — Geocode any place name (city, river, lake) via Nominatim
- **Live Tile Overlay** — NDWI raster tiles rendered directly on the map at 60% opacity
- **Fluid WebGL Background** — Real-time GPU-based Navier-Stokes fluid simulation with mouse interaction
- **Glassmorphism UI** — Frosted-glass navbar, info panels, and map container
- **Responsive** — Works on desktop and mobile

---

## ✦ Getting Started

### Prerequisites

- Node.js ≥ 18
- A running backend exposing `/ndwi?lat=&lon=`

### Installation

```bash
# Clone the repo
git clone https://github.com/your-org/antrix-i.git
cd antrix-i

# Install dependencies
npm install
```

### Environment Setup

Create a `.env.local` file:

```env
NEXT_PUBLIC_API_URL=https://your-backend-url.ngrok-free.app
```

### Run Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

### Production Build

```bash
npm run build
npm start
```

---

## ✦ API Contract

The frontend expects one endpoint from the backend:

### `GET /ndwi`

**Query Parameters**

| Param | Type | Description |
|-------|------|-------------|
| `lat` | `float` | Latitude of the clicked point |
| `lon` | `float` | Longitude of the clicked point |

**Response**

```json
{
  "mean_ndwi": 0.413,
  "ndwi_tile_url": "https://your-tile-server/{z}/{x}/{y}.png"
}
```

The `ndwi_tile_url` is a standard XYZ tile URL — rendered directly as a `<TileLayer>` in Leaflet.

---

## ✦ Project Structure

```
antrix-i/
├── app/
│   ├── page.tsx          # Main page — layout, LiquidEther + MapClient
│   ├── layout.tsx        # Root layout, Leaflet CSS injection
│   ├── globals.css       # Tailwind v4, CSS vars
│   ├── LiquidEther.js    # Three.js WebGL fluid simulation component
│   └── LiquidEther.css   # Container styles for WebGL canvas
├── components/
│   └── MapClient.tsx     # Interactive map, NDWI fetch, tile overlay
├── next.config.ts
├── tsconfig.json
└── package.json
```

---

## ✦ The Fluid Background

`LiquidEther` is a self-contained GPU fluid simulation built entirely in Three.js using custom GLSL shaders implementing a simplified Navier-Stokes solver:

- **Advection** — Semi-Lagrangian with optional BFECC correction
- **External Force** — Mouse-driven velocity injection
- **Viscous Diffusion** — Iterative Jacobi solver
- **Pressure Projection** — Poisson equation + gradient subtraction
- **Auto-Demo Mode** — Autonomous cursor movement when idle

The background is fully interactive — move your cursor over it to distort the fluid in real time.

---

## ✦ Roadmap

- [ ] Multi-index support (NDVI, EVI, SAVI, MNDWI)
- [ ] Time-series comparison (before/after dates)
- [ ] Export NDWI report as PDF
- [ ] Polygon draw mode for area-averaged NDWI
- [ ] Historical flood event overlay
- [ ] Authentication + saved locations

---

## ✦ License

MIT © Antrix-I Contributors

---

<div align="center">

Built for Earth Observation · Powered by Open Satellite Data

**[⬆ back to top](#️-antrix-i)**

</div>
