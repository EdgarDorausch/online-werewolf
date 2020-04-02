import { Action } from 'redux';

export enum ScreenID {
  VILLAGER_SLEEPING
}

export type GameState = {
  currentScreen: ScreenID
};

// Action-Types:
export interface SetScreenAction extends Action {
  type: '@@GAME/SET_SCREEN';
  payload: {
    screen: ScreenID,
  };
}


export type GameActions =
  SetScreenAction