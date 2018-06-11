import React from 'react'
import {connect} from 'react-redux'
import LinkButton from './LinkButton'
import PlayerContainer from './PlayerContainer'
import DMContainer from './DMContainer'
import {clearChar, setSession} from '../actions/actions.js'
import {createSession, checkForSession} from '../actions/fetch_actions.js'
import { ActionCable } from 'react-actioncable-provider'

class Content extends React.Component {

  handleClick = (e) => {
    switch(e.target.id){
      case "return-lobby":
        this.props.clearChar()
        this.props.history.push('/lobby')
        break
      case "create":
        this.props.createSession(this.props.openCampaign.id)
        break
      case "join":
        this.props.checkForSession(this.props.openCampaign.id)
        break
      default:
        console.log("error");
    }
  }



  render() {
    return (
      <div>
        <button id="return-lobby" onClick={this.handleClick} className="ui button">Return to Lobby</button>
        {this.props.currentUser.id === this.props.openCampaign.creator_id ?
        <LinkButton id="create" onClick={this.handleClick} className="ui button" to={"/campaign/" + this.props.openCampaign.id + "/session/"}>Create Live Session</LinkButton>:null}
        {this.props.openSession && this.props.currentUser.id !== this.props.openCampaign.creator_id ? <LinkButton id="join" onClick={this.handleClick} className="ui button" to={"/campaign/" + this.props.openCampaign.id + "/session/"}>Join Live Session</LinkButton>:null}
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
    openSession: state.openSession
  }
}



export default connect(mapStatetoProps, {setSession, clearChar, createSession, checkForSession})(Content)
