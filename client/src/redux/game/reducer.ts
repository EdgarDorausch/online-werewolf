import { Reducer } from 'redux';
import { GameActions, GameState, ScreenID } from './types';

export const initialState: GameState = {
  currentScreen: ScreenID.VILLAGER_SLEEPING
};

const reducer: Reducer<GameState, GameActions> = (state: GameState = initialState, {type, payload}) => {
  switch (type) {
    case '@@GAME/SET_SCREEN':
      return {
        ...state,
        currentScreen: payload.screen
      }

    default:
      return state;
  }
};
  
export default reducer;