import React from 'react'

class OtherStat extends React.Component{
  render(){
    return(
        <div className={"ui card " + this.props.name} id={this.props.name}>
          <div className="content">
            <div className="header">{this.props.title}</div>
            <input id={this.props.name+"-value"} type="number" autoComplete="off" min="1" max="30" step="1"/>
          </div>
        </div>
    )
  }
}


export default OtherStat
