let defaultState = {
  currentUser: {},
  currentUserMaps: [],
  currentUserCharacters: [],
  openMap: null,
  campaigns: [],
  openCampaign: {},
  openCampaignCharacters: [],
  openSession: {},
  actObj: {},
  openChatroom: {},
  chatMessages: [],
  openTileSheet: 1,
  charSheet: {
  acrobaticschecked: false,
  animalhandlingchecked:false,
  arcanachecked:false,
  athleticschecked:false,
  deceptionchecked:false,
  historychecked:false,
  insightchecked:false,
  intimidationchecked:false,
  investigationchecked:false,
  medicinechecked:false,
  naturechecked:false,
  perceptionchecked:false,
  performancechecked:false,
  persuasionchecked:false,
  religionchecked:false,
  sleightofHandchecked:false,
  stealthchecked:false,
  survivalchecked:false,
  alignment:"",
  armorclassvalue:0,
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
  charismabase:0,
  charismamod:0,
  char_name: "",
  class_level:"",
  constitutionbase:0,
  constitutionmod:0,
  d1_checkbox:false,
  d2_checkbox:false,
  d3_checkbox:false,
  dexteritybase:0,
  dexteritymod:0,
  equipmentnotes:"",
  experience_points:"",
  faction:"",
  features_traitsnotes:"",
  hit_dicevalue:0,
  hit_pointsbase:0,
  hit_pointsmod:0,
  idealsnotes:"",
  initiativevalue:0,
  inspirationvalue:0,
  intelligencebase:0,
  intelligencemod:0,
  other_proficienciesnotes:"",
  passive_wisdomvalue:0,
  personality_traitsnotes:"",
  player_name:"",
  proficiencyvalue:0,
  race:"",
  s1_checkbox:false,
  s2_checkbox:false,
  s3_checkbox:false,
  speedvalue:0,
  strengthbase:0,
  strengthmod:0,
  temp_hit_pointsvalue:0,
  wisdombase:0,
  wisdommod:0,
  strengthcheckbox: false,
  dexteritycheckbox: false,
  constitutioncheckbox: false,
  intelligencecheckbox: false,
  wisdomcheckbox: false,
  charismacheckbox: false
  }
}

let defaultSheet = {
acrobaticschecked: false,
animalhandlingchecked:false,
arcanachecked:false,
athleticschecked:false,
deceptionchecked:false,
historychecked:false,
insightchecked:false,
intimidationchecked:false,
investigationchecked:false,
medicinechecked:false,
naturechecked:false,
perceptionchecked:false,
performancechecked:false,
persuasionchecked:false,
religionchecked:false,
sleightofHandchecked:false,
stealthchecked:false,
survivalchecked:false,
alignment:"",
armorclassvalue:0,
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
charismabase:0,
charismamod:0,
char_name: "",
class_level:"",
constitutionbase:0,
constitutionmod:0,
d1_checkbox:false,
d2_checkbox:false,
d3_checkbox:false,
dexteritybase:0,
dexteritymod:0,
equipmentnotes:"",
experience_points:"",
faction:"",
features_traitsnotes:"",
hit_dicevalue:0,
hit_pointsbase:0,
hit_pointsmod:0,
idealsnotes:"",
initiativevalue:0,
inspirationvalue:0,
intelligencebase:0,
intelligencemod:0,
other_proficienciesnotes:"",
passive_wisdomvalue:0,
personality_traitsnotes:"",
player_name:"",
proficiencyvalue:0,
race:"",
s1_checkbox:false,
s2_checkbox:false,
s3_checkbox:false,
speedvalue:0,
strengthbase:0,
strengthmod:0,
temp_hit_pointsvalue:0,
wisdombase:0,
wisdommod:0,
strengthcheckbox: false,
dexteritycheckbox: false,
constitutioncheckbox: false,
intelligencecheckbox: false,
wisdomcheckbox: false,
charismacheckbox: false
}

export default function manageCampaign(state = defaultState, action) {
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
    case 'SET_STAT':
      let key = Object.keys(action.payload)[0]
      let value = Object.values(action.payload)[0]
      return {...state, charSheet: {...state.charSheet, [key]: value}};
    case 'SET_ALL_STATS':
      return {...state, charSheet: {...state.charSheet, ...action.payload}}
    case 'CLEAR_STATS':
      return {...state, charSheet: defaultSheet}
    case 'SET_CAMPAIGN_CHARACTERS':
      return {...state, openCampaignCharacters: [...action.payload]}
    case 'CHANGE_TILE_SHEET':
      switch (action.payload){
        case 'right':
          return {...state, openTileSheet: state.openTileSheet+1}
        case 'left':
          return {...state, openTileSheet: state.openTileSheet-1}
      }
    case 'SET_SESSION':
      return {...state, openSession: action.payload}
    case 'CLEAR_HIGHLIGHT':
      return {...state, openSession: {...state.openSession, start_x: null, start_y: null, end_x: null, end_y: null}}
    case 'SET_OPEN_CHATROOM':
      return {...state, openChatroom: action.payload}
    case 'SET_MESSAGES':
      return {...state, chatMessages: action.payload}
    default:
      return state;
  }
};
