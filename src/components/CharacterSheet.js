import React from 'react'
import {connect} from 'react-redux'
import StatForm from './StatForm'
import SavingThrowContainer from './SavingThrowContainer'
import SkillContainer from './SkillContainer'
import OtherStat from './OtherStat'

class CharacterSheet extends React.Component {
  render() {
    console.log(this.props.currentUserCharacters);
    return (
      <div id="character-sheet">
        <div>
          <h1> Character Name: {this.props.currentUserCharacters.name} </h1>
        </div>
        <div className="column-one" id="column-one">
          <div id="first-top">
            <div id="first-top-left">
              <StatForm name="strength"/>
              <StatForm name="dexterity"/>
              <StatForm name="constitution"/>
              <StatForm name="intelligence"/>
              <StatForm name="wisdom"/>
              <StatForm name="charisma"/>
            </div>
            <div id="first-top-right">
              <OtherStat name="inspiration" title="Inspiration"/>
              <OtherStat name="proficiency" title="Proficiency"/>
              <SavingThrowContainer/>
              <SkillContainer/>
            </div>
          </div>
          <div id="first-bottom">
            <div id="first-bottom-center">
              <OtherStat name="passive-wisdom" title="Passive Wisdom (Perception)"/>
              <div className="ui card other-proficiencies" id="other-proficiencies"><div className="content"><div className="header">Other Proficiences and Languages</div><textarea className="notes"/></div></div>
            </div>
          </div>
        </div>
        <div className="column-two" id="column-two">
          <OtherStat name="armorclass" title="Armor Class"/>
          <OtherStat name="initiative" title="Initiative"/>
          <OtherStat name="speed" title="Speed"/>
          <StatForm name="hit-points" firstlabel="Max"/>
          <OtherStat name="temp-hit-points" title="Temporary Hit-Points"/>
          <OtherStat name="hit-dice" title="Hit Dice"/>
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
