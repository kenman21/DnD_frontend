import React from 'react'

class DeathSaves extends React.Component {
  render() {
    return (
      <div className="ui card deathsaves" id="deathsaves">
        <div className="content deathsaves-header">
          <div className="header">Death-Saves</div>
        </div>
        <div className="content deathsaves-content">
          <div id="successes">
            <label>Successes</label>
            <input type="checkbox"/>
            <input type="checkbox"/>
            <input type="checkbox"/><br></br>
          </div>
          <div id="deaths">
            <label>Deaths</label>
            <input type="checkbox"/>
            <input type="checkbox"/>
            <input type="checkbox"/>
          </div>
        </div>
      </div>
    )
  }
}

export default DeathSaves
