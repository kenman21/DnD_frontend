import React from 'react'
import {connect} from 'react-redux'
import MessageInput from './MessageInput'
import MessageContainer from './MessageContainer'

class ChatContainer extends React.Component {

  render () {
    return (
      <div id="chatroom">
        <MessageContainer/>
        <MessageInput/>
      </div>
    )
  }

}

export default ChatContainer
