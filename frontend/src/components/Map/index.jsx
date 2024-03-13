import { useState, useRef, useMemo, useEffect } from "react";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";

const center = {
  lat: 41.2279036,
  lng: 66.1022543,
};

const tashkentCoordination = {
  lat: 41.2995,
  lng: 69.2401,
};

export default function Map({ draggable, height = "40vh" }) {
  const [position, setPosition] = useState(tashkentCoordination);
  const markerRef = useRef(null);
  const eventHandlers = useMemo(
    () => ({
      dragend() {
        const marker = markerRef.current;
        if (marker != null) {
          setPosition(marker.getLatLng());
        }
      },
    }),
    []
  );

  function getLocation() {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const latitude = position.coords.latitude;
        const longitude = position.coords.longitude;

        console.log(`Latitude: ${latitude}, Longitude: ${longitude}`); // Example usage
      },
      (error) => {
        console.error("Error getting location:", error);
      },
      { enableHighAccuracy: true }
    );
  }

  useEffect(() => {
    getLocation();
  }, []);

  return (
    <MapContainer
      style={{ width: "100%", height: height }}
      center={center}
      zoom={5}
      scrollWheelZoom={true}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <Marker
        draggable={draggable}
        eventHandlers={eventHandlers}
        position={position}
      >
        <Popup>Graggable Marker</Popup>
      </Marker>
    </MapContainer>
  );
}
