import { Server } from "socket.io";
import http from "http";
import express from "express";

const app = express();

// Create HTTP server from Express app
const server = http.createServer(app);

// Initialize Socket.IO server with CORS config
const io = new Server(server, {
  cors: {
    origin: ["http://localhost:5173"],
    methods: ["GET", "POST"],
  },
});

// Return socket ID for a given receiver ID
export const getReceiverSocketId = (receiverId) => {
  return userSocketMap[receiverId];
};

// Store mapping of userId → socketId
const userSocketMap = {}; // {userId: socketId}

// Handle new socket connection
io.on("connection", (socket) => {
  console.log("a user connected", socket.id);

  // Extract userId from handshake query
  const userId = socket.handshake.query.userId;

  // Map userId to socketId when valid
  if (userId != "undefined") userSocketMap[userId] = socket.id;

  // Broadcast updated list of online users
  io.emit("getOnlineUsers", Object.keys(userSocketMap));

  // Handle socket disconnect event
  socket.on("disconnect", () => {
    console.log("user disconnected", socket.id);

    // Remove user from user-socket map
    delete userSocketMap[userId];

    // Broadcast updated online users list after disconnect
    io.emit("getOnlineUsers", Object.keys(userSocketMap));
  });
});

export { app, io, server };
