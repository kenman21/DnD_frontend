import React from 'react'

class HeaderField extends React.Component {
  render() {
  return(
    <div className="header-field" >
      <input id={this.props.name} className="header-input" type="text" value={this.props.value}/>
      <div className="ui tiny header charsheet">{this.props.title}</div>
    </div>
  )
}
}

export default HeaderField
