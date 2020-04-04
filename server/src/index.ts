import express from 'express';
import { json, urlencoded } from 'body-parser';
import socketio from 'socket.io';
import { SocketProtocolEvents, GameSessionManager, FindLobbyResponseType, MemberManager } from './types';
import lobbyRouter from './routers/lobby';
import logger from './logger';
import { Foo } from '../../shared/shared'

console.log(Foo)

const app = express();
app.set("port", process.env.PORT || 8000);

const http = require("http").Server(app);
const io = socketio(http)

// simple '/' endpoint sending a Hello World
// response

app.use(json());
app.use(urlencoded({ extended: true }));



app.use('/lobby', lobbyRouter);

app.get("/", (req: any, res: any) => {
  res.send('hi');
});


interface Socket_JoinRequest {
  sessionId: string,
  userName: string,
}
interface Socket_JoinResponse {
  status: FindLobbyResponseType
}

interface Socket_UserJoinedMessage {

}

export const gsm = new GameSessionManager();
export const mm = new MemberManager()

// ====== Socket Io ================
io.on("connection", socket => {
  
  // New Connection Routine
  const member = mm.add(socket);
  logger.info(`New connection (MemberId: ${member.id})`);
  socket.emit('MemberId', member.id);

  socket.on('message', m => {
    console.log(m);
    socket.send('hi')
  });

  // socket.on('join', ({sessionId, userName}: Socket_JoinRequest) => {
  //   const findRes = gsm.findLobby(sessionId);


  //   switch (findRes.type) {
  //     case 'NOT_FOUND':
  //       socket.emit('join', {status: 'NOT_FOUND'});
  //       break;
  //     case 'ALREADY_STARTED':
  //       socket.emit('join', {status: 'ALREADY_STARTED'});
  //       break;
  //     case 'OK':
  //       const room = socket.in(sessionId);
  //       const memberId = findRes.session.join(userName, room);
  //       if (memberId === null) {
  //         socket.emit('join', {status: 'NAME_ALREADY_TAKEN'});
  //       }
  //       else {
  //         setupRoomConnection(room);
  //         socket.emit('join', {status: 'OK', body: {memberId,userName}});
  //       }
  //       break;
  //   }   
  // })

  

  // socket.on(SocketProtocolEvents.REQ_JOIN_LOBBY, sessionId => {
  //   console.log(sessionId);
  //   socket.send('hi')
  // });

  // socket.on(SocketProtocolEvents.CREATE_NEW_LOBBY, () => {
  //   const sessionID = gsm.createNewLobby();

  //   console.log(`Created new Session: ${sessionID}`)

  //   socket.emit(SocketProtocolEvents.VISIT_LOBBY, sessionID);
  // })
});

function setupRoomConnection(conn: socketio.Socket) {
  // conn.on('UserJoined', )
}

// start our simple server up on localhost:3000
const server = http.listen(8000, function() {
  console.log("listening on *:8000");
});