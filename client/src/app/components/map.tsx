"use client";

import { useState, useEffect } from "react";
import { MapContainer, TileLayer, Marker } from "react-leaflet";
import { LatLngExpression } from "leaflet";
import axios from "axios";

import "leaflet/dist/leaflet.css";
import "leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css";
import "leaflet-defaulticon-compatibility";

interface MapProps {
  address: string;
  zoom?: number;
}

const defaults = {
  zoom: 14,
};

const Map = ({ address, zoom = defaults.zoom }: MapProps) => {
  const [position, setPosition] = useState<LatLngExpression | null>(null);

  useEffect(() => {
    const fetchCoordinates = async () => {
      const apiKey = "253e2115a6f44eb8a8480eac8c979080";
      try {
        const response = await axios.get(`https://api.opencagedata.com/geocode/v1/json?q=${address}&key=${apiKey}`);
        const { lat, lng } = response.data.results[0].geometry;
        setPosition([lat, lng]);
      } catch (error) {
        console.error("Error fetching coordinates:", error);
      }
    };

    fetchCoordinates();
  }, [address]);

  if (!position) return <div>Loading map...</div>;

  return (
    <MapContainer
      center={position}
      zoom={zoom}
      scrollWheelZoom={false}
      style={{ height: "100%", width: "100%", zIndex: 1 }}
      attributionControl={false}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <Marker position={position} draggable={false} />
    </MapContainer>


  );
};

export default Map;

