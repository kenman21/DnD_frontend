import React from 'react'
// import Map from './Map.js'
import {connect} from 'react-redux'
import {addCampaign, deleteCampaign} from '../actions/fetch_actions.js'
import {renderContent, renderMapCreator} from '../actions/actions.js'

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

  handleClick = (campaign) => {
    localStorage.openCampaign = JSON.stringify(campaign)
    this.props.history.push("/campaignpage")
  }

  render() {
    let campaigns = this.props.campaigns.map(campaign => {
      return(
    <div key={campaign.id}>
      <p>{campaign.name}</p>
      <button onClick={() => this.props.deleteCampaign(campaign.id)}>Delete Campaign</button>
      {campaign.creator_id === JSON.parse(localStorage.currentUser).id ?
        <button onClick={() => this.handleClick(campaign)}>Open Your Campaign Page</button>:
        <button onClick={() => this.handleClick(campaign)}>Join This Campaign</button>}
    </div>
    )})

    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <label> Create Your Own Campaign </label><br></br>
          <input onChange={this.handleChange} value={this.state.campaignName} placeholder="New Campaign Name"/>
          <input type="submit"/>
        </form>
        <button onClick={() => this.props.history.push("/mapcreator")}></button>
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

export default connect(mapStatetoProps, {addCampaign, deleteCampaign})(Lobby)
