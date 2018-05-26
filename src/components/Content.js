import React from 'react'
import {connect} from 'react-redux'
import LinkButton from './LinkButton'
import PlayerContainer from './PlayerContainer'
import DMContainer from './DMContainer'
import {clearChar} from '../actions/actions.js'


class Content extends React.Component {

  handleClick = () => {
    this.props.clearChar()
  }

  render() {
    return (
      <div>
      <LinkButton id="return-lobby" onClick={this.handleClick} className="ui button" to="/lobby">Return to Lobby</LinkButton>
        <div id="content">
          {this.props.currentUser.id === this.props.openCampaign.creator_id ? <DMContainer/>:<PlayerContainer/>}
        </div>
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



export default connect(mapStatetoProps, {clearChar})(Content)
