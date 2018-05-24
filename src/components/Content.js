import React from 'react'
import {connect} from 'react-redux'
import LinkButton from './LinkButton'
import PlayerContainer from './PlayerContainer'
import DMContainer from './DMContainer'

class Content extends React.Component {

  render() {
    return (
      <div id="content">
        <LinkButton to="/lobby">Return to Lobby</LinkButton>
        {this.props.currentUser.id === this.props.openCampaign.creator_id ? <DMContainer/>:<PlayerContainer/>}
      </div>
    )
  }
}

function mapStatetoProps(state) {
  return{
    currentUser: state.currentUser,
    openCampaign: state.openCampaign,
    currentUserCharacters: state.currentUserCharacters,
    charSheet: state.charSheet,
  }
}



export default connect(mapStatetoProps)(Content)
