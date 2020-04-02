import { Reducer } from 'redux';
import { PlayerState, PlayerActions } from './types';

export const initialState: PlayerState = [{name: 'peter', id: 0}]

const reducer: Reducer<PlayerState, PlayerActions> = (state: PlayerState = initialState, {type, payload}: PlayerActions) => {
  switch (type) {
    case '@@Player/SET_NAME':
      return state.map(oldPlayer => {
        if (oldPlayer.id !== payload.id) {
          return oldPlayer;
        } else {
          return {
            ...oldPlayer,
            name: payload.name
          }
        }
      })

    default:
      return state;
  }
};
  
export default reducer;