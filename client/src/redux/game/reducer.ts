import { Reducer } from 'redux';
import { GameActions, GameState, ScreenID, GameStatus } from './types';

export const initialState: GameState = {
  currentScreen: ScreenID.VILLAGER_SLEEPING,
  ownPlayerId: 0, //TODO:
  status: GameStatus.PENDING
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

    default:
      return state;
  }
};
  
export default reducer;