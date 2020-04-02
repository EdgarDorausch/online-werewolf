import { Action } from 'redux';

export type PlayerState = Player[];

export type Player = {
  id: number,
  name: string
};

// Action-Types:
export interface SetNameAction extends Action {
  type: '@@Player/SET_NAME';
  payload: {
    id: number,
    name: string,
  };
}


export type PlayerActions =
  SetNameAction 