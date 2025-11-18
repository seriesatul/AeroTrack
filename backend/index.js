// backend/index.js

const express = require('express');
const cors = require('cors');
const http = require('http'); // NEW: Import Node's built-in HTTP module
const { WebSocketServer } = require('ws'); // NEW: Import WebSocket server
const connectDB = require('./config/db');
const Telemetry = require('./models/Telemetry');

// --- Database Connection ---
connectDB();

// --- Basic Server Setup ---
const app = express();
const PORT = 3001;

// NEW: Create an HTTP server from our Express app
const server = http.createServer(app); 

// NEW: Create a WebSocket server and attach it to the HTTP server
const wss = new WebSocketServer({ server });

// NEW: WebSocket connection logic
wss.on('connection', (ws) => {
    console.log('Client connected via WebSocket');
    
    // Optional: Send a welcome message
    ws.send(JSON.stringify({ message: 'Welcome to AeroTrack WebSocket!' }));

    ws.on('close', () => {
        console.log('Client disconnected');
    });
});

// --- Middleware ---
app.use(cors());
app.use(express.json());

// --- API Routes ---

// POST route: Now also broadcasts data via WebSocket
app.post('/api/telemetry', async (req, res) => {
    try {
        const telemetryData = req.body;
        const newTelemetryEntry = new Telemetry(telemetryData);
        await newTelemetryEntry.save();
        console.log('Saved to DB:', telemetryData);
        
        // NEW: Broadcast the new data to all connected WebSocket clients
        wss.clients.forEach((client) => {
            // Check if the client's connection is still open
            if (client.readyState === client.OPEN) {
                client.send(JSON.stringify(telemetryData));
            }
        });

        res.status(201).json({ message: 'Data received and saved successfully' });
    } catch (error) {
        console.error('Error saving data:', error.message);
        res.status(500).json({ message: 'Failed to save data' });
    }
});

// GET the latest telemetry data for a specific aircraft (no changes here)
app.get('/api/telemetry/:aircraftId', async (req, res) => {
    try {
        const { aircraftId } = req.params;
        const latestTelemetry = await Telemetry.findOne({ aircraftId: aircraftId })
                                               .sort({ timestamp: -1 });
        if (latestTelemetry) {
            res.status(200).json(latestTelemetry);
        } else {
            res.status(404).json({ message: 'No telemetry data found for this aircraft' });
        }
    } catch (error) {
        console.error('Error fetching data:', error.message);
        res.status(500).json({ message: 'Failed to fetch data' });
    }
});


// --- Start the Server ---
// NEW: We start the http server, not the Express app directly
server.listen(PORT, () => {
    console.log(`AeroTrack backend server is running on http://localhost:${PORT}`);
    console.log(`WebSocket server is also running on ws://localhost:${PORT}`);
});