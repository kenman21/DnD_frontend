import React from 'react'
import {connect} from 'react-redux'

class Message extends React.Component {

  render () {
    return (
      <div>
      {this.props.character_name === "DM" ?
      <p style={{color:"DeepSkyBlue"}}> {this.props.character_name}: {this.props.content} </p>:
      <p> {this.props.character_name}: {this.props.content} </p>}
      </div>
    )
  }

}

export default Message
