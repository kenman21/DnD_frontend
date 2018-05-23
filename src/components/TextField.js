import React from 'react'

class TextField extends React.Component {
  render() {
    return (
      <div className={"ui card "+this.props.name} id={this.props.name}>
        <div className="content">
          <div className="header">{this.props.title}</div>
          {this.props.extra === "text" ?
          <div>
          <div className="as column">
          <div className="tiny-header">Name</div>
            <input id="as-name-1" className="as field" type="text"/>
            <input id="as-name-2" className="as field" type="text"/>
            <input id="as-name-3" className="as field" type="text"/>
          </div>
          <div className="as column">
          <div className="tiny-header">Attack Bonus</div>
            <input id="as-atkb-1" className="as field" type="text"/>
            <input id="as-atkb-2" className="as field" type="text"/>
            <input id="as-atkb-3" className="as field" type="text"/>
          </div>
          <div className="as column">
          <div className="tiny-header">Damage/Type</div>
            <input id="as-type-1" className="as field" type="text"/>
            <input id="as-type-2" className="as field" type="text"/>
            <input id="as-type-3" className="as field" type="text"/>
          </div>
          </div>:null}
          <textarea className={"notes "+this.props.name + "-notes"}/>
        </div>
      </div>
    )
  }
}

export default TextField
