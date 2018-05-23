import React from 'react'
import {connect} from 'react-redux'
import {setStat} from '../actions/actions.js'

class DeathSaves extends React.Component {

  onChange = (e) => {
    this.props.setStat({[e.target.id]: e.target.value})
    localStorage[e.target.id] = e.target.value
  }

  render() {
    return (
      <div className="ui card deathsaves" id="deathsaves">
        <div className="content deathsaves-header">
          <div className="header">Death Saves</div>
        </div>
        <div className="content deathsaves-content">
          <div id="successes">
            <label>Successes</label>
            <input onChange={this.onChange} id="s1_checkbox" type="checkbox"/>
            <input onChange={this.onChange} id="s2_checkbox" type="checkbox"/>
            <input onChange={this.onChange} id="s3_checkbox" type="checkbox"/><br></br>
          </div>
          <div id="deaths">
            <label>Deaths</label>
            <input onChange={this.onChange} id="d1_checkbox" type="checkbox"/>
            <input onChange={this.onChange} id="d2_checkbox" type="checkbox"/>
            <input onChange={this.onChange} id="d3_checkbox" type="checkbox"/>
          </div>
        </div>
      </div>
    )
  }
}

export default connect(null,{setStat})(DeathSaves)
