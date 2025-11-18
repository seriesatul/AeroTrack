// frontend/src/components/Dashboard.tsx

import React, { useState, useEffect } from 'react';
import { TelemetryData } from '../types';
import MapDisplay from './MapDisplay'; // <-- IMPORT THE NEW COMPONENT
import './Dashboard.css';

const Dashboard: React.FC = () => {
    const [telemetryData, setTelemetryData] = useState<TelemetryData | null>(null);

    useEffect(() => {
        const ws = new WebSocket('ws://localhost:3001');

        ws.onopen = () => console.log('WebSocket connection established');
        ws.onclose = () => console.log('WebSocket connection closed');
        ws.onerror = (error) => console.error('WebSocket error:', error);

        ws.onmessage = (event) => {
            const message = JSON.parse(event.data);
            if (message.aircraftId) {
                setTelemetryData(message);
            }
        };

        return () => {
            ws.close();
        };
    }, []);

    if (!telemetryData) {
        return <div>Connecting to AeroTrack server and waiting for data...</div>;
    }

    return (
        // NEW: We've wrapped the old and new components in a main layout div
        <div className="dashboard-layout">
            <div className="telemetry-panel">
                <div className="dashboard">
                    <h2>Telemetry for {telemetryData.aircraftId}</h2>
                    <div className="grid-container">
                        <div className="grid-item">
                            <span className="label">Altitude</span>
                            <span className="value">{telemetryData.altitude.toFixed(0)} ft</span>
                        </div>
                        <div className="grid-item">
                            <span className="label">Speed</span>
                            <span className="value">{telemetryData.speed.toFixed(0)} kts</span>
                        </div>
                        <div className="grid-item">
                            <span className="label">Heading</span>
                            <span className="value">{telemetryData.heading}°</span>
                        </div>
                        <div className="grid-item">
                            <span className="label">Latitude</span>
                            <span className="value">{telemetryData.latitude.toFixed(4)}</span>
                        </div>
                        <div className="grid-item">
                            <span className="label">Longitude</span>
                            <span className="value">{telemetryData.longitude.toFixed(4)}</span>
                        </div>
                        <div className="grid-item">
                            <span className="label">Last Update</span>
                            <span className="value">{new Date(telemetryData.timestamp).toLocaleTimeString()}</span>
                        </div>
                    </div>
                </div>
            </div>
            {/* RENDER THE MAP COMPONENT and pass it the live data */}
            <div className="map-panel">
                <MapDisplay telemetryData={telemetryData} />
            </div>
        </div>
    );
};

export default Dashboard;