const express = require('express');
const mongoose = require('mongoose');
const http = require('http');
const { Server } = require('socket.io');

// Load environment variables
require('dotenv').config(); 

// Import core components
const { connectDB } = require('./config/db');
const apiRoutes = require('./routes/api');
const connectToDB = require('./src/config/db');

// Initialize App
const app = express();
const port = process.env.PORT || 3000;
app.use(express.json()); // Body parser

// ----------------------------------------------------
// DATABASE & SERVER SETUP
// ---------------------------------------------------

// 2. Create HTTP server and integrate Socket.io
const server = http.createServer(app);
const io = new Server(server, {
    cors: {
        // Allows frontend running on any port to connect during development
        origin: '*', 
        methods: ['GET', 'POST', 'PUT', 'DELETE']
    }
});

// Expose Socket.io to all route handlers
app.set('socketio', io);

// ----------------------------------------------------
// ROUTES
// ----------------------------------------------------

app.use('/api/v1', apiRoutes);

// Global Error Handler (Good Practice)
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ 
        status: 'error', 
        message: 'Something went wrong!',
        error: process.env.NODE_ENV === 'development' ? err : undefined
    });
});

// ----------------------------------------------------
// SOCKET.IO HANDLER
// ----------------------------------------------------

io.on('connection', (socket) => {
    console.log(`Socket connected: ${socket.id}`);
    
    // Example: On frontend login, associate user ID with socket ID for targeted alerts
    socket.on('registerUser', async (userId) => {
        // Here you would typically save socket.id to the User document in MongoDB
        console.log(`User ${userId} registered socket ${socket.id}`);
    });

    socket.on('disconnect', () => {
        console.log(`Socket disconnected: ${socket.id}`);
    });
});


// ----------------------------------------------------
// START SERVER
// ----------------------------------------------------
app.listen(port, async() => {
  try {
    await connectToDB(process.env.mongo_URI)
    console.log(`Server is running at ${port}`);
  } catch (error) {
   console.log(error); 
  }
});