import React from 'react'
import {connect} from 'react-redux'
import LinkButton from './LinkButton'
import PlayerContainer from './PlayerContainer'

class Content extends React.Component {

  render() {
    return (
      <div>
        <LinkButton to="/lobby">Return to Lobby</LinkButton>
        {this.props.currentUser.id === this.props.openCampaign.creator_id ? <div>DM</div>:<PlayerContainer/>}
      </div>
    )
  }
}

function mapStatetoProps(state) {
  return{
    currentUser: state.currentUser,
    openCampaign: state.openCampaign
  }
}



export default connect(mapStatetoProps, null)(Content)
