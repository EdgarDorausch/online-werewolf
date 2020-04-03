import * as express from 'express';
import { json, urlencoded } from 'body-parser';
import * as socketio from 'socket.io';
import { SocketProtocolEvents, GameSessionManager } from './types';
import lobbyRouter from './routers/lobby';

const app = express();
app.set("port", process.env.PORT || 8000);

const http = require("http").Server(app);
const io = require('socket.io')(http) as SocketIO.Server

// simple '/' endpoint sending a Hello World
// response

app.use(json());
app.use(urlencoded({ extended: true }));



app.use('/lobby', lobbyRouter);

app.get("/", (req: any, res: any) => {
  res.send('hi');
});


export const gsm = new GameSessionManager();

// ====== Socket Io ================
// io.on("connection", socket => {
//   console.log("a user connected");

//   socket.on('message', m => {
//     console.log(m);
//     socket.send('hi')
//   });

//   socket.on(SocketProtocolEvents.REQ_JOIN_LOBBY, sessionId => {
//     console.log(sessionId);
//     socket.send('hi')
//   });

//   socket.on(SocketProtocolEvents.CREATE_NEW_LOBBY, () => {
//     const sessionID = gsm.createNewLobby();

//     console.log(`Created new Session: ${sessionID}`)

//     socket.emit(SocketProtocolEvents.VISIT_LOBBY, sessionID);
//   })
// });

// start our simple server up on localhost:3000
const server = http.listen(8000, function() {
  console.log("listening on *:8000");
});