let defaultState = {
  currentUser: null,
  campaigns: [],
  rendering_content: false,
  rendering_mapcreator: false,
  openCampaign: null
}

export default function manageCampaign(state = defaultState, action) {
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
    case "RENDER_CONTENT":
      return {...state, rendering_content: true, openCampaign: action.payload}
    case "LOBBY_RETURN":
      return {...state, rendering_content: false, openCampaign: null}
    case "RENDER_MAP_CREATOR":
      return {...state, rendering_content: false, rendering_mapcreator: true}
    default:
      return state;
  }
};
