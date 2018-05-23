import React from 'react'
import Skill from './Skill'

const SkillContainer = (props) => {
  return(
    <div className="ui card skills">
      <div className="content">
        <div className="header"> Skills </div>
      </div>
      <div className="content skill">
        <Skill name="acrobatics" title="Acrobatics" stat="Dex"/>
        <Skill name="animalhandling" title="Animal Handling" stat="Wis"/>
        <Skill name="arcana" title="Arcana" stat="Int"/>
        <Skill name="athletics" title="Athletics"stat="Str"/>
        <Skill name="heception" title="Deception"stat="Cha"/>
        <Skill name="history" title="History" stat="Int"/>
        <Skill name="insight" title="Insight" stat="Wis"/>
        <Skill name="intimidation" title="Intimidation" stat="Cha"/>
        <Skill name="investigation" title="Investigation" stat="Int"/>
        <Skill name="medicine" title="Medicine" stat="Wis"/>
        <Skill name="nature"  title="Nature" stat="Int"/>
        <Skill name="perception" title="Perception"stat="Wis"/>
        <Skill name="performance" title="Performance"stat="Cha"/>
        <Skill name="persuasion" title="Persuasion"stat="Cha"/>
        <Skill name="religion" title="Religion" stat="Int"/>
        <Skill name="sleightofhand" title="Sleight of Hand" stat="Dex"/>
        <Skill name="stealth" title="Stealth" stat="Dex"/>
        <Skill name="survival" title="Survival" stat="Wis"/>
      </div>
    </div>
  )
}

export default SkillContainer
