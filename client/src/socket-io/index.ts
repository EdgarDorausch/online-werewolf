import { Store } from 'redux';
import { ApplicationState } from '@redux/index';
import { startMainScreen } from '@redux/game/actions';
import io from 'socket.io-client';

export function setupSocketIoListeners(url: string ,store: Store<ApplicationState>) {

  const socket = io(url);

  socket.on('MemberId', (memberId: string) => {
    store.dispatch(startMainScreen(memberId));
  })


}