export function openingCampaign(campaign){
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

export function setCampaignChars(characters){
  return (dispatch) => {
    dispatch({type:'SET_CAMPAIGN_CHARACTERS', payload: characters})
  }
}

export function setChar(character) {
  return (dispatch) => {
    dispatch({type:'SET_USER_CHARACTERS', payload: character})
    dispatch({type: 'SET_ALL_STATS', payload: character})
  }
}

export function clearChar() {
  return (dispatch) => {
    dispatch({type:'SET_USER_CHARACTERS', payload: {}})
    dispatch({type: 'CLEAR_STATS', payload: {}})
  }
}

export function changeTileSheet(direction) {
  return(dispatch) => {
    dispatch({type: 'CHANGE_TILE_SHEET', payload: direction})
  }
}

export function setSession(session) {
  return(dispatch) => {
    dispatch({type: 'SET_SESSION', payload: session})
  }
}

export function clearHighlight() {
  return(dispatch) => {
    dispatch({type: 'CLEAR_HIGHLIGHT'})
  }
}
