import { Action } from 'redux';

export enum ScreenID {
  VILLAGER_SLEEPING
}

export type GameState = {
  currentScreen: ScreenID
  ownPlayerId: string
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
    id: string,
  };
}


export type GameActions =
  SetScreenAction |
  SetOwnPlayerIdAction