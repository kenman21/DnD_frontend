import React from 'react'
import {connect} from 'react-redux'

class Message extends React.Component {

  render () {
    return (
      <p> {this.props.name}: {this.props.content} </p>
    )
  }

}

export default Message
