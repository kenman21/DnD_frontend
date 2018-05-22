import React from 'react'

const Skill = (props) => {
  return(
      <div className="skill-checkbox"><input id={props.name + " checked"}type="checkbox"/><input id={props.name + " value"} type="number" autoComplete="off" min="1" max="30" step="1"/><label> {props.name} {"("+props.stat+")"}</label></div>
  )
}

export default Skill
