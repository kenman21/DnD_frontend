import React from 'react'
import Map from './Map.js'
import {connect} from 'react-redux'
import LinkButton from './LinkButton'

class MapCreator extends React.Component {
  render () {
    return(
      <div>
        <LinkButton to="/lobby">Return to Lobby</LinkButton>
        <Map/>
      </div>
    )
  }
}

export default MapCreator
