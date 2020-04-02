import { Reducer } from 'redux';
import { PlayerState, PlayerActions } from './types';

export const initialState: PlayerState = [];

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
    case '@@Player/ADD_PLAYER':
      return [...state, {
        name: payload.name,
        id: payload.id
      }]

    default:
      return state;
  }
};
  
export default reducer;