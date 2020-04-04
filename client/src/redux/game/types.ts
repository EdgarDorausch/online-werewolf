import { Action } from 'redux';

export enum ScreenID {
  VILLAGER_SLEEPING
}

export enum GameStatus {
  STARTED,
  LOBBY,
  MAIN,
  CREATE_LOBBY,
  JOIN_LOBBY
} 

export type GameState = {
  currentScreen: ScreenID
  ownPlayerId: number
  status: GameStatus
};

// Action-Types:
export interface SetScreenAction extends Action {
  type: '@@GAME/SET_SCREEN';
  payload: {
    screen: ScreenID,
  };
}

export interface SetOwnPlayerIdAction extends Action {
  type: '@@GAME/SET_PLAYER_ID';
  payload: {
    id: number,
  };
}

export interface SetGameStatusAction extends Action {
  type: '@@GAME/SET_GAME_STATUS';
  payload: {
    status: GameStatus,
  };
}


export type GameActions =
  SetScreenAction |
  SetOwnPlayerIdAction |
  SetGameStatusAction