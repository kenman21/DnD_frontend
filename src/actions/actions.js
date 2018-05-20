export function openCampaign(campaign){
  return (dispatch) => {
    dispatch({type: 'OPEN_CAMPAIGN', payload: campaign})
  }
}

export function clearUser(value){
  return (dispatch) => {
    dispatch({type: 'LOGIN_PLAYER', payload: value})
  }
}

export function addAction(actions) {
  return (dispatch) => {
    dispatch({type: 'ADD_ACTION', payload: actions})
  }
}
