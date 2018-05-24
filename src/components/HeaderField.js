import React from 'react'
import {connect} from 'react-redux'
import {setStat} from '../actions/actions.js'

class HeaderField extends React.Component {
  onChange = (e) => {
    this.props.setStat({[e.target.id]: e.target.value})
    localStorage[e.target.id] = e.target.value
  }

  render() {
  return(
    <div className="header-field" >
      <input id={this.props.name} onChange={this.onChange} className="header-input" type="text" value={this.props.charSheet[this.props.name] ? this.props.charSheet[this.props.name]:""}/>
      <div className="ui tiny header charsheet">{this.props.title}</div>
    </div>
  )
}
}

function mapStatetoProps(state) {
  return {
    charSheet: state.charSheet
  }
}

export default connect(mapStatetoProps,{setStat})(HeaderField)
