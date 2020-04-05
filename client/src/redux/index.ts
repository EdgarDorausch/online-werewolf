import { combineReducers, Reducer } from 'redux';

// Import your state types and reducers here.
import player from './player/reducer';
import game from './game/reducer';
import page from './page/reducer';

import { PlayerState } from './player/types';
import { GameState } from './game/types';
import { PageState } from './page/types';

// The top-level state object
export interface ApplicationState {
  player: PlayerState
  game: GameState
  page: PageState
}

// Whenever an action is dispatched, Redux will update each top-level application state property
// using the reducer with the matching name. It's important that the names match exactly, and that
// the reducer acts on the corresponding ApplicationState property type.
export const reducers: Reducer<ApplicationState> = combineReducers<ApplicationState>({
  player,
  game,
  page,
});