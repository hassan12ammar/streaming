# streaming
project for Hurry Up Hackathon 

# chat streaming
This simple WebSocket chat server allows clients to connect and exchange messages in real-time. The server is built using Node.js, Express, and the WebSocket library

## Server-side (Node.js)
Dependencies
express: Web framework for Node.js
http: HTTP module for creating a server
ws: WebSocket library

## Usage
Install dependencies: `npm install express http ws`

Run the server: `node chat_server.js` (assuming the code is in server.js)

## WebSocket Connection Handling
When a client connects ('connection' event), a WebSocket connection is established.
Messages from clients are broadcasted to all connected clients.
WebSocket closures are logged.

## Client-side (HTML)

## Usage
Open the HTML file in a web browser.
Enter a message in the input field and click the "Send" button.
The message will be sent to the server and broadcasted to all connected clients.

## WebSocket Connection
The client establishes a WebSocket connection with the server at ws://localhost:3005.

## Event Listeners
The client listens for incoming messages and appends them to the chat window.

## Message Sending
Users can type messages in the input field and click the "Send" button to send messages to the server.
This simple chat application demonstrates basic WebSocket communication between a server and multiple clients. Customize the code as needed for your specific use case.

# Video Streaming Application
This simple video streaming application allows clients to control video playback remotely using WebSocket communication. The application consists of a web page with video controls and a Node.js server that manages WebSocket connections and broadcasts commands.

## Client-side (HTML and JavaScript)
Features
Video control buttons: Forward, Backward, Stop
WebSocket connection to the server for real-time communication
Basic video.js setup for video playback

## Usage
Open the HTML file in a web browser.
Click the "Forward," "Backward," or "Stop" buttons to control video playback.
Commands are sent to the server via WebSocket, and the server broadcasts them to all connected clients.

## Server-side (Node.js)
Dependencies
express: Web framework for Node.js
http: HTTP module for creating a server
ws: WebSocket library
path: Path module for working with file paths

## Usage
Install dependencies: `npm install express http ws`

Run the server: `node video_express.js` (assuming the code is in server.js)

## WebSocket Connection Handling
Clients (host and viewers) connect to the WebSocket server.
The host controls the video, and viewers receive updates about the host's status.
Clients send and receive messages for operations and updates.

## Operation Handling
Buttons on the client trigger video control operations (forward, backward, stop).
Host WebSocket sends operation commands to all clients.
Clients receive operation commands and perform the corresponding video control.

## Host Management
The server tracks the host WebSocket.
When the host disconnects, the server resets the host and informs all clients.

## Broadcasting
The server broadcasts information to all connected clients, such as host connection, disconnection, initial start time, and video control operations.
