import { Reducer } from 'redux';
import { PageState, PageActions } from './types';

export const initialState: PageState = {
  name: 'NoMemberIdPage',
  data: {}
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
    case '@@PAGE/SWITCH_PAGE_KEEP_PROPERTIES':
      const newData: {[k: string]: any} = {};
      for(let key of action.payload.properties) {
        if(key in state.data) {
          newData[key] = (state.data as any)[key];
        } else {
          throw new Error('Can not keep properties while switching the page')
        }
      }

      return {
        name: action.payload.pageName,
        data: newData as any
      }

    default:
      return state;
  }
};
  
export default reducer;