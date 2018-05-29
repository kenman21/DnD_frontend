import React from 'react'
import {connect} from 'react-redux'
import {addCampaign, deleteCampaign, getUserCharacters, getCampaignCharacters, checkCampaignPassword} from '../actions/fetch_actions.js'
import {openingCampaign, clearUser} from '../actions/actions.js'
import LinkButton from './LinkButton'
import Rodal from 'rodal';
import 'rodal/lib/rodal.css';

class Lobby extends React.Component {
  state = {
    campaignName: "",
    visible: false,
    campaignPassword: "",
    enteringPassword: ""
  }

  show() {
    this.setState({ visible: true });
  }

  hide() {
      this.setState({ visible: false });
  }

  handleChange = (e) => {
    switch (e.target.id) {
      case "campaign-name":
        this.setState({
          campaignName: e.target.value
        })
        break
      case "entering-password":
        this.setState({
          enteringPassword: e.target.value
        })
        break
      case "campaign-password":
        this.setState({
          campaignPassword: e.target.value
        })
        break
      default:
        console.log("error");
    }
  }

  checkPassword = (e, campaign) => {
    let url = e.target.getAttribute('url')
    this.props.checkCampaignPassword(this.state.enteringPassword, campaign.id)
    .then(json => {
      if (!json.errors) {
        this.props.getUserCharacters(this.props.currentUser, this.props.openCampaign)
        this.props.history.push(url)
        localStorage.openCampaign = JSON.stringify(campaign)
    }})
    // .then(json => {if (!json.errors) {
    //     this.props.history.push(url)
    //     localStorage.openCampaign = JSON.stringify(campaign)
    //   }})

  }

  handleSubmit = (e) => {
    e.preventDefault()
    this.props.addCampaign(this.state.campaignName, this.props.currentUser.id, this.state.campaignPassword)
    this.setState({
      campaignName: "",
      campaignPassword: ""
    })
  }

  handleClick = () => {
    localStorage.currentUser = JSON.stringify(null)
    this.props.clearUser(null)
  }

  enterCampaign = (e,campaign) => {
    let url = e.target.getAttribute('url')
    let promise = new Promise((resolve, reject) => {
      this.props.openingCampaign(campaign)
      resolve()
    })
    promise.then((e) =>
    {
      this.props.getCampaignCharacters(this.props.openCampaign.id)
    }).then(()=> {

        this.props.history.push(url)

      })
    localStorage.openCampaign = JSON.stringify(campaign)
  }

  render() {

    let campaigns = this.props.campaigns.map(campaign => {
      let url = "/campaign/" + campaign.id
      return(
    <div className="card campaign" key={campaign.id}>
      <div className="content">
        <div className="header">
          <p>{campaign.name}</p>
        </div>
      </div>
      <div className="extra content">
        <div className="ui two buttons">
          {campaign.creator_id === this.props.currentUser.id ?
            <div className="deletec">
              <button className="ui button delete" onClick={() => this.props.deleteCampaign(campaign.id)}>
                Delete Campaign
              </button>
            </div> : null}
          <div className="openc">
            {campaign.creator_id === this.props.currentUser.id ?
            <button className="ui button" url={url} onClick={(e) => this.enterCampaign(e,campaign)}>
              Open Campaign
            </button> :
              <div>
              <button className="ui button open" onClick={this.show.bind(this)}>Join Campaign</button>
              <Rodal visible={this.state.visible} onClose={this.hide.bind(this)}>
                  <div>
                    <h3> Enter the Campaign Password </h3>
                    <div className="ui input focus">
                      <input id="entering-password" type="password" onChange={this.handleChange} value={this.state.enteringPassword} placeholder="Password"/>
                    </div> <br></br>
                    <button id="entering-password-submit" url={url} className="ui button" url={url} onClick={(e) => this.checkPassword(e, campaign)}>
                      Submit
                    </button>
                  </div>
              </Rodal>
            </div>}
          </div>
        </div>
      </div>
    </div>
    )})

    return (
      <div>
        <img src="logo.png" alt="logo" id="logo"/>
        <LinkButton id="signout" className="ui button" to="/signin" onClick={this.handleClick}>Sign Out</LinkButton>
        <img src="banner.jpg" alt="banner" id="banner"/>
        <div id="lobby">
          <div id="options">
            <form onSubmit={this.handleSubmit} id="create-campaign">
              <h3 className="options-header"> Create Your Own Campaign </h3><br></br>
              <div className="ui input focus">
                <input className="campaign-creation" id="campaign-name" onChange={this.handleChange} value={this.state.campaignName} placeholder="Campaign Name"/>
              </div><br></br>
              <div className="ui input focus">
                <input className="campaign-creation" id="campaign-password" type="password" onChange={this.handleChange} value={this.state.campaignPassword} placeholder="Campaign Password"/>
              </div><br></br>
              <input className="ui button" type="submit" value="Create!"/>
            </form>
            <div id="map-creator">
            <h3 className="options-header"> Create Your Own Map </h3><br></br>
              <LinkButton className="ui button" to="/mapcreator">Enter Map Creator</LinkButton>
            </div>
          </div>
          <h3 className="options-header"> Browse All Campaigns </h3><br></br>
          <div id="campaign-container">
            <div className="ui cards">
              {campaigns}
            </div>
          </div>
        </div>
      </div>
    )
  }
}

function mapStatetoProps(state) {
  return {
    currentUser: state.currentUser,
    campaigns: state.campaigns,
    openCampaign: state.openCampaign
  }
}

export default connect(mapStatetoProps, {addCampaign, checkCampaignPassword, deleteCampaign, openingCampaign, clearUser, getUserCharacters, getCampaignCharacters})(Lobby)
