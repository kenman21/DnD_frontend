const URL = "http://localhost:3000/api/v1/"
const headers = { "Content-Type": "application/json"}

export function login(username, password){
  return (dispatch) => {
    return fetch(URL + 'users/login ', {
      method: 'POST',
      headers: headers,
      body: JSON.stringify({
        username: username,
        password: password
      })
    }).then(res => res.json()).then((json) => {

      if (!json.errors) {
        dispatch({type:"LOGIN_PLAYER", payload: json})
        localStorage.currentUser = JSON.stringify(json)
      }
    })
  }
}

export function register(username, password){
  return (dispatch) => {
      return fetch(URL + 'users', {
        method: 'POST',
        headers: headers,
        body: JSON.stringify({
          username: username,
          password: password
        })
      }).then(res => res.json()).then((json) => {

        if (!json.errors) {
          dispatch({type:"LOGIN_PLAYER", payload: json})
          localStorage.currentUser = JSON.stringify(json)
        }
      })
    }
  }

  export function addCampaign(name, creator_id, password){
    return (dispatch) => {
      fetch(URL + 'campaigns', {
        method: 'POST',
        headers: headers,
        body: JSON.stringify({
          name: name,
          creator_id: creator_id,
          password: password
        })
      }).then(res => res.json()).then((json) => {
        dispatch({type: 'CREATE_CAMPAIGN', payload: json})
      })
    }
  }

  export function deleteCampaign(id){
    return (dispatch) => {
      fetch(URL + `campaigns/${id}`, {
      method: 'DELETE',
      headers: headers,
      body: JSON.stringify({
        campaign_id: id,
      })
    }).then(dispatch({type: 'DELETE_CAMPAIGN', payload: id}))
  }
}

export function getCampaigns(){
  return (dispatch) => {
    fetch(URL + 'campaigns')
    .then(res => res.json())
    .then(res => {
      dispatch({type:'SET_CAMPAIGNS', payload: res})
    })
  }
}

export function addMap(name, user_id){
  return (dispatch) => {
    fetch(URL + 'maps', {
      method: 'POST',
      headers: headers,
      body: JSON.stringify({
        name: name,
        user_id: user_id
      })
    }).then(res => res.json()).then(res => {
    dispatch({type: 'OPEN_MAP', payload: res[0]});
    dispatch({type:'SET_USER_MAPS', payload: res});
  })
  }
}

export function saveMap(map, actions) {
  return (dispatch) => {
    fetch(URL + `maps/${map.id}`, {
      method: 'PATCH',
      headers: headers,
      body: JSON.stringify({
        map_id: map.id,
        actions: actions
      })
    })
  }
}

export function getMaps(user_id) {
  return (dispatch) => {
    fetch(URL + `users/${user_id}/maps`)
    .then(res => res.json())
    .then(res => {
      dispatch({type:'SET_USER_MAPS', payload: res})
      debugger
    })
  }
}

export function deleteMap(map, currentUser) {
    return (dispatch) => {
      fetch(URL + `maps/${map.id}`, {
      method: 'DELETE',
      headers: headers,
      body: JSON.stringify({
        map_id: map.id,
        user_id: currentUser.id
      })
    })
    .then(res => res.json())
    .then(res => {
      dispatch({type:'SET_USER_MAPS', payload: res})
    })
  }
}

export function createCharacter(name, user, campaign) {
  return(dispatch) => {
    fetch(URL + 'characters', {
      method: 'POST',
      headers: headers,
      body: JSON.stringify({
        name: name,
        user_id: user.id,
        campaign_id: campaign.id
      })
    })
    .then(res => res.json())
    .then(res => {
      debugger
      dispatch({type:'OPEN_CHARACTER', payload: res})
      localStorage.openCharacter = res
      dispatch({type:'SET_USER_CHARACTERS', payload: res})
      if (res) {
        dispatch({type:'SET_ALL_STATS', payload: res})
      }
    })
  }
}

export function getUserCharacters(user, campaign) {
  return (dispatch) => {
    fetch(URL + `users/${user.id}/characters`, {
      method: 'POST',
      headers: headers,
      body: JSON.stringify({
        user_id: user.id,
        campaign_id: campaign.id
      })
    })
    .then(res => res.json())
    .then(res => {
      dispatch({type:'SET_USER_CHARACTERS', payload: res})
      if (res) {
        dispatch({type:'SET_ALL_STATS', payload: res})
      }
    })
  }
}

export function saveCharacter(character_id, charsheet) {
  return(dispatch) => {
    fetch(URL + `characters/${character_id}`, {
      method: 'PATCH',
      headers: headers,
      body: JSON.stringify({
        character_id: character_id,
        charsheet: charsheet
      })
    })
  }
}

export function getCampaignCharacters(campaign_id){
  return (dispatch) => {
    fetch(URL + `campaigns/${campaign_id}/characters`)
    .then(res => res.json())
    .then(res => {
      dispatch({type:'SET_CAMPAIGN_CHARACTERS', payload: res})
      localStorage.openCampaignCharacters = JSON.stringify(res)
    })
  }
}

export function checkCampaignPassword(password, campaign_id, ){
  return (dispatch) => {
    return fetch(URL + `campaigns/${campaign_id}/password`, {
      method: 'POST',
      headers: headers,
      body: JSON.stringify({
        password: password,
        campaign_id: campaign_id
      })
    })
    .then(res => res.json())
  }
}

export function createSession(campaign_id){
  return (dispatch) => {
    fetch(URL + 'sessions', {
      method: 'POST',
      headers: headers,
      body: JSON.stringify({
        campaign_id: campaign_id
      })
    }).then(res => res.json())
    .then(res => {
      dispatch({type: 'SET_SESSION', payload: res})
      localStorage.openSession = JSON.stringify(res)
    })
  }
}

export function setSessionMap(map_id, session_id) {
  return (dispatch) => {
    fetch(URL + `sessions/${session_id}`, {
      method: 'PATCH',
      headers: headers,
      body: JSON.stringify({
        type: "setting",
        open_map_id: map_id,
        session_id: session_id
      })
    }).then(res => res.json())
    .then(res => {
      dispatch({type: 'OPEN_MAP', payload: res})
    })
  }
}

export function highlightSessionMap(openSession_id, canvasx, canvasy, canvas_x_end, canvas_y_end) {
  return (dispatch) => {
    fetch(URL + `sessions/${openSession_id}`, {
      method: 'PATCH',
      headers: headers,
      body: JSON.stringify({
        type: "highlighting",
        session_id: openSession_id,
        start_x: canvasx,
        start_y: canvasy,
        end_x: canvas_x_end,
        end_y: canvas_y_end
      })
    }).then(res => res.json())
    .then(res => {
      dispatch({type: 'SET_SESSION', payload: res})
      localStorage.openSession = JSON.stringify(res)
    })
  }
}

export function deleteSession(openSession_id){
    return (dispatch) => {
      fetch(URL + `sessions/${openSession_id}`, {
      method: 'DELETE',
      headers: headers,
      body: JSON.stringify({
        id: openSession_id,
      })
    }).then(dispatch({type: 'SET_SESSION', payload: {}}))
  }
}

export function checkForSession(campaign_id){
  return (dispatch) => {
    fetch(URL + `campaigns/${campaign_id}/session`, {
      method: 'POST',
      headers: headers,
      body: JSON.stringify({
        campaign_id: campaign_id
      })
    }).then(res => res.json())
    .then(res => {
      if (!res.error) {
        dispatch({type: 'SET_SESSION', payload: res.activeSession[0]})
        dispatch({type: 'OPEN_MAP', payload: res.map})
      }
    })
  }
}
