import React from 'react'
import HeaderField from './HeaderField'
import {connect} from 'react-redux'

class HeaderContainer extends React.Component {
  render() {
  return(
    <div className="ui card sheet-header">
      <div className="content">
        <HeaderField name="char_name" title="Character Name"/>
        <HeaderField name="class_level" title="Class & Level"/>
        <HeaderField name="background" title="Background"/>
        <HeaderField name="player_name" title="Player Name"/>
        <HeaderField name="faction" title="Faction"/>
        <HeaderField name="race" title="Race"/>
        <HeaderField name="alignment" title="Alignment"/>
        <HeaderField name="experience_points" title="Experience Points"/>
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
