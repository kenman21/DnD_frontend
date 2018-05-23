import React from 'react'
import {connect} from 'react-redux'
import {setStat} from '../actions/actions.js'

class Skill extends React.Component {

  onChange = (e) => {
    this.props.setStat({[e.target.id]: e.target.value})
    localStorage[e.target.id] = e.target.value
  }

  render() {
  return(
      <div className="skill-checkbox">
        <input id={this.props.name + "checked"} onChange={this.onChange} type="checkbox"/>
        <input id={this.props.name + "value"} type="number" autoComplete="off" min="1" max="30" step="1"/>
        <label> {this.props.title} {"("+this.props.stat+")"}</label>
      </div>
    )
  }
}

export default Skill
