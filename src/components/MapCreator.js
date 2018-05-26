import React from 'react'
import Map from './Map.js'
import {connect} from 'react-redux'
import LinkButton from './LinkButton'
import {addMap, saveMap, getMaps, deleteMap} from '../actions/fetch_actions.js'
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

  editMap = (map) => {
    this.props.openingMap(map)
    this.props.getMaps(this.props.currentUser.id)
  }

  clearRoom = () => {
    this.props.openingMap(null)
  }

  clickDelete = (map, currentUser) => {
    if (this.props.openMap === map) {
      this.props.openingMap(null)
    }
    this.props.deleteMap(map, currentUser)
  }

  render () {
    let userMaps = this.props.currentUserMaps.map(map => {
      return (
      <div className="card map" key={map.name}>
        <div className="content">
          <div className="header">
            <h5>{map.name}</h5>
          </div>
        </div>
        <div className="extra content">
          <div className="ui two buttons">
            <button className="ui button map-button" onClick={() => this.editMap(map)}>Edit</button>
            <button className="ui button map-button" onClick={() => this.clickDelete(map, this.props.currentUser)}>Delete</button>
          </div>
        </div>
      </div>
    )})

    return(
      <div>
        <div className="left" id="map-list">
          <h4>Your Maps</h4>
          <div className="ui cards">
            {userMaps}
          </div>
        </div>
        <LinkButton className="ui button" id="return-lobby" onClick={this.clearRoom} to="/lobby">Return to Lobby</LinkButton>
        <form className="create-map" onSubmit={this.handleSubmit}>
          <div className="ui input focus">
            <input  onChange={this.handleChange} value={this.state.mapName} placeholder="New Map Name"/>
          </div>
          <input className="ui button" type="submit"/>
        </form>
        {this.props.openMap ? <h4>{this.props.openMap.name}</h4> : <h4>Create Your Own Map!</h4>}
        {this.props.openMap? <button className="ui button" onClick={() => {this.props.saveMap(this.props.openMap, this.props.actObj)}}>Save Map State</button>:null}
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

export default connect(mapStatetoProps, {addMap, saveMap, getMaps, keepLoggedIn, openingMap, toggleEditing, clearActions, deleteMap})(MapCreator)
