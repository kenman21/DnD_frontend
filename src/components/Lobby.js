import React from 'react'
import {connect} from 'react-redux'
import {addCampaign, deleteCampaign} from '../actions/fetch_actions.js'
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

  render() {
    let campaigns = this.props.campaigns.map(campaign => {
      let url = "/campaign/" + campaign.id
      return(
    <div key={campaign.id}>
      <p>{campaign.name}</p>
      <button onClick={() => this.props.deleteCampaign(campaign.id)}>Delete Campaign</button>
      <LinkButton to={url} onClick={() => this.props.openCampaign(campaign)}>
      {campaign.creator_id === this.props.currentUser.id ? "Open Your Campaign Page" : "Join This Campaign"}
      </LinkButton>
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
        <ul>
        {campaigns}
        </ul>
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

export default connect(mapStatetoProps, {addCampaign, deleteCampaign, openCampaign, clearUser})(Lobby)
