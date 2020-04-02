import { createStore, Store } from 'redux';

// We'll be using Redux (remote) Devtools. We can use the `composeWithDevTools()`
// directive so we can pass our middleware along with it

// Import the state interface and our combined reducers.
import { ApplicationState, reducers } from './index';


export default function configureStore(): Store<ApplicationState> {

    const w: any = window;

    // We'll create our store with the combined reducers and the initial Redux state that
    // we'll be passing from our entry point.
    return createStore(
        reducers,
        w.__REDUX_DEVTOOLS_EXTENSION__ && w.__REDUX_DEVTOOLS_EXTENSION__() // add dev tool extension
    );
}