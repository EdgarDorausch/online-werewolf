import * as uuid from 'uuid';
import { info } from 'winston';
import logger from './logger';

export type FindLobbyResponseType =
  'NOT_FOUND' |
  'ALREADY_STARTED' |
  'OK';

type FindLobbyResponse = {type: 'ALREADY_STARTED' | 'NOT_FOUND'} |
  {type: 'OK', session: LobbySession}

export class GameSessionManager {
  private sessions: {[k: string]: GameSessionPointer} = {};

  createNewLobby(member: SessionMember, userName: string): string {
    const sessionId = uuid.v1();
    this.sessions[sessionId] =  new GameSessionPointer(new Player(member, userName));
    return sessionId;
  }

  findLobby(id: string): FindLobbyResponse {
    const res = this.sessions[id];
    if (res === undefined) {
      return {type: 'NOT_FOUND'}
    }
    if (res.session instanceof StartedSession) {
      return {type: 'ALREADY_STARTED'}
    }

    return {type: 'OK', session: res.session}
  }

}

export class MemberManager {
  private members: {[k: string]: SessionMember} = {};

  add(socket: SocketIO.Socket): SessionMember {
    const newId = uuid.v1();
    const newMember = new SessionMember(newId, socket);
    this.members[newId] = newMember;

    socket.on('disconnecting', () => {
      this.remove(newId);
      newMember.onDisconnect()
    })

    return newMember;
  }

  get(id: string): SessionMember|null {
    const member = this.members[id];

    if (member === undefined) {
      return null;
    } else {
      return member;
    }
  }

  remove(id: string) {
    delete this.members[id];
  }
}

class SessionMember {
  disconnectCallbacks: ((id: string) => void)[] = []

  constructor(public id: string, private socket: SocketIO.Socket) {}

  onDisconnect() {
    logger.info(`Disconnection (MemberId: ${this.id})`);
    this.disconnectCallbacks.forEach(cb => cb(this.id));
  }

  addDisconnectListener(callback: (id: string) => void) {
    this.disconnectCallbacks.push(callback);
  }
}

class Player {
  constructor(public member: SessionMember, public userName: string) {}
}

class GameSessionPointer {
  public session: GameSession

  constructor(creator: Player) {
    this.onGameStart.bind(this);
    this.session = new LobbySession(creator, this.onGameStart);
  }

  private onGameStart(newSession: StartedSession) {
    this.session = newSession;
  }
}

export class LobbySession {
  private players: Player[] = []
  private roomBroadcast: SocketIO.Socket;

  constructor(private creator: Player, private onGameStart: (s: StartedSession) => void) {}

  startGame(): StartedSession {
    const startedSession = new StartedSession(this.players);
    this.onGameStart(startedSession);
    return startedSession;
  }

  /**
   * @returns if joining was successful
   */
  join(userName: string, member: SessionMember): boolean {
    if(this.players.some(p => p.userName === userName))
      return false;

    const newPlayer = new Player(member, userName);
    this.players.push(newPlayer);
    return true;
  }

  leave(memberId: string) {
    this.players = this.players.filter(p => p.member.id !== memberId);
  }
}

export class StartedSession {
  constructor(private players: Player[]) {}
}
type GameSession = LobbySession | StartedSession;

export enum SocketProtocolEvents {
  REQ_JOIN_LOBBY = 'REQ_JOIN_LOBBY',
  CREATE_NEW_LOBBY = 'CREATE_NEW_LOBBY',

  VISIT_LOBBY = 'VISIT_LOBBY'
}