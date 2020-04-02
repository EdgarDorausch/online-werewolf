import React from 'react';
import PlayerPanel from './PlayerPanel';
import MainWindow from './MainWindow';

// interface BaseScreenProps {}
function BaseScreen() {
  return (<div style={{
    display: 'flex'
  }}>
    <PlayerPanel/>
    <MainWindow />
  </div>)
}

export default BaseScreen;