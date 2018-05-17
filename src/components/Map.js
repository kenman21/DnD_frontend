import React from 'react'
import Tile from './Tile'

class Map extends React.Component {
  state = {
    grid_l: 50,
    grid_w: 50,
    map : {

    }
  }

  componentDidMount() {
    this.createCanvasLines()
    }

  createCanvasLines = () => {
    let canvas = document.getElementById('canvas-1')
    // Visible Canvas Width
    let map_res = 50
    let pixel_size = 16
    let map_hw = pixel_size * map_res;
    let p = 10;
    canvas.width = map_hw+2*p;
    canvas.height= map_hw+2*p;
    let ctx = canvas.getContext('2d');
    for (let x = 0; x <= map_hw; x += 16) {
      ctx.moveTo(0.5 + x + p, p);
      ctx.lineTo(0.5 + x + p, map_hw + p);
      }


    for (let x = 0; x <= map_hw; x += 16) {
        ctx.moveTo(p, 0.5 + x + p);
        ctx.lineTo(map_hw + p, 0.5 + x + p);
      }

    ctx.strokeStyle = "grey";
    ctx.stroke();
  }
  //
  // handleClick = () => {
  //   let canvas = document.getElementById('canvas-2')
  //   canvas.width = 788;
  //   canvas.height= 788;
  //   let ctx = canvas.getContext('2d');
  //   let image = new Image();
  //   image.src = "/0x72_16x16DungeonTileset.v4.png"
  //   let x = 16 * 4
  //   let y = 16 * 0
  //   ctx.drawImage(image,x,y,16,16,0,0,32,32);
  // }

  handleClick = () => {
    console.log("click")
  }

  creategrid(l, w, class_name, multiplier=1) {
    let grid_l = l
    let grid_w = w

    const grid = []
    for (let i = 0; i < grid_l; i++){
      const row = []
      for (let j = 0; j < grid_w; j++){
        row.push(
          <td onClick={this.handleClick} className={class_name} key={`${i},${j}`} id={`${j*multiplier},${i*multiplier}`}>
            <Tile/>
          </td>
        )
      }
      grid.push(
        <tr key={`${i}`}>
          { row }
        </tr>
      )
    }
    return grid
  }

  render() {

    return (
      <div id="canvas-container">
        <canvas id="canvas-1" >
        </canvas>
        <div className="center table">
          <table id="map-grid">
            <tbody id="map-body">
              { this.creategrid(this.state.grid_l,this.state.grid_w,"canvas-grid") }
            </tbody>
          </table>
        </div>
        <div className="right">
          <img src="Page-1.png" alt="Page-1" id="Page-1"/>
          <div className="right tileMap">
            <table id="tileMap-grid">
              <tbody id="tileMap-body">
                { this.creategrid(16,16,"tile-grid", 16) }
              </tbody>
            </table>
          </div>
        </div>
      </div>
    )
  }
}

export default Map
