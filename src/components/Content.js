import React from 'react'
import {connect} from 'react-redux'

const Content = (props) => {
    return (
      <div>
        <button onClick={props.lobbyReturn}>Return to Lobby</button>
        {props.currentUser.id === props.openCampaign.creator_id ? <div>DM</div>:<div>PLAYER</div>}
      </div>
    )
}

function mapStatetoProps(state) {
  return{
    currentUser: state.currentUser,
    openCampaign: state.openCampaign
  }
}

function mapDispatchtoProps(dispatch) {
  return{
    lobbyReturn: () => {
      dispatch({type: "LOBBY_RETURN"})
    }
  }
}



export default connect(mapStatetoProps, mapDispatchtoProps)(Content)
