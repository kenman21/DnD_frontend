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
    <div className="card" key={campaign.id}>
      <div className="content">
        <div className="header">
          <p>{campaign.name}</p>
        </div>
          <div class="extra content">
            <div class="ui two buttons">
              {campaign.creator_id === this.props.currentUser.id ? <button className="ui button" onClick={() => this.props.deleteCampaign(campaign.id)}>Delete Campaign</button> : null}
              <button className="ui button" url={url} onClick={(e) => this.enterCampaign(e,campaign)}>
              {campaign.creator_id === this.props.currentUser.id ? "Open Your Campaign Page" : "Join This Campaign"}
              </button>
            </div>
        </div>
      </div>
    </div>
    )})

    return (
      <div>
        <LinkButton className="ui button" to="/signin" onClick={this.handleClick}>Sign Out</LinkButton>
        <form onSubmit={this.handleSubmit}>
          <label> Create Your Own Campaign </label><br></br>
          <input onChange={this.handleChange} value={this.state.campaignName} placeholder="New Campaign Name"/>
          <input type="submit"/>
        </form>
        <LinkButton className="ui button" to="/mapcreator">Map Creator</LinkButton>
        <h4>
        List of Campaigns
        </h4>
        <div class="ui cards">
        {campaigns}
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
