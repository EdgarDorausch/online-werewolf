import { Action } from 'redux';

export type PlayerState = Player[];

export enum Role {
  WEREWOLF,
  VILLAGER,
  WITCH,
  AMOR,
  SEER
}

export type Player = {
  id: number
  name: string
  inLoveWith: number|null
  role: Role|null
  alive: boolean
};

// Action-Types:
export interface SetNameAction extends Action {
  type: '@@Player/SET_NAME';
  payload: {
    id: number,
    name: string,
  };
}

export interface AddPlayerAction extends Action {
  type: '@@Player/ADD_PLAYER';
  payload: {
    id: number,
    name: string,
  };
}

export interface SetLoversAction extends Action {
  type: '@@Player/SET_LOVERS';
  payload: {
    player1Id: number,
    player2Id: number,
  };
}

export interface SetPlayerRoleAction extends Action {
  type: '@@Player/SET_ROLE';
  payload: {
    id: number,
    role: Role
  };
}

export interface SetPlayerAliveStatusAction extends Action {
  type: '@@Player/SET_ALIVE_STATUS';
  payload: {
    id: number,
    alive: boolean
  };
}


export type PlayerActions =
  SetNameAction |
  AddPlayerAction |
  SetLoversAction |
  SetPlayerRoleAction |
  SetPlayerAliveStatusAction