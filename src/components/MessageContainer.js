import React from 'react'
import {connect} from 'react-redux'
import Message from './Message'

class MessageContainer extends React.Component {

  componentDidUpdate = () => {
    console.log("updated");
  }
  render () {
    let messages = this.props.chatMessages.map(message => <Message key={message.id} {...message}/>)
    return (
      <div id="message-container">
        {messages}
      </div>
    )
  }

}

function mapStatetoProps(state) {
  return {
    chatMessages: state.chatMessages
  }
}

export default connect(mapStatetoProps)(MessageContainer)
