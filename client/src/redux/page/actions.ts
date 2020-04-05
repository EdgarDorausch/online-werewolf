import {
  PageActions,
} from './types';
import { actionCreatorFactoryFactory } from '@redux/helper';

const actionCreatorFactory = actionCreatorFactoryFactory<PageActions>();

export const setPage = actionCreatorFactory('@@PAGE/SET_PAGE');

export const startHomePage = actionCreatorFactory('@@PAGE/START_HOME_PAGE');
