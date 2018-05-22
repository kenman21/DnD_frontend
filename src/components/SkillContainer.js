import React from 'react'
import Skill from './Skill'

const SkillContainer = (props) => {
  return(
    <div className="ui card skills">
      <div className="content">
        <div className="header"> Skills </div>
      </div>
      <div className="content skill">
        <Skill name="Acrobatics" stat="Dex"/>
        <Skill name="Animal Handling" stat="Wis"/>
        <Skill name="Arcana" stat="Int"/>
        <Skill name="Athletics" stat="Str"/>
        <Skill name="Deception" stat="Cha"/>
        <Skill name="History" stat="Int"/>
        <Skill name="Insight" stat="Wis"/>
        <Skill name="Intimidation" stat="Cha"/>
        <Skill name="Investigation" stat="Int"/>
        <Skill name="Medicine" stat="Wis"/>
        <Skill name="Nature"  stat="Int"/>
        <Skill name="Perception" stat="Wis"/>
        <Skill name="Performance" stat="Cha"/>
        <Skill name="Persuasion" stat="Cha"/>
        <Skill name="Religion" stat="Int"/>
        <Skill name="Sleight of Hand" stat="Dex"/>
        <Skill name="Stealth" stat="Dex"/>
        <Skill name="Survival" stat="Wis"/>
      </div>
    </div>
  )
}

export default SkillContainer
