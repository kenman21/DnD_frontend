import React from 'react'

class StatForm extends React.Component {
  render() {
  return(
    <div className={"ui card singlestat "+this.props.name} id={this.props.name}>
      <div className="content skillcontent">
        <h3> {this.props.name.charAt(0).toUpperCase()+this.props.name.slice(1)} </h3>
        <input id={this.props.name + ' base'} type="number" autoComplete="off" min="1" max="30" step="1"/><label>{this.props.firstlabel}</label><br></br>
        <div className="modifier">
          <input id={this.props.name + ' mod'} className="modifier value" type="number" autoComplete="off" min="1" max="30" step="1"/><label>{this.props.secondlabel}</label>
        </div>
      </div>
    </div>
  )
}
}

export default StatForm
