import React from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { icon } from "leaflet";

const position = [40.71427, -74.00597];

const customIcon = new icon({
  iconUrl: "https://cdn-icons-png.flaticon.com/128/2776/2776067.png",
  iconSize: [38, 38],
});

const Map = ({ markerData }) => {
  return (
    <MapContainer
      center={position}
      zoom={13}
      style={{ height: "1000px", width: "100%" }}
    >
      {/* OpenStreetMap Tile Layer */}
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />

      {/* slice(0,100) for first 100 objects as too many obj causes lag */}
      {markerData.slice(0, 100).map((marker, i) => (
        <Marker
          key={i}
          position={[marker.Latitude, marker.Longitude]}
          icon={customIcon}
        >
          {/*popup markers*/}
          <Popup>
            <strong>Location:</strong> {marker.Location}, {marker.Postcode}<br />
            <strong>Wifi:</strong> {marker.SSID}, {marker.Type} <br />
            <a
              href={`https://www.google.com/maps/search/?api=1&query=${marker.Latitude},${marker.Longitude}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              Open in Google Maps
            </a>
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
};

export default Map;
