import { Reducer } from 'redux';
import { GameActions, GameState, ScreenID, GameStatus } from './types';

export const initialState: GameState = {
  currentScreen: ScreenID.VILLAGER_SLEEPING,
  ownPlayerId: '0', //TODO:
  status: GameStatus.LOADING
};

const reducer: Reducer<GameState, GameActions> = (state: GameState = initialState, action: GameActions) => {
  switch (action.type) {
    case '@@GAME/SET_SCREEN':
      return {
        ...state,
        currentScreen: action.payload.screen
      }
    case '@@GAME/SET_PLAYER_ID':
      return {
        ...state,
        ownPlayerId: action.payload.id
      }
    case '@@GAME/SET_GAME_STATUS':
      return {
        ...state,
        status: action.payload.status
      }
    case '@@GAME/START_MAIN_SCREEN':
      return {
        ...state,
        status: GameStatus.MAIN,
        ownPlayerId: action.payload.memberId
      }

    default:
      return state;
  }
};
  
export default reducer;