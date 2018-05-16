import React from 'react'
import {connect} from 'react-redux'
import {Redirect} from 'react-router-dom';
import CampaignContainer from './CampaignContainer'
import Content from './Content'

const Home = (props) => {
  return (
    <div>
      {props.currentUser ? <div> {props.rendering_content ? <Content/> :<CampaignContainer/>} </div> :  <Redirect to="/"/>}
    </div>
  )
}

function mapStatetoProps(state) {
  return {
    currentUser: state.currentUser,
    rendering_content: state.rendering_content
  }
}


export default connect(mapStatetoProps)(Home)
