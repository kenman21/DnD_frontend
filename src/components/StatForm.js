import React from 'react'

const StatForm = (props) => {
  return(
    <div className="ui card singlestat" id={props.name}>
      <div className="content">
        <h4> {props.name.charAt(0).toUpperCase()+props.name.slice(1)} </h4>
        <input id={props.name + 'base'} type="number" autoComplete="off" min="1" max="30" step="1"/><br></br>
        <input id={props.name + 'mod'} className="modifier" type="number" autoComplete="off" min="1" max="30" step="1"/>
      </div>
    </div>
  )
}

export default StatForm
