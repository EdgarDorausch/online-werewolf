import React, { CSSProperties } from 'react';
import { ApplicationState } from '@redux/index';
import { Player } from '@redux/player/types';
import { setName } from '@redux/player/actions';
import { connect } from 'react-redux';

export const PLAYER_PANEL_WIDTH = 350;

interface AlivePlayerPanelItemProps {
  name: string
}
const AlivePlayerPanelItem = ({name}: AlivePlayerPanelItemProps) => (
  <li
    style={{
      listStyle: 'none',
      height: 35
    }}
  >{name}</li>
)
interface DeadPlayerPanelItemProps {
  name: string
}
const DeadPlayerPanelItem = ({name}: AlivePlayerPanelItemProps) => (
  <li
    style={{
      listStyle: 'none',
      height: 35,
      color: 'gray'
    }}
  >{name}</li>
)

const labelStyle: CSSProperties = {
  listStyle: 'none',
  textAlign: 'center',
  color: 'gray'
};

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
      <li style={labelStyle}>Am Leben</li>

      {players.filter(player => player.alive).map(player => <AlivePlayerPanelItem name={player.name} />)}

      <li style={labelStyle}>✞ Verstorben ✞</li>

      {players.filter(player => !player.alive).map(player => <DeadPlayerPanelItem name={player.name} />)}
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