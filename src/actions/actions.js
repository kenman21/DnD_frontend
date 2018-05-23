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

export function clearActions(){
  return (dispatch) => {
    dispatch({type: 'CLEAR_ACTIONS'})
  }
}

export function openingMap(map){
  return (dispatch) => {
    dispatch({type: 'OPEN_MAP', payload: map})
  }
}

export function keepLoggedIn(user){
  return (dispatch) => {
    dispatch({type: 'LOGIN_PLAYER', payload: user})
  }
}

export function toggleEditing(){
  return (dispatch) => {
    dispatch({type: 'TOGGLE_EDITING'})
  }
}

export function setStat(stat){
  return (dispatch) => {
    dispatch({type: 'SET_STAT', payload: stat})
  }
}
