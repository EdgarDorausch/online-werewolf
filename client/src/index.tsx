import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { Provider } from 'react-redux';
import configureStore from './redux/configureStore';
import { addPlayer } from '@redux/player/actions';

const reduxStore = configureStore();

reduxStore.dispatch(addPlayer('peter', 0));
reduxStore.dispatch(addPlayer('edgardo', 2));
reduxStore.dispatch(addPlayer('hanna', 5));
reduxStore.dispatch(addPlayer('mira', 7));

ReactDOM.render(
  // <React.StrictMode>
    <Provider store={reduxStore}>
      <App />
    </Provider>,
  // </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
