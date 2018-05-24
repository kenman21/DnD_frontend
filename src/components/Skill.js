import React from 'react'
import {connect} from 'react-redux'
import {setStat} from '../actions/actions.js'

class Skill extends React.Component {

  onChange = (e) => {
    this.props.setStat({[e.target.id]: e.target.checked})
    // localStorage[e.target.id] = e.target.checked
  }

  calcValue = () => {
    let value = this.props.charSheet[this.props.base+"mod"]
    this.props.charSheet[this.props.name+"checked"] ? value += this.props.charSheet.proficiencyvalue:null
    console.log(this.props.charSheet[this.props.name+"checked"]);
    return value
  }

  render() {
  return(
      <div className="skill-checkbox">
        <input id={this.props.name + "checked"} onChange={this.onChange} type="checkbox" checked={this.props.charSheet[this.props.name+"checked"]}/>
        <input value={this.calcValue()} id={this.props.name + "value"} type="number" autoComplete="off" min="1" max="30" step="1" checked={this.props.charSheet[this.props.name + "value"]}/>
        <label> {this.props.title} {"("+this.props.stat+")"}</label>
      </div>
    )
  }
}

function mapStatetoProps(state) {
  return {
    charSheet: state.charSheet
  }
}

export default connect(mapStatetoProps, {setStat})(Skill)
