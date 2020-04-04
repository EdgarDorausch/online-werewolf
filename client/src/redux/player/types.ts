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
  id: string
  name: string
  inLoveWith: string|null
  role: Role|null
  alive: boolean
};

// Action-Types:
export interface SetNameAction extends Action {
  type: '@@Player/SET_NAME';
  payload: {
    id: string,
    name: string,
  };
}

export interface AddPlayerAction extends Action {
  type: '@@Player/ADD_PLAYER';
  payload: {
    id: string,
    name: string,
  };
}

export interface SetLoversAction extends Action {
  type: '@@Player/SET_LOVERS';
  payload: {
    player1Id: string,
    player2Id: string,
  };
}

export interface SetPlayerRoleAction extends Action {
  type: '@@Player/SET_ROLE';
  payload: {
    id: string,
    role: Role
  };
}

export interface SetPlayerAliveStatusAction extends Action {
  type: '@@Player/SET_ALIVE_STATUS';
  payload: {
    id: string,
    alive: boolean
  };
}


export type PlayerActions =
  SetNameAction |
  AddPlayerAction |
  SetLoversAction |
  SetPlayerRoleAction |
  SetPlayerAliveStatusAction