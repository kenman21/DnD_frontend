import React from 'react'
import Tile from './Tile'

class Map extends React.Component {
  state = {
    grid_l: 50,
    grid_w: 50,
    tile_x: null,
    tile_y: null,
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
    // let map_hw = pixel_size * map_res;
    let map_hw = pixel_size * map_res;
    let p = 0;
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
  //   let canvas = document.getElementById('canvas-1')
  //   canvas.width = 788;
  //   canvas.height= 788;
  //   let ctx = canvas.getContext('2d');
  //   let image = new Image();
  //   image.src = "/0x72_16x16DungeonTileset.v4.png"
  //   let x = 16 * 4
  //   let y = 16 * 0
  //   ctx.drawImage(image,x,y,16,16,0,0,32,32);
  // }

  handleClick = (e) => {
    switch (e.target.className){
      case "tile-grid":
        this.setState({
          tile_x: parseInt(e.target.id.split(",")[0],10),
          tile_y: parseInt(e.target.id.split(",")[1],10)
        })
        break
      case "canvas-grid":
        this.draw(e)
        break
      default:
        return console.log("error");
      }

  }

  draw = (e) => {
      if (this.state.tile_x && this.state.tile_y) {
      let map_x = parseInt(e.target.id.split(",")[0],10)
      let map_y = parseInt(e.target.id.split(",")[1],10)
      let canvas = document.getElementById('canvas-1')
      let ctx = canvas.getContext('2d');
      let image = new Image();
      image.src = "Page-1.png"
      ctx.drawImage(image,this.state.tile_x,this.state.tile_y,16,16,map_x,map_y,16,16);
    }
  }

  creategrid(l, w, class_name, multiplier=16) {
    let grid_l = l
    let grid_w = w

    const grid = []
    for (let i = 0; i < grid_l; i++){
      const row = []
      for (let j = 0; j < grid_w; j++){
        row.push(
          <td draggable onDragOver = {(e) => this.draw(e)} onClick={(e) => this.handleClick(e)} className={class_name} key={`${i},${j}`} id={`${j*multiplier},${i*multiplier}`}>
            <Tile/>
          </td>
        )
      }
      let parent=`${class_name}` + "-parent"
      grid.push(
        <tr key={`${i}`} className={parent}>
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
          <table id="map-grid" cellSpacing="0" cellPadding="0">
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
