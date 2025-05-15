import React, { memo, useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import userImage from "./assets/user.png";
import { divIcon, icon, marker } from "leaflet";
import MarkerClusterGroup from "react-leaflet-markercluster";
import { useGeolocated } from "react-geolocated";
import "./App.css";

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

const Map = memo(({ markerData, set_user_coords }) => {
  const { coords, isGeolocationAvailable, isGeolocationEnabled } =
    useGeolocated({
      positionOptions: { enableHighAccuracy: true },
      watchLocation: true,
      userDecisionTimeout: 5000,
    });

  useEffect(() => {
    if (coords) {
      set_user_coords([coords.latitude, coords.longitude]);
    }
  }, [coords]);

  const userCoords = coords
    ? [coords.latitude, coords.longitude]
    : defaultPosition;

  useEffect(() => {
    if (!isGeolocationAvailable || !isGeolocationEnabled)
      alert("Geolocation is not enabled or available.");
  }, [isGeolocationAvailable, isGeolocationEnabled]);

  return (
    <div className="map-container">
      <MapContainer
        preferCanvas={true}
        center={position}
        zoom={13}
        style={{ height: "750px", width: "750px" }}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />

        {isGeolocationAvailable && isGeolocationEnabled ? (
          <Marker position={userCoords} icon={userIcon}>
            <Popup>
              <strong>Location:</strong> {userCoords[0]}, {userCoords[1]}
              <br />
              You are here!
            </Popup>
          </Marker>
        ) : (
          //DO NOT REMOVE
          console.log("This message is logged to prevent multiple alerts.")
          // alert("Geolocation is not enabled or available.")
        )}

        <MarkerClusterGroup
          chunkedLoading
          iconCreateFunction={customClusterIcon}
        >
          {(Array.isArray(markerData) ? markerData : []).map((marker, i) => (
            <Marker
              key={i}
              position={[marker.Latitude, marker.Longitude]}
              icon={customIcon}
            >
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

      {/* Hotspot List */}
      <div className="hotspot-list">
        <h2>Hotspots Listing</h2>
        <ul>
          {(Array.isArray(markerData) ? markerData : [])
            .slice(0, 10)
            .map((marker, index) => (
              <li key={index}>
                <strong>{marker.SSID}</strong> - {marker.Location},{" "}
                {marker.Postcode} <br />
                <span>Provider: {marker.Type}</span>
              </li>
            ))}
        </ul>
      </div>
    </div>
  );
});

export default Map;
