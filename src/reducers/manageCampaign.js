let defaultState = {
  currentUser: {},
  campaigns: [],
  openCampaign: null,
  actObj: {}
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
    case 'ADD_ACTION':
      return {...state, actObj: {...state.actObj, ...action.payload}}
    default:
      return state;
  }
};
