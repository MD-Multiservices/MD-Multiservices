"use client";

import "leaflet/dist/leaflet.css";

import {
  Circle,
  CircleMarker,
  MapContainer,
  TileLayer,
  Tooltip,
} from "react-leaflet";

const laSeyneCenter: [number, number] = [43.103, 5.878];

const interventionRadius = 25_000;

export default function InterventionMap() {
  return (
    <div
      className="h-[350px] w-full overflow-hidden rounded-[1.5rem] md:h-[430px]"
      role="img"
      aria-label="Carte indiquant une zone habituelle d’intervention d’environ 25 kilomètres autour de La Seyne-sur-Mer"
    >
      <MapContainer
        center={laSeyneCenter}
        zoom={10}
        scrollWheelZoom={false}
        zoomControl
        className="h-full w-full"
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        <Circle
          center={laSeyneCenter}
          radius={interventionRadius}
          pathOptions={{
            color: "#b65f1a",
            fillColor: "#b65f1a",
            fillOpacity: 0.18,
            opacity: 0.9,
            weight: 3,
          }}
        />

        <CircleMarker
          center={laSeyneCenter}
          radius={7}
          pathOptions={{
            color: "#ffffff",
            fillColor: "#2f261f",
            fillOpacity: 1,
            weight: 3,
          }}
        >
          <Tooltip
            permanent
            direction="top"
            offset={[0, -8]}
            opacity={1}
          >
            La Seyne-sur-Mer
          </Tooltip>
        </CircleMarker>
      </MapContainer>
    </div>
  );
}