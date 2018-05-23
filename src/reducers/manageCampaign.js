let defaultState = {
  currentUser: {},
  currentUserMaps: [],
  currentUserCharacters: [],
  openMap: null,
  campaigns: [],
  openCampaign: {},
  editing: false,
  actObj: {},
  charSheet: {
  acrobaticschecked: "",
  animalhandlingchecked:"",
  arcanachecked:"",
  athleticschecked:"",
  deceptionchecked:"",
  historychecked:"",
  insightchecked:"",
  intimidationchecked:"",
  investigationchecked:"",
  medicinechecked:"",
  naturechecked:"",
  perceptionchecked:"",
  performancechecked:"",
  persuasionchecked:"",
  religionchecked:"",
  sleightofHandchecked:"",
  stealthchecked:"",
  survivalchecked:"",
  alignment:"",
  armorclassvalue:"",
  as_atkb_1:"",
  as_atkb_2:"",
  as_atkb_3:"",
  as_name_1:"",
  as_name_2:"",
  as_name_3:"",
  as_type_1:"",
  as_type_2:"",
  as_type_3:"",
  attacks_spellcastingnotes:"",
  background:"",
  bondsnotes:"",
  charismabase:"",
  charismamod:"",
  class_level:"",
  constitutionbase:"",
  constitutionmod:"",
  d1_checkbox:"",
  d2_checkbox:"",
  d3_checkbox:"",
  dexteritybase:"",
  dexteritymod:"",
  equipmentnotes:"",
  experience_points:"",
  faction:"",
  features_traitsnotes:"",
  hit_dicevalue:"",
  hit_pointsbase:"",
  hit_pointsmod:"",
  idealsnotes:"",
  initiativevalue:"",
  inspirationvalue:"",
  intelligencebase:"",
  intelligencemod:"",
  other_proficienciesnotes:"",
  passive_wisdomvalue:"",
  personality_traitsnotes:"",
  player_name:"",
  proficiencyvalue:"",
  race:"",
  s1_checkbox:"",
  s2_checkbox:"",
  s3_checkbox:"",
  speedvalue:"",
  strengthbase:"",
  strengthmod:"",
  temp_hit_pointsvalue:"",
  wisdombase:"",
  wisdommod:""}
}

export default function manageCampaign(state = defaultState, action) {
  // console.log(action);
  switch (action.type) {
    case 'LOGIN_PLAYER':
      return {...state, currentUser: action.payload}
    case 'SET_CAMPAIGNS':
      return {...state, campaigns: action.payload}
    case 'CREATE_CAMPAIGN':
      return {...state, campaigns: [...state.campaigns, action.payload]}
    case 'DELETE_CAMPAIGN':
      let new_campaigns = state.campaigns.filter(campaign => campaign.id !== action.payload)
      return {...state, campaigns: new_campaigns}
    case 'OPEN_CAMPAIGN':
      return {...state, openCampaign: action.payload}
    case 'OPEN_MAP':
      return {...state, openMap: action.payload}
    case 'ADD_ACTION':
      return {...state, actObj: {...state.actObj, ...action.payload}}
    case 'CLEAR_ACTIONS':
      return {...state, actObj: {}}
    case 'SET_USER_MAPS':
      return {...state, currentUserMaps: [...action.payload]}
    case 'SET_USER_CHARACTERS':
      return {...state, currentUserCharacters: action.payload}
    case 'TOGGLE_EDITING':
      return {...state, editing: !state.editing}
    case 'OPEN_CHARACTER':
      return {...state, openCharacter: action.payload}
    case 'SET_STAT':
      let key = Object.keys(action.payload)[0]
      let value = Object.values(action.payload)[0]
      debugger
      return {...state, charSheet: {...state.charSheet, [key]: value}};
    default:
      return state;
  }
};
