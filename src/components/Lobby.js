import React from 'react'
import {connect} from 'react-redux'
import {addCampaign, deleteCampaign, getUserCharacters} from '../actions/fetch_actions.js'
import {openCampaign, clearUser} from '../actions/actions.js'
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
      this.props.openCampaign(campaign)
      resolve()
    })
    promise.then((e) => {console.log("getting characters");this.props.getUserCharacters(this.props.currentUser, this.props.openCampaign)}).then(()=> {console.log("changing page");this.props.history.push(url)})
    localStorage.openCampaign = JSON.stringify(campaign)
  }

  render() {

    let campaigns = this.props.campaigns.map(campaign => {
      let url = "/campaign/" + campaign.id
      return(
    <div key={campaign.id}>
      <p>{campaign.name}</p>
      <button onClick={() => this.props.deleteCampaign(campaign.id)}>Delete Campaign</button>
      <button url={url} onClick={(e) => this.enterCampaign(e,campaign)}>
      {campaign.creator_id === this.props.currentUser.id ? "Open Your Campaign Page" : "Join This Campaign"}
      </button>
    </div>
    )})

    return (
      <div>
        <LinkButton to="/signin" onClick={this.handleClick}>Sign Out</LinkButton>
        <form onSubmit={this.handleSubmit}>
          <label> Create Your Own Campaign </label><br></br>
          <input onChange={this.handleChange} value={this.state.campaignName} placeholder="New Campaign Name"/>
          <input type="submit"/>
        </form>
        <LinkButton to="/mapcreator">Map Creator</LinkButton>
        <h4>
        List of Campaigns
        </h4>
        {campaigns}
      </div>
    )
  }
}

function mapStatetoProps(state) {
  return {
    currentUser: state.currentUser,
    campaigns: state.campaigns,
  }
}

export default connect(mapStatetoProps, {addCampaign, deleteCampaign, openCampaign, clearUser, getUserCharacters})(Lobby)
