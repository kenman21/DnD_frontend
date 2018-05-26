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
    this.props.createCharacter(this.state.character_name, this.props.currentUser, this.props.openCampaign)
    this.props.getUserCharacters(this.props.currentUser, this.props.openCampaign)
  }

  render() {
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
