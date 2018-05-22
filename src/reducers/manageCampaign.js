let defaultState = {
  currentUser: {},
  currentUserMaps: [],
  currentUserCharacters: [],
  openMap: null,
  campaigns: [],
  openCampaign: {},
  openCharacter: {},
  editing: false,
  actObj: {},
}

export default function manageCampaign(state = defaultState, action) {
  // console.log(action);
  switch (action.type) {
    case 'LOGIN_PLAYER':
      return {...state, currentUser: action.payload}
    case 'SET_CAMPAIGNS':
      return {...state, campaigns: action.payload}
    case 'CREATE_CAMPAIGN':
      return {...state, campaigns: [...state.campaigns, action.payload]}
    case 'DELETE_CAMPAIGN':
      let new_campaigns = state.campaigns.filter(campaign => campaign.id !== action.payload)
      return {...state, campaigns: new_campaigns}
    case 'OPEN_CAMPAIGN':
      return {...state, openCampaign: action.payload}
    case 'OPEN_MAP':
      return {...state, openMap: action.payload}
    case 'ADD_ACTION':
      return {...state, actObj: {...state.actObj, ...action.payload}}
    case 'CLEAR_ACTIONS':
      return {...state, actObj: {}}
    case 'SET_USER_MAPS':
      return {...state, currentUserMaps: [...action.payload]}
    case 'SET_USER_CHARACTERS':
      return {...state, currentUserCharacters: action.payload}
    case 'TOGGLE_EDITING':
      return {...state, editing: !state.editing}
    case 'OPEN_CHARACTER':
      return {...state, openCharacter: action.payload}
    default:
      return state;
  }
};
