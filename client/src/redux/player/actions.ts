import {
  SetNameAction, AddPlayerAction
} from './types';

export function setName(name: string, id: number): SetNameAction {
  return {
    type: '@@Player/SET_NAME',
    payload: {
      name,
      id
    }
  }
};

export function addPlayer(name: string, id: number): AddPlayerAction {
  return {
    type: '@@Player/ADD_PLAYER',
    payload: {
      name,
      id
    }
  }
};