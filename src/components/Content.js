import React from 'react'
import {connect} from 'react-redux'
import LinkButton from './LinkButton'
import PlayerContainer from './PlayerContainer'
import {saveCharacter} from '../actions/fetch_actions.js'

class Content extends React.Component {

  saveSheet = () => {
    this.props.saveCharacter(this.props.currentUserCharacters.id, this.props.charSheet)
  }

  render() {
    return (
      <div>
        <LinkButton to="/lobby">Return to Lobby</LinkButton>
        <button onClick={this.saveSheet}>Save Character Sheet</button>
        {this.props.currentUser.id === this.props.openCampaign.creator_id ? <div>DM</div>:<PlayerContainer/>}
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



export default connect(mapStatetoProps, {saveCharacter})(Content)
