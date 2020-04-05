import {
  GameActions
} from './types';
import { actionCreatorFactoryFactory } from '@redux/helper';

const factory = actionCreatorFactoryFactory<GameActions>();

export const setPlayerId = factory('@@GAME/SET_PLAYER_ID');

export const setScreen = factory('@@GAME/SET_SCREEN');

