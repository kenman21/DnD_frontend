import React from 'react'
import CharacterSheet from './CharacterSheet'
import {connect} from 'react-redux'
import {createCharacter, getUserCharacters} from '../actions/fetch_actions.js'

class PlayerContainer extends React.Component {

  state = {
    character_name: ""
  }

  componentDidMount = () => {
    this.props.getUserCharacters(this.props.currentUser, this.props.openCampaign)
  }

  handleChange = (e) => {
    this.setState({
      character_name: e.target.value
    })
  }

  handleSubmit = () => {
    let promise = new Promise((resolve, reject) => {
      this.props.createCharacter(this.state.character_name, this.props.currentUser, this.props.openCampaign)
      resolve()
    })
    promise.then(() => {this.props.getUserCharacters(this.props.currentUser, this.props.openCampaign)})

  }

  render() {
    // console.log(this.props.currentUserCharacters)
    return (
      <div>
        {!this.props.currentUserCharacters ?
        <div>
        <h3>Congratulations on Starting a New Campaign!</h3>
        <h3>Give Your Character a Name to Begin!</h3>
        <form onSubmit={this.handleSubmit}>
          <div className="ui input focus">
            <input type="text" onChange={this.handleChange} placeholder="Character Name"/>
          </div>
          <input className="ui button" type="submit"/>
        </form></div>
        : <div><CharacterSheet/></div>}
      </div>
    )
  }
}

function mapStatetoProps(state) {
  return {
    currentUser: state.currentUser,
    openCampaign: state.openCampaign,
    currentUserCharacters: state.currentUserCharacters,
    charSheet: state.charSheet
  }
}

export default connect(mapStatetoProps, {createCharacter, getUserCharacters})(PlayerContainer)
