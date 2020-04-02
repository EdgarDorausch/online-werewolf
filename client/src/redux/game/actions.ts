import {
  SetScreenAction, ScreenID, GameActions
} from './types';

export function setName(screen: ScreenID): GameActions {
  return {
    type: '@@GAME/SET_SCREEN',
    payload: {
      screen
    }
  }
};

export function setPlayerId(id: number): GameActions {
  return {
    type: '@@GAME/SET_PLAYER_ID',
    payload: {
      id
    }
  }
};

