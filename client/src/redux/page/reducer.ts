import { Reducer } from 'redux';
import { PageState, PageActions } from './types';

export const initialState: PageState = {
  name: 'NoMemberIdPage'
};

const reducer: Reducer<PageState, PageActions> = (state: PageState = initialState, action: PageActions) => {
  switch (action.type) {
    case '@@PAGE/SET_PAGE':
      return action.payload.page

    case '@@PAGE/START_HOME_PAGE':
      return {
        name: 'HomePage',
        data: {
          memberId: action.payload.memberId
        }
      }

    default:
      return state;
  }
};
  
export default reducer;