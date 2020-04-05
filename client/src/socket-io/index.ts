import { Store } from 'redux';
import { ApplicationState } from '@redux/index';
import io from 'socket.io-client';
import { startHomePage } from '@redux/page/actions';

export function setupSocketIoListeners(url: string ,store: Store<ApplicationState>) {

  const socket = io(url);

  socket.on('MemberId', (memberId: string) => {
    store.dispatch(startHomePage({memberId}));
  })


}