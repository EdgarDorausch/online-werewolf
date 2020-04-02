import {
  SetNameAction, AddPlayerAction, PlayerActions, Role
} from './types';

export function setName(name: string, id: number): PlayerActions {
  return {
    type: '@@Player/SET_NAME',
    payload: {
      name,
      id
    }
  }
};

export function addPlayer(name: string, id: number): PlayerActions {
  return {
    type: '@@Player/ADD_PLAYER',
    payload: {
      name,
      id
    }
  }
};

export function setLovers(player1Id: number, player2Id: number): PlayerActions {
  return {
    type: '@@Player/SET_LOVERS',
    payload: {
      player1Id,
      player2Id
    }
  }
};

export function setRole(id: number, role: Role): PlayerActions {
  return {
    type: '@@Player/SET_ROLE',
    payload: {
      id,
      role
    }
  }
};

export function setAliveStatus(id: number, alive: boolean): PlayerActions {
  return {
    type: '@@Player/SET_ALIVE_STATUS',
    payload: {
      id,
      alive
    }
  }
};