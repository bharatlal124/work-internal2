//server.js
const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const cors = require("cors");

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173", 
    methods: ["GET", "POST"],
  },
});

app.use(cors());
app.use(express.json());

// In-memory board state
let boardState = {
  columns: {},
  tasks: {},
};

// Track number of online users
let onlineUsers = 0;

io.on("connection", (socket) => {
  console.log(`⚡ User connected: ${socket.id}`);

  onlineUsers++;
  io.emit("online_users", onlineUsers); // broadcast updated count

  // Send current board state to new client
  socket.emit("board_state", boardState);

  // Handle task updates
  socket.on("update_board", (newState) => {
    boardState = newState;
    socket.broadcast.emit("board_state", boardState); // broadcast to others
  });

  socket.on("disconnect", () => {
    console.log(`🚫 User disconnected: ${socket.id}`);
    onlineUsers = Math.max(0, onlineUsers - 1);
    io.emit("online_users", onlineUsers); // update others
  });
});

const PORT = 4000;
server.listen(PORT, () => {
  console.log(`✅ Server running on http://localhost:${PORT}`);
});
