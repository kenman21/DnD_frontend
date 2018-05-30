import React from 'react'
import CharacterSheet from './CharacterSheet'
import {connect} from 'react-redux'
import {setChar, setCampaignChars} from '../actions/actions.js'
import {getCampaignCharacters} from '../actions/fetch_actions.js'

class DMContainer extends React.Component {

  componentDidMount = () => {
    if (this.props.openCampaignCharacters.length === 0 && localStorage.openCampaignCharacters) {
      this.props.setCampaignChars(JSON.parse(localStorage.openCampaignCharacters))
    }
  }

  handleClick = (e) => {
    let character = this.props.openCampaignCharacters.find(character =>character.id === parseInt(e.target.id))
    this.props.setChar(character)
  }

  render() {
    let characters = this.props.openCampaignCharacters.map(character => <button className="ui button character-tab" onClick={this.handleClick} id={character.id} key={character.id}>{character.name}</button>)
    return (
      <div>
        <div id="char-buttons">
          {characters}
        </div>
        {this.props.openCampaignCharacters.length !== 0 ? <CharacterSheet/>:<h4 className="no-players">No one has joined your campaign!</h4>}
      </div>
    )
  }
}

function mapStatetoProps(state) {
  return {
    openCampaignCharacters: state.openCampaignCharacters,
    currentUserCharacters: state.currentUserCharacters,
    charSheet: state.charSheet
  }
}

export default connect(mapStatetoProps, {getCampaignCharacters, setChar, setCampaignChars})(DMContainer)
