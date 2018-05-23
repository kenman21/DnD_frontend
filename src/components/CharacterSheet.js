import React from 'react'
import {connect} from 'react-redux'
import StatForm from './StatForm'
import SavingThrowContainer from './SavingThrowContainer'
import SkillContainer from './SkillContainer'
import HeaderContainer from './HeaderContainer'
import OtherStat from './OtherStat'
import TextField from './TextField'
import DeathSaves from './DeathSaves'

class CharacterSheet extends React.Component {
  render() {
    return (
      <div id="character-sheet">
        <HeaderContainer/>
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
              <TextField name="other-proficiencies" title="Other Proficiences and Languages" />
            </div>
          </div>
        </div>
        <div className="column-two" id="column-two">
          <OtherStat name="armorclass" title="Armor Class"/>
          <OtherStat name="initiative" title="Initiative"/>
          <OtherStat name="speed" title="Speed"/>
          <StatForm name="hit-points" firstlabel="Max" secondlabel="Current"/>
          <OtherStat name="temp-hit-points" title="Temporary Hit-Points"/>
          <OtherStat name="hit-dice" title="Hit Dice"/>
          <DeathSaves/>
          <TextField name="attacks-spellcasting" title="Attacks and Spellcasting" extra="text"/>
          <TextField name="equipment" title="Equipment"/>
        </div>
        <div className="column-three" id="column-three">
          <TextField name="personality-traits" title="Personality and Traits"/>
          <TextField name="ideals" title="Ideals"/>
          <TextField name="bonds" title="Bonds"/>
          <TextField name="features-traits" title="Features and Traits"/>
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
