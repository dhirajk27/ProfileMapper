import React from 'react';
import { MapContainer, TileLayer, Marker } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

const ProfileMap = ({ location }) => {
  return (
    <MapContainer
      center={[location.lat, location.lng]}
      zoom={13}
      style={{ height: '400px', width: '100%' }}
      className="rounded-lg shadow-md"
    >
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
      <Marker position={[location.lat, location.lng]} />
    </MapContainer>
  );
};

export default ProfileMap;
