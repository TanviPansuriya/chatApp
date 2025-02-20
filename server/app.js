const express = require("express");
const port = process.env.PORT || 3000;
const db = require("./db/conn");
const env = require("dotenv").config();
const path = require("path");
const cors = require("cors");
const userRoutes = require("./routes/userRoutes");
const authRoutes = require("./routes/authRoutes");
const authMiddleware = require("./middleware/authMiddleware");
const { handleUserConnection } = require("./controller/userController");


const app = express();
app.use(express.json());
app.use(cors());

const http = require("http");
const { Server } = require("socket.io");
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "*",
  }
});

handleUserConnection(io);

app.use('/api/user', userRoutes);
app.use("/api/auth", authRoutes);

// io.on("connection", (socket) => {
//   console.log("User connected:", socket.id);


//   socket.on("sendMessage", (message) => {
//     console.log(message);
//     io.emit("receiveMessage", message);
//   });

//   socket.on("disconnect", () => {
//     console.log("User disconnected:", socket.id);
//   });

//   socket.on("sendMessage", (message) => {
//     console.log(`Message received: ${message}`,`${socket.id} sends a ${message}`);
//     socket.broadcast.emit("receiveMessage", `${socket.id} sends a ${message}`);
// });

//   socket.emit("welcome",`welcome to the server ${socket.id}`);
//   socket.broadcast.emit("welcome", `${socket.id} joined the server`);
// });


// app.use((req, res, next) => {
//     req.io = io;
//     next();
// });

server.listen(port, () => {
  console.log(`Server is running at ${port} no.`);
});
