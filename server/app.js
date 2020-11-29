const express = require("express");
const http = require("http");

const port = process.env.PORT || 4001;
const index = require("./routes/index");

const { Client } = require('pg');

const app = express();
app.use(index);

const server = http.createServer(app);

console.log(process.env.DATABASE_URL);

const client = new Client({
    connectionString: process.env.DATABASE_URL,
    ssl: {
        rejectUnauthorized: false
    }
});

client.connect();

const io = require("socket.io")(server, {
    cors: {
        origin: "http://localhost:3000",
        methods: ["GET", "POST"]
    }
});

io.on("connection", (socket) => {
    console.log("New client connected");
    socket.on("disconnect", () => {
        console.log("Client disconnected");
    });
    socket.on("trial", data => {
        console.log(data);
    });
});

server.listen(port, () => console.log(`Listening on port ${port}`));
