const express = require('express');
const http = require('http');
const WebSocket = require('ws');

const app = express();
const server = http.createServer(app);
const wss = new WebSocket.Server({ server });

// WebSocket connection handling
wss.on('connection', (ws) => {
    console.log('Client connected');

    // Listen for messages from clients
    ws.on('message', (message) => {
        // Broadcast the message to all connected clients
        wss.clients.forEach((client) => {
            if (client.readyState === WebSocket.OPEN) {
                message = message.toString();
                // Send the message as is (assuming it can be converted to a string)
                client.send(message);
            }
        });
    });

    // Listen for WebSocket closure
    ws.on('close', () => {
        console.log('Client disconnected');
    });
});

// Start the server
const PORT = process.env.PORT || 3005;
server.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
});

