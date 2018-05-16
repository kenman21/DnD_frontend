import React from 'react'
import {connect} from 'react-redux'
import LinkButton from './LinkButton'

class Content extends React.Component {

  render() {
    return (
      <div>
        <LinkButton to="/lobby">Return to Lobby</LinkButton>
        {this.props.currentUser.id === this.props.openCampaign.creator_id ? <div>DM</div>:<div>PLAYER</div>}
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
