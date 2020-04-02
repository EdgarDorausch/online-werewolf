import React from 'react';
import { ApplicationState } from '@redux/index';
import { Role } from '@redux/player/types';
import { connect } from 'react-redux';

type Props = {
} & ReturnType<typeof mapStateToProps>;

function resolveRoleName(role: Role): string {
  switch(role) {
    case Role.AMOR:
      return 'Amor';
    case Role.SEER:
      return 'Seher';
    case Role.VILLAGER:
      return 'Dorfbewohner';
    case Role.WEREWOLF:
      return 'Werwolf';
    case Role.WITCH:
      return 'Hexe';
  }
}

function ShowRoleHeader({role}: Props) {
  if (role === null) {
    throw new Error();
  }

  const roleName = resolveRoleName(role);

  return (
  <h3>Du bist ein {roleName}</h3>
  )
}

function mapStateToProps(state: ApplicationState) {
  const ownId = state.game.ownPlayerId;
  const self = state.player.find(p => p.id === ownId);
  
  if (self === undefined) {
    throw new Error('own player id is invalid');
  }

  return {
    role: self.role
  }
}

export default connect(mapStateToProps)(ShowRoleHeader);