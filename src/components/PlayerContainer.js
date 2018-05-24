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

  render() {
    return (
      <div>
        {!this.props.currentUserCharacters ?
        <div><h3>Give Your Character a Name </h3>
        <form onSubmit={() => this.props.createCharacter(this.state.character_name, this.props.currentUser, this.props.openCampaign)}>
          <input type="text" onChange={this.handleChange} placeholder="Character Name"/>
          <input type="submit"/>
        </form></div>
        : <CharacterSheet/> }
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
