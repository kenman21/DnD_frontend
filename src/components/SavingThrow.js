import React from 'react'
import {connect} from 'react-redux'
import {setStat} from '../actions/actions.js'

class SavingThrow extends React.Component {

  onChange = (e) => {
    this.props.setStat({[e.target.id]: e.target.checked})
  }

  calcValue = () => {
    let value = this.props.charSheet[this.props.name+"mod"]
    this.props.charSheet[this.props.name+"checkbox"] ? value += this.props.charSheet.proficiencyvalue:null
    return value
  }

  render() {
    return (
      <div className="savingthrow-checkbox">
        <input type="checkbox" onChange={this.onChange} id={this.props.name + "checkbox"} checked={this.props.charSheet[this.props.name + "checkbox"]}/><input id={this.props.name + "throw"} value={this.calcValue()}onChange={this.onChange} type="number" autoComplete="off" min="1" max="30" step="1"/><label> {this.props.title} </label>
      </div>
    )
  }
}

function mapStatetoProps(state) {
  return {
    charSheet: state.charSheet
  }
}

export default connect(mapStatetoProps,{setStat})(SavingThrow)
