import React from 'react'
import {connect} from 'react-redux'
import {addMessage} from '../actions/fetch_actions.js'

class MessageInput extends React.Component {

  state={
    message: ""
  }

  handleChange = (e) => {
    this.setState({
      message: e.target.value
    })
  }

  handleSubmit = (e) => {
    e.preventDefault()
    this.props.addMessage(this.props.openChatroom.id, this.props.currentUser.id, this.state.message, this.props.openCampaign.id)
    this.setState({
      message: ""
    })
  }

  render () {
    console.log(this.props.openChatroom);
    return (
      <form onSubmit={this.handleSubmit}>
        <div id="messageinput" className="ui input focus">
          <input type="text" onChange={this.handleChange} value={this.state.message}/>
        </div>
      </form>
    )
  }

}

function mapStatetoProps(state) {
  return {
    openCampaign: state.openCampaign,
    currentUser: state.currentUser,
    openChatroom: state.openChatroom
  }
}

export default connect(mapStatetoProps, {addMessage})(MessageInput)
