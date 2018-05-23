import React from 'react'
import {connect} from 'react-redux'
import {setStat} from '../actions/actions.js'

class SavingThrow extends React.Component {

  onChange = (e) => {
    this.props.setStat({[e.target.id]: e.target.value})
    localStorage[e.target.id] = e.target.value
  }

  render() {
    return (
      <div className="savingthrow-checkbox">
        <input type="checkbox" onChange={this.onChange} id={this.props.name + "checkbox"}/><input id={this.props.name + "throw"} onChange={this.onChange} type="number" autoComplete="off" min="1" max="30" step="1"/><label> {this.props.name} </label>
      </div>
    )
  }
}

export default connect(null,{setStat})(SavingThrow)
