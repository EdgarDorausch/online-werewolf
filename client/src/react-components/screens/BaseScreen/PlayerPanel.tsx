import React from 'react';
import { ApplicationState } from '@redux/index';
import { Player } from '@redux/player/types';
import { setName } from '@redux/player/actions';
import { connect } from 'react-redux';

export const PLAYER_PANEL_WIDTH = 350;

interface PlayerPanelItemProps {
  name: string
}
const  PlayerPanelItem = ({name}: PlayerPanelItemProps) => (
  <li
    style={{
      listStyle: 'none',
      height: 35
    }}
  >{name}</li>
)

function PlayersPanel({players}: {players: Player[]}) {
  return (
    <ul style={{
      backgroundColor: '#414154',
      height: 'calc(100vh-20px)',
      width: PLAYER_PANEL_WIDTH,
      margin: 0,
      boxShadow: '0px 0px 18px #00000066',
      zIndex: 0,
      color: 'white',
      padding: 20,
      fontSize: 20
    }}>
      {players.map(player => <PlayerPanelItem name={player.name} />)}
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
)(PlayersPanel)