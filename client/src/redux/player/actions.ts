import {
  PlayerActions, Role
} from './types';

export function setName(name: string, id: string): PlayerActions {
  return {
    type: '@@Player/SET_NAME',
    payload: {
      name,
      id
    }
  }
};

export function addPlayer(name: string, id: string): PlayerActions {
  return {
    type: '@@Player/ADD_PLAYER',
    payload: {
      name,
      id
    }
  }
};

export function setLovers(player1Id: string, player2Id: string): PlayerActions {
  return {
    type: '@@Player/SET_LOVERS',
    payload: {
      player1Id,
      player2Id
    }
  }
};

export function setRole(id: string, role: Role): PlayerActions {
  return {
    type: '@@Player/SET_ROLE',
    payload: {
      id,
      role
    }
  }
};

export function setAliveStatus(id: string, alive: boolean): PlayerActions {
  return {
    type: '@@Player/SET_ALIVE_STATUS',
    payload: {
      id,
      alive
    }
  }
};