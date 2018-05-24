import React from 'react'
import Skill from './Skill'

const SkillContainer = (props) => {
  return(
    <div className="ui card skills">
      <div className="content">
        <div className="header"> Skills </div>
      </div>
      <div className="content skill">
        <Skill name="acrobatics" title="Acrobatics" stat="Dex" base="dexterity"/>
        <Skill name="animalhandling" title="Animal Handling" stat="Wis" base="wisdom"/>
        <Skill name="arcana" title="Arcana" stat="Int" base="intelligence"/>
        <Skill name="athletics" title="Athletics"stat="Str" base="strength"/>
        <Skill name="deception" title="Deception"stat="Cha" base="charisma"/>
        <Skill name="history" title="History" stat="Int" base="intelligence"/>
        <Skill name="insight" title="Insight" stat="Wis" base="wisdom"/>
        <Skill name="intimidation" title="Intimidation" stat="Cha" base="charisma"/>
        <Skill name="investigation" title="Investigation" stat="Int" base="intelligence"/>
        <Skill name="medicine" title="Medicine" stat="Wis" base="wisdom"/>
        <Skill name="nature"  title="Nature" stat="Int" base="intelligence"/>
        <Skill name="perception" title="Perception"stat="Wis" base="wisdom"/>
        <Skill name="performance" title="Performance"stat="Cha" base="charisma"/>
        <Skill name="persuasion" title="Persuasion"stat="Cha" base="charisma"/>
        <Skill name="religion" title="Religion" stat="Int" base="intelligence"/>
        <Skill name="sleightofhand" title="Sleight of Hand" stat="Dex" base="dexterity"/>
        <Skill name="stealth" title="Stealth" stat="Dex" base="dexterity"/>
        <Skill name="survival" title="Survival" stat="Wis" base="wisdom"/>
      </div>
    </div>
  )
}

export default SkillContainer
