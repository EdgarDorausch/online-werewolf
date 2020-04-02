import React from 'react';
import { ApplicationState } from '../../redux';
import { Player } from '../../redux/player/types';
import { setName } from '../../redux/player/actions';
import { connect } from 'react-redux';

function Players({players}: {players: Player[]}) {
  return (
    <ul>
      {players.map(player => <li>{player.name}</li>)}
    </ul>
  )
}

const mapStateToProps = (state: ApplicationState /*, ownProps*/) => {
  return {
    players: state.player
  }
}

const mapDispatchToProps = { setName }

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Players)