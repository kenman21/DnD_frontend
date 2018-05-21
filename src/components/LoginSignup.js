import React from 'react'
import {connect} from 'react-redux'
import {login, register} from '../actions/fetch_actions.js'

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

  handleSubmit = (e, type) => {
    e.preventDefault()
    switch (type) {
      case "login":
        this.props.login(this.state.username, this.state.password).then(JSON.parse(localStorage.currentUser) ? this.props.history.push("/lobby"):null);
        break
      case "register":
        this.props.register(this.state.newusername, this.state.newpassword).then(setTimeout(() => {JSON.parse(localStorage.currentUser) ? this.props.history.push("/lobby"):null},500));
        break
      default:
        console.log("error");
        break
    }
  }

  render() {
    return(
      <div id="login">
        <h4> Register an Account </h4>
        <form onSubmit={(e) => this.handleSubmit(e, "register")}>
          <input type="text" name="newusername" onChange={this.handleChange} value={this.state.newusername} placeholder="Enter Username"/>
          <input type="password" name="newpassword" onChange={this.handleChange} value={this.state.newpassword} placeholder="Enter Password"/>
          <input type="submit"/>
        </form>
        <h4> Or Login </h4>
        <form onSubmit={(e) => this.handleSubmit(e, "login")}>
          <input type="text" name="username" onChange={this.handleChange} value={this.state.username} placeholder="Enter Username"/>
          <input type="password" name="password" onChange={this.handleChange} value={this.state.password} placeholder="Enter Password"/>
          <input type="submit"/>
        </form>
      </div>
    )
  }
}

function mapStatetoProps(state) {
  return{
    currentUser: state.currentUser
  }
}


export default connect(mapStatetoProps, {login, register})(LoginSignup)
