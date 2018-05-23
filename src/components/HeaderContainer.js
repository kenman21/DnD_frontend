import React from 'react'
import HeaderField from './HeaderField'
import {connect} from 'react-redux'

class HeaderContainer extends React.Component {
  render() {
  return(
    <div className="ui card sheet-header">
      <div className="content">
        <HeaderField name="char-name" title="Character Name" value={this.props.currentUserCharacters.name}/>
        <HeaderField name="class-level" title="Class & Level"/>
        <HeaderField name="background" title="Background"/>
        <HeaderField name="player-name" title="Player Name"/>
        <HeaderField name="faction" title="Faction"/>
        <HeaderField name="race" title="Race"/>
        <HeaderField name="alignment" title="Alignment"/>
        <HeaderField name="experience-points" title="Experience Points"/>
      </div>
    </div>
  )
}
}

function mapStatetoProps(state) {
  return {
    currentUserCharacters: state.currentUserCharacters
  }
}

export default connect(mapStatetoProps)(HeaderContainer)
