export function renderContent(campaign) {
  return (dispatch) => {
    dispatch({type: 'RENDER_CONTENT', payload: campaign})
  }
}

export function renderMapCreator(){
  return (dispatch) => {
    dispatch({type: 'RENDER_MAP_CREATOR'})
  }
}
