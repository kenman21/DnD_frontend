import React from 'react'
import Tile from './Tile'

let actions = []

let image = new Image();
image.src = "Page-1.png"

class Map extends React.Component {
  state = {
    grid_l: 50,
    grid_w: 50,
    tile_x: -1,
    tile_y: -1,
    canvas_x: -1,
    canvas_y: -1,
    canvas_x_end: -1,
    canvas_y_end: -1,
    divObj: {},
    actObj: {}
  }

  componentDidMount() {
    this.createCanvasLines()
    this.findDivs()
  }

  findDivs = () => {
    let divObj_copy = {}
    for (let i = 0 ; i <= 800; i+=16) {
      for (let j = 0 ; j <= 800; j+=16) {
        divObj_copy[`${i},${j}`] = document.getElementById(`${i},${j}`)
      }
    }
    this.setState({
      divObj: divObj_copy
    })
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

  creategrid(l, w, class_name, multiplier=16) {
    let grid_l = l
    let grid_w = w

    const grid = []
    for (let i = 0; i < grid_l; i++){
      const row = []
      for (let j = 0; j < grid_w; j++){
        row.push(
          <td onClick={(e) => this.handleClick(e)} className={class_name} key={`${i},${j}`} id={`${j*multiplier},${i*multiplier}`}>
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

  recordAction = (sx,sy,fx,fy) => {
     let action = {
       source_x : sx,
       source_y : sy,
       final_x : fx,
       final_y : fy
     }
     actions[`${fx}-${fy}`] = `${sx}-${sy}`
     if (!this.state.currentDrag.includes(action)) {
       this.setState({
        currentDrag: [...this.state.actions, action],
         actions: [...this.state.actions, action]
       })
     }
   }

  handleClick = (e) => {
    let x = parseInt(e.target.id.split(",")[0],10);
    let y = parseInt(e.target.id.split(",")[1],10)
    switch (e.target.className){
      case "tile-grid":
        this.setState({
          tile_x: x,
          tile_y: y
        }, () => {this.draw(e)})
        break
      case "canvas-grid":
        if (this.state.canvas_x === -1 && this.state.canvas_y === -1) {
          this.setState({
            canvas_x: x,
            canvas_y: y
          })
        } else {
          this.setState({
            canvas_x_end: x,
            canvas_y_end: y
          }, () => {this.actionOnRectangle(this.colorRed)})
        }
        break
      default:
        return console.log("error");
      }
  }

  order_points(x,y,xprime,yprime) {
    let draw_points = {
      x: [x, xprime],
      y: [y, yprime]
    }
    draw_points.x = draw_points.x.sort((a,b) => a-b).filter(value => value !== -1)
    draw_points.y = draw_points.y.sort((a,b) => a-b).filter(value => value !== -1)
    return draw_points
  }

  actionOnRectangle = (action, type=null) => {
    let draw_points = this.order_points(this.state.canvas_x, this.state.canvas_y, this.state.canvas_x_end, this.state.canvas_y_end)
    let action_obj = {}
    for (let i = draw_points.x[0] ; i <= draw_points.x[1]; i+=16) {
      for (let j = draw_points.y[0] ; j <= draw_points.y[1]; j+=16) {
        this.state.divObj[`${i},${j}`].style.backgroundColor = null
        action(i,j)
        if (type) {
          if (this.state.actObj[`${i},${j}`]){
            action_obj[`${i},${j}`] = this.state.actObj[`${i},${j}`]
            action_obj[`${i},${j}`].push({[type]: [this.state.tile_x, this.state.tile_y]})
            if (action_obj[`${i},${j}`].length > 2) {
              action_obj[`${i},${j}`] = action_obj[`${i},${j}`].slice(1)
            }
          } else {
            action_obj[`${i},${j}`] = [{[type]: [this.state.tile_x, this.state.tile_y]}]
          }
        }
      }
    }
    console.log(action_obj);
    return action_obj
  }

  colorRed = (i, j) => {
    this.state.divObj[`${i},${j}`].style.backgroundColor = "red"
  }

  clearRed = (i, j) => {
    this.state.divObj[`${i},${j}`].style.backgroundColor = null
  }

  draw = (e) => {
    let actions = {}
    if (this.state.canvas_x >= 0 && this.state.canvas_y >=0) {
      let draw_points = this.order_points(this.state.canvas_x, this.state.canvas_y, this.state.canvas_x_end, this.state.canvas_y_end)
      if (draw_points.x[1] >= 0 && draw_points.y[1] >= 0) {
        actions = this.actionOnRectangle(this.fillWithSprite, "draw")
    } else {
      this.fillWithSprite(this.state.canvas_x, this.state.canvas_y)
    }
    // Reset the state
      this.clearClicks()

      this.setState({
        actObj: {...this.state.actObj, ...actions}
      })
    }
  }

  clearClicks = () => {
    this.setState({
      canvas_x: -1,
      canvas_y: -1,
      canvas_x_end: -1,
      canvas_y_end: -1
    })
  }

  fillWithSprite = (i, j) => {
    let canvas = document.getElementById('canvas-1')
    let ctx = canvas.getContext('2d');
    ctx.drawImage(image,this.state.tile_x,this.state.tile_y,16,16,i+1,j+1,15,15);
  }

  erase = (e) => {
    let canvas = document.getElementById('canvas-1');
    let ctx = canvas.getContext('2d');
    ctx.beginPath();
    let draw_points = this.order_points(this.state.canvas_x, this.state.canvas_y, this.state.canvas_x_end, this.state.canvas_y_end)
    if (draw_points.x[1] >= 0 && draw_points.y[1] >= 0) {
      let actions = this.actionOnRectangle((i,j) => {ctx.clearRect(i+1,j+1,15,15)}, "erase");
    } else {
      ctx.clearRect(this.state.canvas_x+1,this.state.canvas_y+1,15,15);
    }
    this.clearClicks
    this.setState({
      actObj: {...this.state.actObj, ...actions}
    })
  }

  render() {
    // console.log(this.state.actObj);
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
        <button className="right" onClick={this.erase}>Erase</button>
      </div>
    )
  }
}

export default Map
