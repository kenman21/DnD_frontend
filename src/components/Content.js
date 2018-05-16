import React from 'react'
import {connect} from 'react-redux'
import {NavLink} from 'react-router-dom';

class Content extends React.Component {

  onClick = () => {
    console.log("here");
    this.props.history.push("/lobby")
  }
  render() {
    return (
      <div>
        <button onClick={this.onClick}>Return to Lobby</button>
        {JSON.parse(localStorage.currentUser).id === JSON.parse(localStorage.openCampaign).creator_id ? <div>DM</div>:<div>PLAYER</div>}
      </div>
    )
  }
}

function mapStatetoProps(state) {
  return{
    currentUser: state.currentUser,
    openCampaign: state.openCampaign
  }
}



export default connect(mapStatetoProps, null)(Content)
