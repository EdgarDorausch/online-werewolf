import * as express from 'express';
import * as socketio from 'socket.io';

const app = express();
app.set("port", process.env.PORT || 8000);

const http = require("http").Server(app);
const io = require('socket.io')(http)

// simple '/' endpoint sending a Hello World
// response
app.get("/", (req: any, res: any) => {
  res.send("hello world");
});

io.on("connection", function(socket: any) {
  console.log("a user connected");
  // whenever we receive a 'message' we log it out
  socket.on("message", function(message: any) {
    console.log(message);
  });
});

// start our simple server up on localhost:3000
const server = http.listen(8000, function() {
  console.log("listening on *:8000");
});