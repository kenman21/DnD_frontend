import React from 'react'
import {connect} from 'react-redux'
import {addCampaign, deleteCampaign, getUserCharacters, getCampaignCharacters} from '../actions/fetch_actions.js'
import {openingCampaign, clearUser} from '../actions/actions.js'
import LinkButton from './LinkButton'

class Lobby extends React.Component {
  state = {
    campaignName: ""
  }

  handleChange = (e) => {
    this.setState({
      campaignName: e.target.value
    })
  }

  handleSubmit = (e) => {
    e.preventDefault()
    this.props.addCampaign(this.state.campaignName, this.props.currentUser.id)
    this.setState({
      campaignName: ""
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
      // SET CHARACTERS DEPENDING ON WHETHER THIS IS PLAYER VS DM
      campaign.creator_id === this.props.currentUser.id ?
      this.props.getCampaignCharacters(this.props.openCampaign.id):
      this.props.getUserCharacters(this.props.currentUser, this.props.openCampaign)
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
          {campaign.creator_id === this.props.currentUser.id ? <div className="deletec"><button className="ui button delete" onClick={() => this.props.deleteCampaign(campaign.id)}>Delete Campaign</button></div> : null}
          <div className="openc"><button className="ui button open" url={url} onClick={(e) => this.enterCampaign(e,campaign)}>
          {campaign.creator_id === this.props.currentUser.id ? "Open Campaign" : "Join Campaign"}
          </button></div>
        </div>
      </div>
    </div>
    )})

    return (
      <div>
        <img src="logo.png" alt="logo" id="logo"/>
        <LinkButton id="signout" className="ui button" to="/signin" onClick={this.handleClick}>Sign Out</LinkButton>
        <div id="lobby">
          <div id="options">
            <form onSubmit={this.handleSubmit} id="create-campaign">
              <h4> Create Your Own Campaign </h4><br></br>
              <div className="ui input focus">
                <input onChange={this.handleChange} value={this.state.campaignName} placeholder="Campaign Name"/>
              </div>
              <input className="ui button" type="submit" value="Create!"/>
            </form>
            <div id="map-creator">
              <LinkButton className="ui button" to="/mapcreator">Enter Map Creator</LinkButton>
            </div>
          </div>
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

export default connect(mapStatetoProps, {addCampaign, deleteCampaign, openingCampaign, clearUser, getUserCharacters, getCampaignCharacters})(Lobby)
