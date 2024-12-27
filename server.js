const express = require('express');
const http = require('http');
const { Server } = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = new Server(server);

// Serve static files
app.use(express.static('public'));

// Store document content
let documentContent = "";

// Handle real-time collaboration
io.on('connection', (socket) => {
    console.log('A user connected');

    // Send the current document content to the new user
    socket.emit('load document', documentContent);

    // Listen for changes and broadcast them
    socket.on('edit document', (newContent) => {
        documentContent = newContent; // Update the content
        socket.broadcast.emit('update document', newContent); // Notify others
    });

    socket.on('disconnect', () => {
        console.log('A user disconnected');
    });
});

const PORT = 3000;
server.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
