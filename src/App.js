import React, { Component } from 'react';
import {BrowserRouter as Router, Route} from 'react-router-dom';
import {connect} from 'react-redux'
import './App.css';
import LoginSignup from './components/LoginSignup'
import Lobby from './components/Lobby'
import Content from './components/Content'
import {getCampaigns} from './actions/fetch_actions.js'

class App extends Component {

  componentDidMount = () => {
    this.props.getCampaigns()
  }

  render() {
    console.log(this.props);
    return (
      <Router>
        <div className="App">
          <Route path="/signin" component={LoginSignup} />
          <Route path="/campaignpage" component={Content}/>
          <Route path="/lobby" component={Lobby}/>
        </div>
      </Router>
    )
  }
}

function mapStatetoProps(state) {
  return {
    ...state
  }
}

export default connect(mapStatetoProps, {getCampaigns})(App);
