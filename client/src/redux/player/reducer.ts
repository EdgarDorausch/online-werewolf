import { Reducer } from 'redux';
import { PlayerState, PlayerActions } from './types';

export const initialState: PlayerState = [];

const reducer: Reducer<PlayerState, PlayerActions> = (state: PlayerState = initialState, action: PlayerActions) => {
  switch (action.type) {
    case '@@Player/SET_NAME':
      return state.map(oldPlayer => {
        if (oldPlayer.id !== action.payload.id) {
          return oldPlayer;
        } else {
          return {
            ...oldPlayer,
            name: action.payload.name
          }
        }
      });
    case '@@Player/ADD_PLAYER':
      return [...state, {
        name: action.payload.name,
        id: action.payload.id,
        inLoveWith: null,
        role: null,
        alive: true
      }];
    
    case '@@Player/SET_LOVERS':
      const alreadyInLove = state.some(p => p.inLoveWith !== null);
      const exits1 = state.some(p => p.id === action.payload.player1Id);
      const exits2 = state.some(p => p.id === action.payload.player2Id);

      if(alreadyInLove){
        throw new Error('Some players are already in love!')
      }

      if (!exits1 || !exits2){
        throw new Error('Some player ids are invalid')
      }

      return state.map(p => {
        switch (p.id) {
          case action.payload.player1Id:
            return {...p, inLoveWith: action.payload.player2Id};
          case action.payload.player2Id:
            return {...p, inLoveWith: action.payload.player1Id}
          default:
            return p;
        }
      })
    case '@@Player/SET_ROLE':
      return state.map(oldPlayer => {
        if (oldPlayer.id !== action.payload.id) {
          return oldPlayer;
        } else {
          return {
            ...oldPlayer,
            role: action.payload.role
          }
        }
      });
    case '@@Player/SET_ALIVE_STATUS':
      return state.map(oldPlayer => {
        if (oldPlayer.id !== action.payload.id) {
          return oldPlayer;
        } else {
          return {
            ...oldPlayer,
            alive: action.payload.alive
          }
        }
      });

    default:
      return state;
  }
};
  
export default reducer;