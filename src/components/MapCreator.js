import React from 'react'
import Map from './Map.js'
import {connect} from 'react-redux'
import LinkButton from './LinkButton'
import {addMap, saveMap, getMaps} from '../actions/fetch_actions.js'
import {keepLoggedIn, openingMap, toggleEditing, clearActions} from '../actions/actions.js'

class MapCreator extends React.Component {

  state = {
    mapCreated: false,
    mapName: ""
  }

  componentDidMount = () => {
    if (Object.keys(this.props.currentUser).length !== 0) {
      this.props.getMaps(this.props.currentUser.id)
    }
  }

  handleChange = (e) => {
    this.setState({
      mapName: e.target.value
    })
  }

  handleSubmit = (e) => {
    e.preventDefault()
    this.props.clearActions()
    this.props.addMap(this.state.mapName, this.props.currentUser.id)
    this.setState({
      mapName: ""
    })
  }

  EditMap = (map) => {
    this.props.toggleEditing()
    this.props.openingMap(null)
    this.props.openingMap(map)
  }

  clearRoom = () => {
    this.props.openingMap(null)
  }

  render () {
    let userMaps = this.props.currentUserMaps.map(map => {
      return (
      <div key={map.name}>
        {map.name}
        <button onClick={() => this.EditMap(map)}>Edit Map</button>
      </div>
    )})
    return(
      <div>
        <div className="left" id="map-list">
          Map List goes here
          {userMaps}
        </div>
        <LinkButton onClick={this.clearRoom} to="/lobby">Return to Lobby</LinkButton>
        <form className="create-map" onSubmit={this.handleSubmit}>
          <label> Create Your Own Map </label><br></br>
          <input onChange={this.handleChange} value={this.state.mapName} placeholder="New Map Name"/>
          <input type="submit"/>
        </form>
        {this.props.openMap ? <p>{this.props.openMap.name}</p> : null}
        <button onClick={() => {this.props.saveMap(this.props.openMap, this.props.actObj)}}>Save Map State</button>
        <div>
          <Map/>
        </div>
      </div>
    )
  }
}

function mapStatetoProps(state) {
  return(
    {currentUser: state.currentUser,
     actObj: state.actObj,
     openMap: state.openMap,
     currentUserMaps: state.currentUserMaps
    }
  )
}

export default connect(mapStatetoProps, {addMap, saveMap, getMaps, keepLoggedIn, openingMap, toggleEditing, clearActions})(MapCreator)
