import React from 'react'

class Tile extends React.Component {
  render() {
    return (
      <div onClick={() => console.log("click")}>
      </div>
    )
  }
}

export default Tile
