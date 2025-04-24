import React, { memo } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import userImage from "./assets/user.png";
import { divIcon, icon, marker } from "leaflet";
import MarkerClusterGroup from "react-leaflet-markercluster";
import { useGeolocated } from "react-geolocated";

const position = [40.71427, -74.00597];
const defaultPosition = [40.71427, -74.00597];

const userIcon = new icon({
  iconUrl: userImage,
  iconSize: [38, 38],
});

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

const Map = memo(({ markerData }) => {
  const { coords, isGeolocationAvailable, isGeolocationEnabled } =
    useGeolocated({
      positionOptions: { enableHighAccuracy: true },
      watchLocation: true,
      userDecisionTimeout: 5000,
    });

  const userCoords = coords
    ? [coords.latitude, coords.longitude]
    : defaultPosition;

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
      {/* User Location Marker */}
      {isGeolocationAvailable && isGeolocationEnabled ? (
        <Marker position={userCoords} icon={userIcon}>
          <Popup>
            <strong>Location:</strong> {userCoords[0]}, {userCoords[1]}
            <br />
            You are here!
          </Popup>
        </Marker>
      ) : (
        alert("Geolocation is not enabled or available.")
      )}
      {/* slice(0,100) for first 100 objects as too many obj causes lag */}
      {/* {marker.slice(0, 100).map((marker, i) => */}
      <MarkerClusterGroup chunkedLoading iconCreateFunction={customClusterIcon}>
        {(Array.isArray(markerData) ? markerData : []).map((marker, i) => (
          <Marker
            key={i}
            position={[marker.Latitude, marker.Longitude]}
            icon={customIcon}
          >
            {/*popup markers*/}
            <Popup>
              <strong>Location:</strong> {marker.Location}, {marker.Postcode}
              <br />
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
      </MarkerClusterGroup>
    </MapContainer>
  );
});

export default Map;
