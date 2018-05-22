import React from 'react'
import SavingThrow from './SavingThrow'

const SavingThrowContainer = (props) => {
  return(
    <div className="ui card savingthrow" id="savingthrows">
      <div className="content">
        <div className="header">Saving Throws</div>
      </div>
      <div className="content">
        <SavingThrow name="Strength"/>
        <SavingThrow name="Dexterity"/>
        <SavingThrow name="Constitution"/>
        <SavingThrow name="Intelligence"/>
        <SavingThrow name="Wisdom"/>
        <SavingThrow name="Charisma"/>
      </div>
    </div>
  )
}

export default SavingThrowContainer
