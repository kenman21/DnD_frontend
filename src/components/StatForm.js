import React from 'react'
import {connect} from 'react-redux'
import {setStat} from '../actions/actions.js'

class StatForm extends React.Component {

  onChange = (e) => {
    this.props.setStat({[e.target.id]: parseInt(e.target.value)})
    // localStorage[e.target.id] = e.target.value
  }

  render() {
  return(
    <div className={"ui card singlestat "+this.props.name} id={this.props.name}>
      <div className="content skillcontent">
        <h3> {this.props.name.charAt(0).toUpperCase()+this.props.name.slice(1)} </h3>
        <input id={this.props.name + 'base'} onChange={this.onChange} type="number" autoComplete="off" min="1" max="30" step="1" value={this.props.charSheet[this.props.name + 'base']}/><label>{this.props.firstlabel}</label><br></br>
        <div className="modifier">
          <input id={this.props.name + 'mod'} onChange={this.onChange} className="modifier value" type="number" autoComplete="off" min="1" max="30" step="1" value={this.props.charSheet[this.props.name + 'mod']}/><label>{this.props.secondlabel}</label>
        </div>
      </div>
    </div>
  )
}
}

function mapStatetoProps(state) {
  return {
    charSheet: state.charSheet
  }
}

export default connect(mapStatetoProps,{setStat})(StatForm)
