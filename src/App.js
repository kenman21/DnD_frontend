import React, { Component } from 'react';
import {BrowserRouter as Router, Route} from 'react-router-dom';
import {connect} from 'react-redux'
import './App.css';
import LoginSignup from './components/LoginSignup'
import Lobby from './components/Lobby'
import Content from './components/Content'
import MapCreator from './components/MapCreator'
import {getCampaigns, getMaps} from './actions/fetch_actions.js'
import {keepLoggedIn, openCampaign} from './actions/actions.js'


class App extends Component {

  componentDidMount = () => {
    this.autoLogin()
    this.autoSetCampaign()
    this.props.getCampaigns()
  }

  autoSetCampaign = () => {
    if (localStorage.openCampaign) {
      this.props.openCampaign(JSON.parse(localStorage.openCampaign))
    }
  }

  autoLogin = () => {
    if ((localStorage.currentUser) !== "null" && Object.keys(this.props.currentUser).length === 0 && (localStorage.currentUser) !== undefined) {
      let promise = new Promise((resolve, reject) => {
        this.props.keepLoggedIn(JSON.parse(localStorage.currentUser))
        resolve()
      })
      promise.then(() => {this.props.getMaps(this.props.currentUser.id)})
    }
  }

  autoSetCharacter = () => {

  }

  render() {
    console.log(this.props.state);
    let campaign_routes = this.props.campaigns.map(campaign => {
      let url = "/campaign/" + campaign.id
      return (
      <Route key={campaign.id} path={url} component={Content}/>
    )
  })
    return (
      <Router>
        <div className="App">
          <Route path="/signin" component={LoginSignup} />
          {campaign_routes}
          <Route path="/lobby" component={Lobby}/>
          <Route path="/mapcreator" component={MapCreator}/>
        </div>
      </Router>
    )
  }
}

function mapStatetoProps(state) {
  return {
    campaigns: state.campaigns,
    currentUser: state.currentUser,
    state: state
  }
}

export default connect(mapStatetoProps, {getCampaigns, getMaps, keepLoggedIn, openCampaign})(App);
