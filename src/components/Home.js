import React from 'react'
import {connect} from 'react-redux'

const URL = 'http://localhost:3000/api/v1/'

class Home extends React.Component {
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
    fetch(URL + 'campaigns', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: this.state.campaignName,
        creator_id: this.props.currentUser.id
      })
    }).then(res => res.json()).then((json) => {
        this.props.addCampaign(json)
        this.setState({
          campaignName: ""
        })
    })
  }

  handleClick = (id) => {
      fetch(URL + `campaigns/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify({
        campaign_id: id,
      })
    }).then(this.props.deleteCampaign(id))
  }

  render() {
    let campaigns = this.props.campaigns.map(campaign => {
      return(
    <div key={campaign.id}>
      <p>{campaign.name}</p>
      <button onClick={() => this.handleClick(campaign.id)}>Delete Campaign</button>
      {campaign.creator_id === this.props.currentUser.id ? <button onClick={this.props.renderContent}>Open Your Campaign Page</button>: <button>Join This Campaign</button>}
    </div>
    )})

    return (
      <div>
        {this.props.rendering_content ? <div> Content </div> :
        <div>
          <form onSubmit={this.handleSubmit}>
            <label> Create Your Own Campaign </label><br></br>
            <input onChange={this.handleChange} value={this.state.campaignName} placeholder="New Campaign Name"/>
            <input type="submit"/>
          </form>
          <h4>
          List of Campaigns
          </h4>
          <ul>
          {campaigns}
          </ul>
        </div>
      }
      </div>
    )
  }
}

function mapStatetoProps(state) {
  return {
    currentUser: state.currentUser,
    campaigns: state.campaigns,
    rendering_content: state.rendering_content
  }
}

function mapDispatchtoProps(dispatch) {
  return{
    addCampaign: (campaign) => {
      dispatch({type: 'CREATE_CAMPAIGN', payload: campaign})
    },
    deleteCampaign: (id) => {
      dispatch({type: 'DELETE_CAMPAIGN', payload: id})
    },
    renderContent: () => {
      dispatch({type: 'RENDER_CONTENT'})
    }
  }
}



export default connect(mapStatetoProps, mapDispatchtoProps)(Home)
