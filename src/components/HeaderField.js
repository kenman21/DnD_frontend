import React from 'react'

class HeaderField extends React.Component {
  render() {
  return(
    <div className="header-field" >
      <div className="ui tiny header">{this.props.title}</div>
      <input id={this.props.name} className="header-input" type="text" value={this.props.value}/>
    </div>
  )
}
}

export default HeaderField
