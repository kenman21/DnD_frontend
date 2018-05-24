import React from 'react'
import {connect} from 'react-redux'
import {setStat} from '../actions/actions.js'

class DeathSaves extends React.Component {

  onChange = (e) => {
    this.props.setStat({[e.target.id]: e.target.checked})
    // localStorage[e.target.id] = e.target.value
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
            <input onChange={this.onChange} id="s1_checkbox" type="checkbox" checked={this.props.charSheet.s1_checkbox}/>
            <input onChange={this.onChange} id="s2_checkbox" type="checkbox" checked={this.props.charSheet.s2_checkbox}/>
            <input onChange={this.onChange} id="s3_checkbox" type="checkbox" checked={this.props.charSheet.s3_checkbox}/><br></br>
          </div>
          <div id="deaths">
            <label>Deaths</label>
            <input onChange={this.onChange} id="d1_checkbox" type="checkbox" checked={this.props.charSheet.d1_checkbox}/>
            <input onChange={this.onChange} id="d2_checkbox" type="checkbox" checked={this.props.charSheet.d2_checkbox}/>
            <input onChange={this.onChange} id="d3_checkbox" type="checkbox" checked={this.props.charSheet.d3_checkbox}/>
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
export default connect(mapStatetoProps,{setStat})(DeathSaves)
