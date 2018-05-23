import React from 'react'

class Skill extends React.Component {

  onChange = (e) => {
    localStorage[e.target.id] = e.target.value
  }

  render() {
  return(
      <div className="skill-checkbox">
        <input id={this.props.name + "checked"} onChange={this.onChange} type="checkbox"/>
        <input id={this.props.name + "value"} type="number" autoComplete="off" min="1" max="30" step="1"/>
        <label> {this.props.name} {"("+this.props.stat+")"}</label>
      </div>
    )
  }
}

export default Skill
