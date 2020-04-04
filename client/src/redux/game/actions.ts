import {
  SetScreenAction, ScreenID, GameActions, GameStatus
} from './types';

export function setName(screen: ScreenID): GameActions {
  return {
    type: '@@GAME/SET_SCREEN',
    payload: {
      screen
    }
  }
};

export function setPlayerId(id: string): GameActions {
  return {
    type: '@@GAME/SET_PLAYER_ID',
    payload: {
      id
    }
  }
};

export function setGameStatus(status: GameStatus): GameActions {
  return {
    type: '@@GAME/SET_GAME_STATUS',
    payload: {
      status
    }
  }
};

export function startMainScreen(memberId: string): GameActions {
  return {
    type: '@@GAME/START_MAIN_SCREEN',
    payload: {
      memberId
    }
  }
};