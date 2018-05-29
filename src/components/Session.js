import React from 'react'
import MapCreator from './MapCreator'
import {connect} from 'react-redux'
import {setSession} from '../actions/actions.js'

class Session extends React.Component {

  componentDidMount = () => {
    if (localStorage.openSession) {
      this.props.setSession(JSON.parse(localStorage.openSession))
    }
  }
  render() {
    return (
      <div>
        {this.props.currentUser.id === this.props.openCampaign.creator_id ? <MapCreator session={true}/> : <MapCreator session={true}/>}
      </div>
    )
  }
}

function mapStatetoProps(state) {
  return {
    openCampaign: state.openCampaign,
    currentUser: state.currentUser,
    openSession: state.openSession
  }
}

export default connect(mapStatetoProps, {setSession})(Session)
