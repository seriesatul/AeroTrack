// simulator/index.js

const axios = require('axios');

// The URL where our backend server will be listening for telemetry data.
// We haven't built this yet, but we'll point our simulator to it.
const BACKEND_URL = 'http://localhost:3001/api/telemetry';

// --- Initial Aircraft State ---
// Let's simulate a single aircraft for now.
const aircraftId = 'AAL-123';
let telemetryData = {
    latitude: 34.0522,    // Initial latitude (e.g., Los Angeles)
    longitude: -118.2437,  // Initial longitude
    altitude: 35000,      // Altitude in feet
    speed: 500,           // Speed in knots
    heading: 90,          // Heading in degrees (East)
};

// --- Simulation Logic ---
function updateTelemetry() {
    // Simulate slight random changes to the aircraft's state
    telemetryData.latitude += (Math.random() - 0.5) * 0.01;
    telemetryData.longitude += (Math.random() - 0.5) * 0.01;
    telemetryData.altitude += (Math.random() - 0.5) * 100; // Fluctuate altitude
    telemetryData.speed += (Math.random() - 0.5) * 5;      // Fluctuate speed
    
    // Ensure speed and altitude don't go to unrealistic negative values
    telemetryData.altitude = Math.max(0, telemetryData.altitude);
    telemetryData.speed = Math.max(0, telemetryData.speed);

    // Create the payload to send to the backend
    const payload = {
        aircraftId: aircraftId,
        timestamp: new Date().toISOString(),
        ...telemetryData // Use the spread operator to include lat, lon, alt, etc.
    };

    return payload;
}

// --- Data Transmission ---
async function sendTelemetry() {
    const payload = updateTelemetry();

    console.log(`Sending data:`, payload);

    try {
        // Use axios to send a POST request to our backend API endpoint
        await axios.post(BACKEND_URL, payload);
        console.log('Data sent successfully!');
    } catch (error) {
        // This will fail for now because our backend isn't running. That's OK!
        console.error('Error sending data:', error.message);
    }
}

// --- Main Execution ---
console.log('Starting AeroTrack Telemetry Simulator...');
console.log(`Will send data to ${BACKEND_URL} every 2 seconds.`);

// Send telemetry data every 2000 milliseconds (2 seconds)
setInterval(sendTelemetry, 2000);