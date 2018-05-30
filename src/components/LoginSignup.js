import React from 'react'
import {connect} from 'react-redux'
import {login, register} from '../actions/fetch_actions.js'
import Rodal from 'rodal';
import 'rodal/lib/rodal.css';

class LoginSignup extends React.Component {

  state = {
    newusername: "",
    newpassword: "",
    username: "",
    password: "",
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
        this.props.login(this.state.username, this.state.password)
        .then(setTimeout(() => {JSON.parse(localStorage.currentUser) ?
          this.props.history.push("/lobby"):
          this.setState({errors: "There was an error. Please try again"})},500));
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
      <div id="frontpage">
        <h2 id="DD"> DUNGEONS & DRAGONS</h2>
        <h2 id="M"> MANAGER</h2>
        <div id="register">
          <h4> Register an Account </h4>
          <form onSubmit={(e) => this.handleSubmit(e, "register")}>
          <div className="ui input focus signin">
            <input  type="text" name="newusername" onChange={this.handleChange} value={this.state.newusername} placeholder="Enter Username"/>
          </div><br></br>
          <div className="ui input focus password">
            <input className="ui input focus"type="password" name="newpassword" onChange={this.handleChange} value={this.state.newpassword} placeholder="Enter Password"/>
          </div><br></br>
            <input className="ui button" tabindex="0" type="submit"/>
          </form>
        </div>
        <div id="login">
          <h4 className="front-header-1"> Already have an Account?</h4>
          <h4 className="front-header-2"> Sign in</h4>
          <form onSubmit={(e) => this.handleSubmit(e, "login")}>
          <div className="ui input focus signin">
            <input type="text" name="username" onChange={this.handleChange} value={this.state.username} placeholder="Enter Username"/>
          </div><br></br>
          <div className="ui input focus password">
            <input className="ui input focus" type="password" name="password" onChange={this.handleChange} value={this.state.password} placeholder="Enter Password"/>
          </div><br></br>
            <input className="ui button" tabindex="0" type="submit"/>
          </form>
        </div>
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
