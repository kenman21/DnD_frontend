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

export function openMap(map){
  return (dispatch) => {
    dispatch({type: 'OPEN_MAP', payload: map})
  }
}

export function keepLoggedIn(user){
  return (dispatch) => {
    return (
    dispatch({type: 'LOGIN_PLAYER', payload: JSON.parse(user)})
  )
  }
}
