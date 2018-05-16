import React, { Component } from 'react';
import {BrowserRouter as Router, Route} from 'react-router-dom';
import {connect} from 'react-redux'
import logo from './logo.svg';
import './App.css';
import LoginSignup from './components/LoginSignup'
import Home from './components/Home'
import CampaignContainer from './components/CampaignContainer'
import Content from './components/Content'

const URL = 'http://localhost:3000/api/v1/'

class App extends Component {

  componentDidMount = () => {
    fetch(URL + 'campaigns')
    .then(res => res.json())
    .then(res => {
      this.props.setCampaigns(res)
    }
  )}


  render() {
    return (
      <Router>
        <div className="App">
          <Route path="/" component={LoginSignup} />
          <Route path="/home" component={Home}/>
          <Route path="/content" component={Content}/>
        </div>
      </Router>
    )
  }
}

function mapStatetoProps(state){
  return {
    currentUser: state.currentUser
  }
}

function mapDispatchtoProps(dispatch) {
  return {
    setCampaigns: (campaigns) => {
      dispatch({type:'SET_CAMPAIGNS', payload: campaigns})
    }
  }
}

export default connect(mapStatetoProps, mapDispatchtoProps)(App);
