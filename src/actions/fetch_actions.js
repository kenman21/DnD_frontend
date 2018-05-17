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

  export function addCampaign(name, creator_id){
    return (dispatch) => {
      fetch(URL + 'campaigns', {
        method: 'POST',
        headers: headers,
        body: JSON.stringify({
          name: name,
          creator_id: creator_id
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
    })
  }
}
