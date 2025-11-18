// frontend/src/components/MapDisplay.tsx

import React, { useEffect, useRef } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css'; // Import Leaflet's CSS
import { TelemetryData } from '../types';

// --- Fix for default Leaflet icon issue with webpack ---
// This ensures the marker icons are displayed correctly.
import iconUrl from 'leaflet/dist/images/marker-icon.png';
import iconRetinaUrl from 'leaflet/dist/images/marker-icon-2x.png';
import shadowUrl from 'leaflet/dist/images/marker-shadow.png';

delete (L.Icon.Default.prototype as any)._getIconUrl;

L.Icon.Default.mergeOptions({
  iconUrl,
  iconRetinaUrl,
  shadowUrl,
});
// --- End of fix ---

interface MapDisplayProps {
    telemetryData: TelemetryData;
}

const MapDisplay: React.FC<MapDisplayProps> = ({ telemetryData }) => {
    const { latitude, longitude, aircraftId } = telemetryData;
    const position: L.LatLngExpression = [latitude, longitude];

    // useRef is used to hold a reference to the map instance.
    // This allows us to interact with the map imperatively (e.g., set its view).
    const mapRef = useRef<L.Map | null>(null);

    // This useEffect hook runs whenever the 'position' changes.
    // Its job is to smoothly move the map's center to follow the marker.
    useEffect(() => {
        if (mapRef.current) {
            mapRef.current.setView(position, mapRef.current.getZoom(), {
                animate: true,
            });
        }
    }, [position]);


    return (
        // A Leaflet map must have a defined height. We'll set this in CSS.
        <div className="map-container">
            <MapContainer
                center={position}
                zoom={10}
                style={{ height: '100%', width: '100%' }}
                ref={mapRef} // Assign the ref to the map instance
            >
                {/* The TileLayer is the background map image. OpenStreetMap is a free option. */}
                <TileLayer
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                />
                <Marker position={position}>
                    <Popup>
                        {aircraftId} <br />
                        Lat: {latitude.toFixed(4)}, Lon: {longitude.toFixed(4)}
                    </Popup>
                </Marker>
            </MapContainer>
        </div>
    );
};

export default MapDisplay;