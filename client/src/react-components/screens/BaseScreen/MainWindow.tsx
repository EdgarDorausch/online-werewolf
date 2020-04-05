import React from 'react';
import { PLAYER_PANEL_WIDTH } from '@components/screens/BaseScreen/PlayerPanel';
import { connect } from 'react-redux';
import { ApplicationState } from '@redux/index';
import { ScreenID, GameStatus } from '@redux/game/types';
import VillagerSleeping from '../VillagerSleeping';
import DeadStatusHeader from './Header/DeadStatus';
import ShowRoleHeader from './Header/ShowRole';
import DefaultHeader from './Header/Default';
import Main from '../Main';
import Loading from '../Loading';

const BACKGROUND_DAY = 'linear-gradient(to right top, #051937, #004d7a, #008793, #00bf72, #a8eb12)';
const BACKGROUND_NIGHT = 'linear-gradient(to right bottom, #713858, #693a60, #5f3d67, #54416d, #464471, #354a75, #204f77, #005375, #005a6f, #005f63, #0c6254, #336444)'

const WINDOW_HEIGHT = 600;
const WINDOW_WIDTH = 900;

const HEADER_HEIGHT = 80;

interface MainWindowProps {
  Header: React.ComponentType
  Content: React.ComponentType
}
function MainWindow({Header, Content}: MainWindowProps) {
  return (
  <div style={{
    backgroundImage: true ? BACKGROUND_DAY : BACKGROUND_NIGHT, //TODO: Choose condition
    height: '100vh',
    width: `calc(100vw - ${PLAYER_PANEL_WIDTH}px)`,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  }}>
    <div style={{
      width: WINDOW_WIDTH,
      height: WINDOW_HEIGHT,
      backgroundColor: 'white',
      borderRadius: 10,
      boxShadow: '0px 0px 18px #00000066',
      position: 'relative',
      fontSize: 20
    }}>
      <div style={{
        position: 'absolute',
        top: 0,
        height: HEADER_HEIGHT,
        left: 0,
        right: 0,
        // backgroundColor: 'red',
        borderBottom: '2px solid #ccc',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}>
        <Header/>
      </div>

      <div style={{
        position: 'absolute',
        bottom: 0,
        height: `calc(100% - ${HEADER_HEIGHT}px)`,
        left: 0,
        right: 0,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}>
        <Content />
      </div>
    </div>
  </div>
    
  )
}

function selectWindowContent(state: ApplicationState): React.ComponentType {
  const status = state.game.status;
  
  switch(true) {
    case status === GameStatus.MAIN:
      return Main;
    case status === GameStatus.LOADING:
      return Loading;
    case status === GameStatus.STARTED:
      return selectGameScreen(state);
    default:
      throw new Error();
  }
}

function selectGameScreen(state: ApplicationState): React.ComponentType {
  const screen = state.game.currentScreen;

  switch(true) {
    case screen === ScreenID.VILLAGER_SLEEPING:
      return VillagerSleeping
    default:
      throw new Error();
  }
}

function selectWindowHeader(state: ApplicationState): React.ComponentType {
  const ownId = state.game.ownPlayerId;
  const self = state.player.find(p => p.id === ownId);
  
  if (self === undefined) {
    return DefaultHeader //TODO:
    // throw new Error('own player id is invalid');
  }

  switch(true) {
    case !self.alive:
      return DeadStatusHeader;
    case state.game.status === GameStatus.STARTED:
      return ShowRoleHeader;
    default:
      return DefaultHeader;
  }
}

function mapStateToProps(state: ApplicationState) {
  return {
    Header: selectWindowHeader(state),
    Content: selectWindowContent(state),
  }
}

export default connect(
  mapStateToProps
)(MainWindow)