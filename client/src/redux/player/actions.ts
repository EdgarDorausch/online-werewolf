import {
  SetNameAction
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