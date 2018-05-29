import React from 'react'
import MapContainer from './MapContainer.js'
import {connect} from 'react-redux'
import LinkButton from './LinkButton'
import {addMap, saveMap, getMaps, deleteMap, setSessionMap, highlightSessionMap, deleteSession} from '../actions/fetch_actions.js'
import {keepLoggedIn, openingMap, toggleEditing, clearActions, setSession} from '../actions/actions.js'
import { ActionCable } from 'react-actioncable-provider'

class MapCreator extends React.Component {

  state = {
    mapCreated: false,
    mapName: "",
    canvasx: -1,
    canvasy: -1,
    canvas_x_end: -1,
    canvas_y_end: -1
  }

  componentDidMount = () => {
    if (Object.keys(this.props.currentUser).length !== 0) {
      this.props.getMaps(this.props.currentUser.id)
    }
  }

  handleSocketResponse = (data) => {
    switch (data.type) {
      case 'UPDATE_HIGHLIGHT':
        this.props.setSession(data.payload.session)
        this.props.openingMap(data.payload.map)
        break
      default:
        console.log(data);
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
    if (Object.keys(this.props.openSession).length !== 0 && this.props.currentUser.id === this.props.openCampaign.creator_id) {
      this.props.deleteSession(this.props.openSession.id)
    }
  }

  clickDelete = (map, currentUser) => {
    if (this.props.openMap === map) {
      this.props.openingMap(null)
    }
    this.props.deleteMap(map, currentUser)
  }

  handleClick = (e) => {
    switch (e.target.id) {
      case 'highlight':
        this.props.highlightSessionMap(this.props.openSession.id, this.state.canvasx, this.state.canvasy, this.state.canvas_x_end, this.state.canvas_y_end)
        break
      default:
        console.log("error");
    }
  }

  passtoCreator = (x, y, x_end, y_end) => {
    this.setState({
      canvasx: x,
      canvasy: y,
      canvas_x_end: x_end,
      canvas_y_end: y_end
    })
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
            {this.props.session && this.props.currentUser.id === this.props.openCampaign.creator_id ?
            <button className="ui button map-button" onClick={() => this.props.setSessionMap(map.id, this.props.openSession.id)}>Open</button>:
            <button className="ui button map-button" onClick={() => this.editMap(map)}>Edit</button>}
            <button className="ui button map-button" onClick={() => this.clickDelete(map, this.props.currentUser)}>Delete</button>
          </div>
        </div>
      </div>
    )})
    return(
      <div>
        <ActionCable channel={{channel: 'CampaignChannel', campaign_id: this.props.openCampaign.id}}
        onReceived={this.handleSocketResponse}
        />
        {!this.props.session || this.props.currentUser.id === this.props.openCampaign.creator_id ?
        <div className="left" id="map-list">
          <h4>Your Maps</h4>
            <div className="ui cards">
              {userMaps}
            </div>
        </div>:null}
        <LinkButton className="ui button" id="return-lobby" onClick={this.clearRoom} to="/lobby">Return to Lobby</LinkButton>
        {this.props.session && this.props.currentUser.id === this.props.openCampaign.creator_id ? <button id="highlight" onClick={this.handleClick} className="ui button">Highlight Map</button>:null}
        {!this.props.session ?
        <form className="create-map" onSubmit={this.handleSubmit}>
          {!this.props.openMap ? <h2> Create a Map! Enter a Name Below </h2>:null}
          <div className="ui input focus">
            <input  onChange={this.handleChange} value={this.state.mapName} placeholder="New Map Name"/>
          </div>
          <input className="ui button" type="submit"/>
        </form>:null}
        {this.props.openMap ? <h4>{this.props.openMap.name}</h4> : null}
        {this.props.openMap && !this.props.session? <button className="ui button" onClick={() => {this.props.saveMap(this.props.openMap, this.props.actObj)}}>Save Map State</button>:null}
        <div>
          <MapContainer passToCreator={this.passtoCreator} session={this.props.session}/>
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
     currentUserMaps: state.currentUserMaps,
     openCampaign: state.openCampaign,
     openSession: state.openSession
    }
  )
}

export default connect(mapStatetoProps, {deleteSession, setSession, setSessionMap, highlightSessionMap, addMap, saveMap, getMaps, keepLoggedIn, openingMap, toggleEditing, clearActions, deleteMap})(MapCreator)
