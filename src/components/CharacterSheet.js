import React from 'react'
import {connect} from 'react-redux'
import StatForm from './StatForm'
import SavingThrowContainer from './SavingThrowContainer'
import SkillContainer from './SkillContainer'

class CharacterSheet extends React.Component {
  render() {
    console.log(this.props.currentUserCharacters);
    return (
      <div id="character-sheet">
        <div>
          <h1> Character Name: {this.props.currentUserCharacters.name} </h1>
        </div>
        <div className="column-one" id="column-one">
          <div id="stats">
            <StatForm name="strength"/>
            <StatForm name="dexterity"/>
            <StatForm name="constitution"/>
            <StatForm name="intelligence"/>
            <StatForm name="wisdom"/>
            <StatForm name="charisma"/>
          </div>
          <div>
          <div className="ui card inspiration" id="inspiration"><div className="content"><div className="header">Inspiration</div><input id="inspiration-value" type="number" autoComplete="off" min="1" max="30" step="1"/></div></div>
          <div className="ui card inspiration" id="proficiency"><div className="content"><div className="header">Proficiency</div><input id="proficiency-value" type="number" autoComplete="off" min="1" max="30" step="1"/></div></div>
          <SavingThrowContainer/>
          <SkillContainer/>
          <div className="ui card passive-wisdom" id="passive-wisdom"><div className="content"><div className="header">Passive Wisdom (Perception)</div><input id="passive-wisdom-value" type="number" autoComplete="off" min="1" max="30" step="1"/></div></div>
          <div className="ui card other-proficiencies" id="other-proficiencies"><div className="content"><div className="header">Other Proficiences and Languages</div><textarea className="notes"/></div></div>
          </div>
        <div className="column-two" id="column-two">
        </div>
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

export default connect(mapStatetoProps)(CharacterSheet)
