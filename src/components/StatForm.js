import React from 'react'

const StatForm = (props) => {
  return(
    <div className="ui card singlestat" id={props.name}>
      <div className="content skillcontent">
        <h3> {props.name.charAt(0).toUpperCase()+props.name.slice(1)} </h3>
        <input id={props.name + 'base'} type="number" autoComplete="off" min="1" max="30" step="1"/><br></br>
        <div className="modifier">
          <input id={props.name + 'mod'} className="modifier value" data-tooltip="Modifier" data-position="bottom right" type="number" autoComplete="off" min="1" max="30" step="1"/>
        </div>
      </div>
    </div>
  )
}

export default StatForm
