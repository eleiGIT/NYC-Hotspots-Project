import React from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { divIcon, icon, marker } from "leaflet";
import MarkerClusterGroup from "react-leaflet-markercluster";

const position = [40.71427, -74.00597];

const customIcon = new icon({
  iconUrl: "https://cdn-icons-png.flaticon.com/128/2776/2776067.png",
  iconSize: [38, 38],
});

const customClusterIcon = (cluster) => {
  return new divIcon({
    html: `<div class="cluster-icon">${cluster.getChildCount()}<div>`,
    className: "",
  });
};

const Map = ({ markerData }) => {
  return (
    <MapContainer
      preferCanvas={true}
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
      {/* {marker.slice(0, 100).map((marker, i) => */}
      <MarkerClusterGroup chunkedLoading iconCreateFunction={customClusterIcon}>
        {markerData.map((marker, i) => (
          <Marker
            key={i}
            position={[marker.Latitude, marker.Longitude]}
            icon={customIcon}
          ></Marker>
        ))}
      </MarkerClusterGroup>
    </MapContainer>
  );
};

export default Map;
