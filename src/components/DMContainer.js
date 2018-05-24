import React from 'react'
import CharacterSheet from './CharacterSheet'
import {connect} from 'react-redux'
import {setChar, setCampaignChars} from '../actions/actions.js'
import {getCampaignCharacters} from '../actions/fetch_actions.js'

class DMContainer extends React.Component {

  componentDidMount = () => {
    if (this.props.openCampaignCharacters.length === 0) {
      this.props.setCampaignChars(JSON.parse(localStorage.openCampaignCharacters))
    }
  }

  handleClick = (e) => {
    let character = this.props.openCampaignCharacters.find(character =>character.id === parseInt(e.target.id))
    this.props.setChar(character)
  }

  render() {
    let characters = this.props.openCampaignCharacters.map(character => <button onClick={this.handleClick} id={character.id} key={character.id}>{character.name}</button>)
    return (
      <div>
        {characters}
        {this.props.currentUserCharacters.length !== 0 ? <CharacterSheet/>:null}
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
