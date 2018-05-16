// import React from 'react'
// import {connect} from 'react-redux'
// // import {Redirect} from 'react-router-dom';
// import Lobby from './Lobby'
// import Content from './Content'
// import MapCreator from './MapCreator'
//
// const PageRouter = (props) => {
//   return (
//     <div>
//       {props.rendering_content ? <Content/> : null}
//       {props.rendering_mapcreator ? <MapCreator/> : null}
//       {!props.rendering_content && !props.rendering_mapcreator ? <Lobby/> : null}
//     </div>
//   )
// }
//
// function mapStatetoProps(state) {
//   return {
//     currentUser: state.currentUser,
//     rendering_content: state.rendering_content,
//     rendering_mapcreator: state.rendering_mapcreator
//   }
// }
//
// export default connect(mapStatetoProps)(PageRouter)
