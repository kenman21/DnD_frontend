import React from 'react'
import Map from './Map.js'
import {connect} from 'react-redux'
import LinkButton from './LinkButton'
import {addMap, saveMap, getMaps} from '../actions/fetch_actions.js'
import {keepLoggedIn} from '../actions/actions.js'

class MapCreator extends React.Component {

  state = {
    mapCreated: false,
    mapName: ""
  }

  componentDidMount = () => {
    if (localStorage.currentUser && Object.keys(this.props.currentUser).length === 0) {
      let promise = new Promise((resolve, reject) => {
        this.props.keepLoggedIn(localStorage.currentUser)
        resolve()
      })

      promise.then(() => {this.props.getMaps(this.props.currentUser.id)})
    }

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
    this.props.addMap(this.state.mapName, this.props.currentUser.id)
    this.setState({
      mapName: ""
    })
  }

  render () {
    let userMaps = this.props.currentUserMaps.map(map => {
      return (
      <div key={map.name}>
        {map.name}
        <button>Edit Map</button>
      </div>
    )})

    console.log(this.props.currentUser);

    return(
      <div>
        <div className="left" id="map-list">
          Map List goes here
          {userMaps}
        </div>
        <LinkButton to="/lobby">Return to Lobby</LinkButton>
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

export default connect(mapStatetoProps, {addMap, saveMap, getMaps, keepLoggedIn})(MapCreator)
