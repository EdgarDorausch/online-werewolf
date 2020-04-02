import {
  SetScreenAction, ScreenID
} from './types';

export function setName(screen: ScreenID): SetScreenAction {
  return {
    type: '@@GAME/SET_SCREEN',
    payload: {
      screen
    }
  }
};

