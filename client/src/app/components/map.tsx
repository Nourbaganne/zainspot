"use client";

// Map component from library
import { GoogleMap } from "@react-google-maps/api";

// Map's styling
const defaultMapContainerStyle = {
  width: "100%",
  height: "80vh",
  borderRadius: "15px 0 0 15px",
  boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
};

// Coordinates for Berkeley House
const defaultMapCenter = {
  lat: 51.509865,
  lng: -0.147768,
};

// Decreased zoom level for a wider view
const defaultMapZoom = 12;

// Map options
const defaultMapOptions = {
  zoomControl: true,
  tilt: 0,
  gestureHandling: "auto",
  mapTypeId: "hybrid",
};

const MapComponent = () => {
  return (
    <div className="w-full h-full p-4">
      <GoogleMap
        mapContainerStyle={defaultMapContainerStyle}
        center={defaultMapCenter}
        zoom={defaultMapZoom}
        options={defaultMapOptions}
      />
    </div>
  );
};

export { MapComponent };
