import React from 'react'
import {connect} from 'react-redux'
import Home from './Home'
import {BrowserRouter as Router, Route, Redirect} from 'react-router-dom';


const URL = 'http://localhost:3000/api/v1/'

class LoginSignup extends React.Component {

  state = {
    newusername: "",
    newpassword: "",
    username: "",
    password: ""
  }

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  handleSubmit = (e, arg=true) => {
    e.preventDefault()
    if (arg) {
      fetch(URL + 'users/login ', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          username: this.state.username,
          password: this.state.password
        })
      }).then(res => res.json()).then((json) => {

        if (!json.errors) {
          this.props.saveUser(json)

        }
      })
    } else {
      fetch(URL + 'users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          username: this.state.newusername,
          password: this.state.newpassword
        })
      }).then(res => res.json()).then((json) => {

        if (!json.errors) {
          this.props.saveUser(json)
        }
      })
    }
  }

  render(){
    console.log(this.props.currentUser);
    return(
      <div>
      {!this.props.currentUser ?
      <div id="login">
        <h4> Register an Account </h4>
        <form onSubmit={(e) => this.handleSubmit(e, false)}>
          <input type="text" name="newusername" onChange={this.handleChange} value={this.state.newusername} placeholder="Enter Username"/>
          <input type="password" name="newpassword" onChange={this.handleChange} value={this.state.newpassword} placeholder="Enter Password"/>
          <input type="submit"/>
        </form>
        <h4> Or Login </h4>
        <form onSubmit={(e) => this.handleSubmit(e)}>
          <input type="text" name="username" onChange={this.handleChange} value={this.state.username} placeholder="Enter Username"/>
          <input type="password" name="password" onChange={this.handleChange} value={this.state.password} placeholder="Enter Password"/>
          <input type="submit"/>
        </form>
      </div> : <Home/> }
      </div>
    )
  }
}

function mapStatetoProps(state) {
  return{
    currentUser: state.currentUser
  }
}

function mapDispatchtoProps(dispatch) {
  return {
    saveUser: (currentuser) => {
      dispatch({type:"LOGIN_PLAYER", payload: currentuser})
    }
  }
}

export default connect(mapStatetoProps, mapDispatchtoProps)(LoginSignup)
