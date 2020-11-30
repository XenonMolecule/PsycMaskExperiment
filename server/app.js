const express = require("express");
const http = require("http");

const port = process.env.PORT || 4001;
const index = require("./routes/index");
const path = require('path');

const { Client } = require('pg');

const app = express();
app.use(index);

app.use(express.static(path.join(__dirname, 'build')));

app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

const server = http.createServer(app);

const client = new Client({
    connectionString: process.env.DATABASE_URL,
    ssl: {
        rejectUnauthorized: false
    }
    // user: 'michaelryan',
    // host: 'localhost',
    // database: 'michaelryan',
    // password: null,
    // port: 5432,
});

client.connect();

// client.query("INSERT INTO \"Trial\".\"Trial\" (actual_emotion, other_emotion, picked_emotion, " +
//     "correct, image_number, mask, time, userid) VALUES ('Happy','Angry','Happy',true, 1, true, 1001,'1234')", (err, res) => {
//     console.log(err, res);
//     client.end()
// });

// client.query("SELECT * FROM \"Trial\".\"Trial\"", (err, res) => {
//     console.log(err, res);
// });

const io = require("socket.io")(server, {
    cors: {
        origin: "http://psyc1101.herokuapp.com/",
        methods: ["GET", "POST"]
    }
});

io.on("connection", (socket) => {
    console.log("New client connected");
    socket.on("disconnect", () => {
        console.log("Client disconnected");
    });
    socket.on("trial", data => {
        let queryString = "INSERT INTO \"Trial\".\"Trial\" (actual_emotion, other_emotion, picked_emotion, " +
            "correct, image_number, mask, time, userid) VALUES ('" +
            data['actual_emotion'] + "','" +
            data['other_emotion'] + "','" +
            data['picked_emotion'] + "','" +
            data['correct'] + "','" +
            data['image_number'] + "','" +
            data['mask'] + "','" +
            data['time'] + "','" +
            data['userid'] + "')";
        client.query(queryString, (err, res) => {
            if (err) {
                console.log(err);
            }
        })
    });
});

server.listen(port, () => console.log(`Listening on port ${port}`));
