import React from 'react'
import {connect} from 'react-redux'
import {setStat} from '../actions/actions.js'

class OtherStat extends React.Component{

  onChange = (e) => {
    this.props.setStat({[e.target.id]: e.target.value})
    localStorage[e.target.id] = e.target.value
  }

  render(){
    return(
        <div className={"ui card " + this.props.name} id={this.props.name}>
          <div className="content">
            <div className="header">{this.props.title}</div>
            <input id={this.props.name+"value"} onChange={this.onChange} type="number" autoComplete="off" min="1" max="30" step="1"/>
          </div>
        </div>
    )
  }
}


export default connect(null,{setStat})(OtherStat)
