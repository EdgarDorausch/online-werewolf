import { Action } from 'redux';


interface WithMemberId {
  memberId: string
}

//
// ─── PAGES ──────────────────────────────────────────────────────────────────────
//


interface NoMemberIdPage {
  name: 'NoMemberIdPage',
  data: {}
}

interface HomePage {
  name: 'HomePage',
  data: WithMemberId & {}
}

interface LobbyPage {
  name: 'LobbyPage',
  data: WithMemberId & {
    lobbyId: string
  }
}

interface CreateLobbyPage {
  name: 'CreateLobbyPage',
  data: WithMemberId & {}
}

interface JoinLobbyPage {
  name: 'JoinLobbyPage',
  data: WithMemberId & {
    lobbyId: string
  }
}

interface StartedGamePage {
  name: 'StartedGamePage',
  data: WithMemberId & {
    lobbyId: string
  }
}

export type Page = 
  NoMemberIdPage |
  HomePage |
  LobbyPage |
  CreateLobbyPage |
  JoinLobbyPage |
  StartedGamePage

export type PageName = Page['name'];


export type PageState = Page;

// Action-Types:
export interface SetPageAction extends Action {
  type: '@@PAGE/SET_PAGE';
  payload: {
    page: Page,
  };
}

export interface StartHomePageAction extends Action {
  type: '@@PAGE/START_HOME_PAGE';
  payload: {
    memberId: string,
  };
}

export interface SwitchPageKeepPropertiesAction extends Action {
  type: '@@PAGE/SWITCH_PAGE_KEEP_PROPERTIES';
  payload: {
    pageName: PageName,
    properties: string[]
  };
}


export type PageActions =
  SetPageAction |
  StartHomePageAction |
  SwitchPageKeepPropertiesAction