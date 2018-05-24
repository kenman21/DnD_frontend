import React from 'react'
import {connect} from 'react-redux'
import {setStat} from '../actions/actions.js'

class TextField extends React.Component {

  onChange = (e) => {
    this.props.setStat({[e.target.id]: e.target.value})
    localStorage[e.target.id] = e.target.value
  }

  render() {
    return (
      <div className={"ui card "+this.props.name} id={this.props.name}>
        <div className="content">
          <div className="header">{this.props.title}</div>
          {this.props.extra === "text" ?
          <div>
          <div className="as column">
          <div className="tiny-header">Name</div>
            <input onChange={this.onChange} id="as_name_1" className="as field" type="text" value={this.props.charSheet.as_name_1}/>
            <input onChange={this.onChange} id="as_name_2" className="as field" type="text" value={this.props.charSheet.as_name_2}/>
            <input onChange={this.onChange} id="as_name_3" className="as field" type="text" value={this.props.charSheet.as_name_3}/>
          </div>
          <div className="as column">
          <div className="tiny-header">Attack Bonus</div>
            <input onChange={this.onChange} id="as_atkb_1" className="as field" type="text" value={this.props.charSheet.as_atkb_1}/>
            <input onChange={this.onChange} id="as_atkb_2" className="as field" type="text" value={this.props.charSheet.as_atkb_2}/>
            <input onChange={this.onChange} id="as_atkb_3" className="as field" type="text" value={this.props.charSheet.as_atkb_3}/>
          </div>
          <div className="as column">
          <div className="tiny-header">Damage/Type</div>
            <input onChange={this.onChange} id="as_type_1" className="as field" type="text" value={this.props.charSheet.as_type_1}/>
            <input onChange={this.onChange} id="as_type_2" className="as field" type="text" value={this.props.charSheet.as_type_2}/>
            <input onChange={this.onChange} id="as_type_3" className="as field" type="text" value={this.props.charSheet.as_type_3}/>
          </div>
          </div>:null}
          <textarea value={this.props.charSheet[this.props.name + "notes"]} onChange={this.onChange} id={this.props.name + "notes"} className={"notes "+this.props.name + "-notes"}/>
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

export default connect(mapStatetoProps,{setStat})(TextField)
