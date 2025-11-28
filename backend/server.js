const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const PORT = 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// DATA STORAGE
let devices = []; 
let activities = {}; 

// CHECK API KEY
const checkApiKey = (req, res, next) => {
    const apiKey = req.headers['x-api-key'];
    if (apiKey === '12345') {
        next();
    } else {
        res.status(401).json({ error: "Unauthorized" });
    }
};

// --- ROUTES ---

// 1. Register Device
app.post('/devices', checkApiKey, (req, res) => {
    const { deviceId, name, type } = req.body;
    if (!deviceId || !name || !type) return res.status(400).json({ error: "All fields are required" });
    if (devices.find(d => d.deviceId === deviceId)) return res.status(400).json({ error: "Device already exists" });

    devices.push({ deviceId, name, type });
    activities[deviceId] = []; 
    res.json({ message: "Device registered successfully" });
});

// 2. Save Activity
app.post('/devices/:deviceId/activity', checkApiKey, (req, res) => {
    const { deviceId } = req.params;
    const { temperature, battery, timestamp } = req.body;
    if (!devices.find(d => d.deviceId === deviceId)) return res.status(404).json({ error: "Device not found" });

    activities[deviceId].push({ temperature, battery, timestamp });
    res.json({ message: "Activity saved successfully" });
});

// 3. Get Latest Activity
app.get('/devices/:deviceId/activity/latest', checkApiKey, (req, res) => {
    const acts = activities[req.params.deviceId];
    if (!acts || acts.length === 0) return res.status(404).json({ error: "No activity found" });
    res.json({ deviceId: req.params.deviceId, ...acts[acts.length - 1] });
});

// 4. List Devices
app.get('/devices', checkApiKey, (req, res) => {
    res.json(devices);
});

// Start server
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});