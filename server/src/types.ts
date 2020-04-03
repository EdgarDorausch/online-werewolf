import * as uuid from 'uuid';

enum FindLobbyResponseType {
  NOT_FOUND,
  ALREADY_STARTED,
  OK
}
type FindLobbyResponse = {type: FindLobbyResponseType.ALREADY_STARTED | FindLobbyResponseType.NOT_FOUND} |
  {type: FindLobbyResponseType.OK, session: LobbySession}

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
      return {type: FindLobbyResponseType.NOT_FOUND}
    }
    if (res.session instanceof StartedSession) {
      return {type: FindLobbyResponseType.ALREADY_STARTED}
    }

    return {type: FindLobbyResponseType.OK, session: res.session}
  }

}

class SessionMember {}

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