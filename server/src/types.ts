import * as uuid from 'uuid';

type FindLobbyResponseType =
  'NOT_FOUND' |
  'ALREADY_STARTED' |
  'OK';

type FindLobbyResponse = {type: 'ALREADY_STARTED' | 'NOT_FOUND'} |
  {type: 'OK', session: LobbySession}

export class GameSessionManager {
  private sessions: {[k: string]: GameSessionPointer} = {};

  createNewLobby(): string {
    const sessionId = uuid.v1();
    this.sessions[sessionId] =  new GameSessionPointer();
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

class SessionMember {
  id: string

  constructor(public userName: string) {
    this.id = uuid.v1();
  }
}

class GameSessionPointer {
  public session: GameSession

  constructor() {
    this.onGameStart.bind(this);
    this.session = new LobbySession(this.onGameStart);
  }

  private onGameStart(newSession: StartedSession) {
    this.session = newSession;
  }
}

export class LobbySession {
  private members: SessionMember[] = []

  constructor(private onGameStart: (s: StartedSession) => void) {}

  startGame(): StartedSession {
    const startedSession = new StartedSession(this.members);
    this.onGameStart(startedSession);
    return startedSession;
  }

  /**
   * @returns SessionMemberID
   */
  join(userName: string): string|null {
    if(this.members.some(m => m.userName === userName))
      return null;

    const newMember = new SessionMember(userName);
    this.members.push(newMember);
    return newMember.id;
  }

  leave(memberId: string) {
    this.members = this.members.filter(m => m.id !== memberId);
  }
}

export class StartedSession {
  constructor(private members: SessionMember[]) {}
}
type GameSession = LobbySession | StartedSession;

export enum SocketProtocolEvents {
  REQ_JOIN_LOBBY = 'REQ_JOIN_LOBBY',
  CREATE_NEW_LOBBY = 'CREATE_NEW_LOBBY',

  VISIT_LOBBY = 'VISIT_LOBBY'
}