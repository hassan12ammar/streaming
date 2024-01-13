const express = require('express');
const http = require('http');
const WebSocket = require('ws');
const path = require('path');

const app = express();
const server = http.createServer(app);
const wss = new WebSocket.Server({ server });

let hostWebSocket = null; // Store the WebSocket of the host
let initialStartTime = 0; // Initial starting time for clients

app.use(express.static(path.join(__dirname, 'public')));

// app.get('/', (req, res) => {
//     res.sendFile(path.join(__dirname, 'public', 'index.html'));
// });

wss.on('connection', (ws) => {
    console.log('Client connected');

    // If this is the first client (host), set it as the host
    if (!hostWebSocket) {
        hostWebSocket = ws;
        console.log('Host connected');
    }

    // Send a message to clients informing them about the host
    wss.clients.forEach((client) => {
        if (client !== ws && client.readyState === WebSocket.OPEN) {
            client.send(JSON.stringify({ type: 'hostConnected' }));
        }
    });

    // Send the initial starting time to the newly connected client
    ws.send(JSON.stringify({ type: 'initialStartTime', initialStartTime }));

    ws.on('message', (message) => {
        // Parse the incoming message
        const data = JSON.parse(message);

        // Update initial starting time when the host changes it
        if (hostWebSocket === ws && data.type === 'updateInitialStartTime') {
            initialStartTime = data.initialStartTime;

            // Broadcast the updated initial starting time to all clients
            wss.clients.forEach((client) => {
                if (client !== ws && client.readyState === WebSocket.OPEN) {
                    client.send(JSON.stringify({ type: 'initialStartTime', initialStartTime }));
                }
            });
        } else if (hostWebSocket === ws && data.type === 'operation') {
            // Broadcast the operation to all clients
            wss.clients.forEach((client) => {
                if (client !== ws && client.readyState === WebSocket.OPEN) {
                    client.send(JSON.stringify({ type: 'operation', operation: data.operation }));
                }
            });
        }
    });

    ws.on('close', () => {
        console.log('Client disconnected');
        // If the host disconnects, reset the host and inform clients
        if (ws === hostWebSocket) {
            console.log('Host disconnected');
            hostWebSocket = null;

            // Send a message to clients informing them that the host disconnected
            wss.clients.forEach((client) => {
                if (client !== ws && client.readyState === WebSocket.OPEN) {
                    client.send(JSON.stringify({ type: 'hostDisconnected' }));
                }
            });
        }
    });
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
});
