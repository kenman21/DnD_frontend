import React from 'react'
import Map from './Map.js'
import {connect} from 'react-redux'
import LinkButton from './LinkButton'
import {addMap} from '../actions/fetch_actions.js'

class MapCreator extends React.Component {

  state = {
    mapCreated: false,
    mapName: ""
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
    return(
      <div>
        <LinkButton to="/lobby">Return to Lobby</LinkButton>
        <form className="create-map" onSubmit={this.handleSubmit}>
          <label> Create Your Own Map </label><br></br>
          <input onChange={this.handleChange} placeholder="New Map Name"/>
          <input type="submit"/>
        </form>
        <button>Save Map State</button>
        <div>
        <Map/>
        </div>
      </div>
    )
  }
}

function mapStatetoProps(state) {
  return(
    {currentUser: state.currentUser}
  )
}

export default connect(mapStatetoProps, {addMap})(MapCreator)
