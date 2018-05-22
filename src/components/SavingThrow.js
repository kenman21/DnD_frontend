import React from 'react'

class SavingThrow extends React.Component {
  render() {
    return (
      <div className="savingthrow-checkbox">
        <input type="checkbox"/><input id={this.props.name + " value"} type="number" autoComplete="off" min="1" max="30" step="1"/><label> {this.props.name} </label>
      </div>
    )
  }
}

export default SavingThrow
