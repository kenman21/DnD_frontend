import React from 'react'
import SavingThrow from './SavingThrow'

const SavingThrowContainer = (props) => {
  return(
    <div className="ui card savingthrow" id="savingthrows">
      <div className="content">
        <div className="header">Saving Throws</div>
      </div>
      <div className="content">
        <SavingThrow name="strength" title="Strength"/>
        <SavingThrow name="dexterity" title="Dexterity"/>
        <SavingThrow name="constitution" title="Constitution"/>
        <SavingThrow name="intelligence" title="Intelligence"/>
        <SavingThrow name="wisdom" title="Wisdom"/>
        <SavingThrow name="charisma" title="Charisma"/>
      </div>
    </div>
  )
}

export default SavingThrowContainer
