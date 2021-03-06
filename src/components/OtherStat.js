import React from 'react'
import {connect} from 'react-redux'
import {setStat} from '../actions/actions.js'

class OtherStat extends React.Component{

  onChange = (e) => {
    this.props.setStat({[e.target.id]: parseInt(e.target.value)})
    localStorage[e.target.id] = e.target.value
  }

  render(){
    return(
        <div className={"ui card " + this.props.name} id={this.props.name}>
          <div className="content">
            <div className="header">{this.props.title}</div>
            <input id={this.props.name+"value"} onChange={this.onChange} type="number" autoComplete="off" min="1" max="30" step="1" value={this.props.charSheet[this.props.name + 'value']}/>
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


export default connect(mapStatetoProps,{setStat})(OtherStat)
