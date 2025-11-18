// backend/models/Telemetry.js

const mongoose = require('mongoose');

const TelemetrySchema = new mongoose.Schema({
    aircraftId: {
        type: String,
        required: true,
        index: true // Add an index for faster queries by aircraftId
    },
    timestamp: {
        type: Date,
        required: true,
        index: true // Add an index for faster queries by time
    },
    latitude: { type: Number, required: true },
    longitude: { type: Number, required: true },
    altitude: { type: Number, required: true },
    speed: { type: Number, required: true },
    heading: { type: Number, required: true }
});

// Create the model from the schema
const Telemetry = mongoose.model('Telemetry', TelemetrySchema);

module.exports = Telemetry;