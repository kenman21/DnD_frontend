import React from 'react'
import {connect} from 'react-redux'
import StatForm from './StatForm'
import SavingThrow from './SavingThrow'

class CharacterSheet extends React.Component {
  render() {
    console.log(this.props.currentUserCharacters);
    return (
      <div id="character-sheet">
        <div>
          <h1> Character Name: {this.props.currentUserCharacters.name} </h1>
        </div>
        <div id="stats">
          <StatForm name="strength"/>
          <StatForm name="dexterity"/>
          <StatForm name="constitution"/>
          <StatForm name="intelligence"/>
          <StatForm name="wisdom"/>
          <StatForm name="charisma"/>
        </div>
        <SavingThrow/>
        <div id="skills">
        </div>
      </div>
    )
  }
}

function mapStatetoProps(state) {
  return {
    currentUserCharacters: state.currentUserCharacters
  }
}

// <h4> Strength </h4>
// <input id="strength" type="number" autocomplete="off" min="1" max="30" step="1"/>
// <input id="strengthmod" className="modifier" type="number" autocomplete="off" min="1" max="30" step="1"/>
// <h4> Dexterity </h4>
// <input id="dexterity" type="number" autocomplete="off" min="1" max="30" step="1"/>
// <input id="dexteritymod" className="modifier" type="number" autocomplete="off" min="1" max="30" step="1"/>
// <h4> Constitution </h4>
// <input id="constitution" type="number" autocomplete="off" min="1" max="30" step="1"/>
// <input id="constitutionmod" className="modifier" type="number" autocomplete="off" min="1" max="30" step="1"/>
// <h4> Intelligence </h4>
// <input id="intelligence" type="number" autocomplete="off" min="1" max="30" step="1"/>
// <input id="intelligencemod" className="modifier" type="number" autocomplete="off" min="1" max="30" step="1"/>
// <h4> Wisdom </h4>
// <input id="wisdom" type="number" autocomplete="off" min="1" max="30" step="1"/>
// <input id="wisdommod" className="modifier" type="number" autocomplete="off" min="1" max="30" step="1"/>
// <h4> Charisma </h4>
// <input id="charisma" type="number" autocomplete="off" min="1" max="30" step="1"/>
// <input id="charismamod" className="modifier" type="number" autocomplete="off" min="1" max="30" step="1"/>

export default connect(mapStatetoProps)(CharacterSheet)
