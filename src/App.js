import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import LoginSignup from './components/LoginSignup'
import Home from './components/Home'
import {connect} from 'react-redux'

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
      <div className="App">
        {this.props.currentUser ? <Home/>:<div><LoginSignup/></div>}
      </div>
    );
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
