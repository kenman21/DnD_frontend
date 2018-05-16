import React, { Component } from 'react';
import {BrowserRouter as Router, Route} from 'react-router-dom';
import {connect} from 'react-redux'
import './App.css';
import LoginSignup from './components/LoginSignup'
import Lobby from './components/Lobby'
import Content from './components/Content'
import MapCreator from './components/MapCreator'
import {getCampaigns} from './actions/fetch_actions.js'

class App extends Component {

  componentDidMount = () => {
    this.props.getCampaigns()
  }

  render() {
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
    currentUser: state.currentUser
  }
}

export default connect(mapStatetoProps, {getCampaigns})(App);
