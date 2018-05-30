import React from 'react'
import Tile from './Tile'
import { addAction, toggleEditing, changeTileSheet} from '../actions/actions.js'
import {connect} from 'react-redux'

let image = new Image();

class MapContainer extends React.Component {
  state = {
    pixel_size: window.screen.width > 1440 ? 16:14,
    grid_l: 50,
    grid_w: 50,
    tile_x: -1,
    tile_y: -1,
    canvas_x: -1,
    canvas_y: -1,
    canvas_x_end: -1,
    canvas_y_end: -1,
    divObj: {},
    imageObj: {},
    drag_start: -1,
    drag_end: -1
  }

  componentDidMount() {
    this.findDivs()
    this.createCanvasLines()
    this.createImages()
    document.addEventListener("keydown", this.wipeClicks)
  }

  componentWillUnmount = () => {
    document.removeEventListener("keydown", this.wipeClicks)
  }

  wipeClicks = (e) => {
    if (e.which === 27) {
      this.actionOnRectangle(this.clearRed)
      this.clearClicks()
    }
  }

  /////////METHODS FOR SETTING UP THE MAP CANVAS AND TILES/////////////

  createImages = () => {
    let obj = {}

    for (let i = 1; i < 37; i ++) {
      obj["image-" + `${i}`] = new Image()
      obj["image-" + `${i}`].src = `/Page-${i}.png`
    }
    this.setState({
      imageObj: obj
    })
  }

  findDivs = () => {
    let divObj_copy = {}
    for (let i = 0 ; i <= this.state.pixel_size*this.state.grid_l; i+=this.state.pixel_size) {
      for (let j = 0 ; j <= this.state.pixel_size*this.state.grid_l; j+=this.state.pixel_size) {
        divObj_copy[`${i},${j}`] = document.getElementById(`${i},${j}`)
      }
    }
    this.setState({
      divObj: divObj_copy
    })
  }

  createCanvasLines = () => {
    let canvas = document.getElementById('canvas-1')
    canvas.style.border= "2px solid grey";
    // Visible Canvas Width
    let map_hw = this.state.pixel_size * this.state.grid_l;
    let p = 0;
    canvas.width = map_hw+2*p;
    canvas.height= map_hw+2*p;
    let ctx = canvas.getContext('2d');
    for (let x = 0; x <= map_hw; x += this.state.pixel_size) {
      ctx.moveTo(0.5 + x + p, p);
      ctx.lineTo(0.5 + x + p, map_hw + p);
    }
    for (let x = 0; x <= map_hw; x += this.state.pixel_size) {
      ctx.moveTo(p, 0.5 + x + p);
      ctx.lineTo(map_hw + p, 0.5 + x + p);
    }
    ctx.strokeStyle = "grey";
    ctx.stroke();
  }

  creategrid(l, w, class_name) {
    let grid_l = l
    let grid_w = w

    const grid = []
    for (let i = 0; i < grid_l; i++){
      const row = []
      for (let j = 0; j < grid_w; j++){
        row.push(
          <td draggable onDragOver = {(e) => e.preventDefault()} onDrop={this.handleonDrop} onClick={(e) => this.handleClick(e)} onDragStart={this.handleDragStart} onDragEnter={this.handleDragEnter} className={class_name} key={`${i},${j}`} id={`${j*this.state.pixel_size},${i*this.state.pixel_size}`}>
          <Tile/>
          </td>
        )
      }
      let parent =`${class_name}` + "-parent"
      grid.push(
        <tr key={`${i}`} className={parent}>
        { row }
        </tr>
      )
    }
    return grid
  }

  //////////////////////////////////////////////////////////////
  /////////////METHODS FOR CONTROLLING THE DRAWING/////////////

  handleonDrop = (e) => {
    if (e.target.className ==="tile-grid"){
      this.clearClicks()
    }
  }

  handleDragStart = (e) => {
    if (e.target.className ==="tile-grid"){
      let x = parseInt(e.target.id.split(",")[0],10);
      let y = parseInt(e.target.id.split(",")[1],10);
      this.setState({
        tile_x: x,
        tile_y: y
      })
    }
  }

  handleDragEnter = (e) => {
    if (e.target.className ==="tile-grid" && this.state.tile_x !== -1){
      let x = parseInt(e.target.id.split(",")[0],10);
      let y = parseInt(e.target.id.split(",")[1],10);
      let diffx = x - this.state.tile_x;
      let diffy = y - this.state.tile_y;
      this.setState({
        tile_x: x,
        tile_y: y,
        canvas_x: this.state.canvas_x + diffx,
        canvas_y: this.state.canvas_y + diffy,
      }, () => {this.dragDraw()})
    }
  }

  dragDraw = () => {
    let actions = {}
    this.fillWithSprite(this.state.canvas_x, this.state.canvas_y)
    actions = this.record(this.state.canvas_x, this.state.canvas_y, "draw")
    this.props.addAction(actions)
  }

  handleClick = (e) => {
    let x = parseInt(e.target.id.split(",")[0],10);
    let y = parseInt(e.target.id.split(",")[1],10)
    switch (e.target.className){
      case "tile-grid":
        if (this.state.tile_x === -1 && this.state.tile_y === -1) {
          this.setState({
            tile_x: x,
            tile_y: y
          }, () => {this.draw(e)})
        }
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
          }, () => {
            this.actionOnRectangle(this.colorRed);
            this.props.passToCreator(this.state.canvas_x, this.state.canvas_y, this.state.canvas_x_end, this.state.canvas_y_end)
            })
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

  actionOnRectangle = (action=null, type=null) => {
    let draw_points = this.order_points(this.state.canvas_x, this.state.canvas_y, this.state.canvas_x_end, this.state.canvas_y_end)
    let action_obj = {}
    for (let i = draw_points.x[0] ; i <= draw_points.x[1]; i+=this.state.pixel_size) {
      for (let j = draw_points.y[0] ; j <= draw_points.y[1]; j+=this.state.pixel_size) {
        this.clearRed(i,j)
        if (action) {
          action(i,j)
        }
        if (type) {
          if (this.props.actObj[`${i},${j}`]){
            action_obj[`${i},${j}`] = this.props.actObj[`${i},${j}`].slice()
            if (this.state.pixel_size == 14) {
              action_obj[`${i},${j}`].push({[type]: [this.state.tile_x*16/14, this.state.tile_y*16/14, i*16/14, j*16/14, this.props.openTileSheet]})
            }else {
              action_obj[`${i},${j}`].push({[type]: [this.state.tile_x, this.state.tile_y, i , j, this.props.openTileSheet]})
            }
            if (action_obj[`${i},${j}`].length > 2) {
              action_obj[`${i},${j}`] = action_obj[`${i},${j}`].slice(1)
            }
          } else {
            if (this.state.pixel_size == 14) {
              action_obj[`${i},${j}`] = [{[type]: [this.state.tile_x*16/14, this.state.tile_y*16/14, i*16/14, j*16/14, this.props.openTileSheet]}]
            } else {
              action_obj[`${i},${j}`] = [{[type]: [this.state.tile_x, this.state.tile_y, i, j, this.props.openTileSheet]}]
            }
          }
        }
      }
    }
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
        actions = this.record(this.state.canvas_x, this.state.canvas_y, "draw")
      }
    // Reset the state
      this.clearClicks()
      this.props.addAction(actions)
    }
  }

  erase = (e) => {
    let actions = {}
    let draw_points = this.order_points(this.state.canvas_x, this.state.canvas_y, this.state.canvas_x_end, this.state.canvas_y_end)
    if (draw_points.x[1] >= 0 && draw_points.y[1] >= 0) {
      actions = this.actionOnRectangle(this.fillWithWhite, "erase");
    } else {
      this.fillWithWhite(this.state.canvas_x,this.state.canvas_y,15,15);
      actions = this.record(this.state.canvas_x, this.state.canvas_y, "erase");
    }
    this.clearClicks()
    this.props.addAction(actions)
  }

  fillWithSprite = (i, j, x = this.state.tile_x, y = this.state.tile_y, sheet = this.props.openTileSheet) => {
    let canvas = document.getElementById('canvas-1')
    let ctx = canvas.getContext('2d');
    if (this.state.pixel_size == 14) {
      ctx.drawImage(this.state.imageObj["image-" + `${sheet}`],x*16/14,y*16/14,this.state.pixel_size*16/14,this.state.pixel_size*16/14,i+1,j+1,this.state.pixel_size-1,this.state.pixel_size-1);
    } else {
      ctx.drawImage(this.state.imageObj["image-" + `${sheet}`],x,y,this.state.pixel_size,this.state.pixel_size,i+1,j+1,this.state.pixel_size-1,this.state.pixel_size-1);
    }
  }

  fillWithWhite = (i, j) => {
    let canvas = document.getElementById('canvas-1');
    let ctx = canvas.getContext('2d');
    ctx.beginPath();
    ctx.clearRect(i+1,j+1,this.state.pixel_size-1,this.state.pixel_size-1)
  }

  record = (i, j, type) => {
    let action_obj = {}
    if (this.props.actObj[`${i},${j}`]){
      action_obj[`${i},${j}`] = this.props.actObj[`${i},${j}`].slice()
      if (this.state.pixel_size == 14) {
        action_obj[`${i},${j}`].push({[type]: [this.state.tile_x*16/14, this.state.tile_y*16/14, i*16/14, j*16/14, this.props.openTileSheet]})
      }else {
        action_obj[`${i},${j}`].push({[type]: [this.state.tile_x, this.state.tile_y, i , j, this.props.openTileSheet]})
      }
      if (action_obj[`${i},${j}`].length > 2) {
        action_obj[`${i},${j}`] = action_obj[`${i},${j}`].slice(1)
      }
    } else {
      if (this.state.pixel_size == 14) {
        action_obj[`${i},${j}`] = [{[type]: [this.state.tile_x*16/14, this.state.tile_y*16/14, i*16/14, j*16/14, this.props.openTileSheet]}]
      }else {
        action_obj[`${i},${j}`] = [{[type]: [this.state.tile_x, this.state.tile_y, i , j, this.props.openTileSheet]}]
      }
    }
    return action_obj
  }

  clearClicks = () => {
    // this.props.editing ? this.props.toggleEditing():null
    this.setState({
      canvas_x: -1,
      canvas_y: -1,
      canvas_x_end: -1,
      canvas_y_end: -1,
      tile_x: -1,
      tile_y: -1
    })
  }

  componentDidUpdate = (prevProps, prevState) => {
    if (this.props.openMap) {
      document.getElementById('canvas-1').style.visibility = "visible"
    }
    if (prevProps.openMap !== this.props.openMap || this.props.openSession !== prevProps.openSession) {
      for (let i = 0 ; i <= this.state.pixel_size*this.state.grid_l; i+=this.state.pixel_size) {
        for (let j = 0 ; j <= this.state.pixel_size*this.state.grid_l; j+=this.state.pixel_size) {
          this.fillWithWhite(i,j)
        }
      }
      if (this.props.openMap && this.props.openMap.slots) {
        for (let i=0; i<this.props.openMap.slots.length; i++) {
          let action = this.props.openMap.slots[i]
          if (this.props.openSession && !this.props.openSession.start_x) {
            if (this.state.pixel_size == 14) {
              this.fillWithSprite(action.canvas_x*14/16, action.canvas_y*14/16, action.tile_x*14/16, action.tile_y*14/16, action.sheet)
            }else{
              this.fillWithSprite(action.canvas_x, action.canvas_y, action.tile_x, action.tile_y, action.sheet)
            }
          } else {
            if (this.props.currentUser.id === this.props.openCampaign.creator_id) {
              if (this.state.pixel_size == 14) {
                this.fillWithSprite(action.canvas_x*14/16, action.canvas_y*14/16, action.tile_x*14/16, action.tile_y*14/16, action.sheet)
              }else{
                this.fillWithSprite(action.canvas_x, action.canvas_y, action.tile_x, action.tile_y, action.sheet)
              }
            }
            if (action.canvas_x >= this.props.openSession.start_x && action.canvas_x <= this.props.openSession.end_x && action.canvas_y >= this.props.openSession.start_y && action.canvas_y <= this.props.openSession.end_y){
              if (this.state.pixel_size == 14) {
                this.fillWithSprite(action.canvas_x*14/16, action.canvas_y*14/16, action.tile_x*14/16, action.tile_y*14/16, action.sheet)
              }else{
                this.fillWithSprite(action.canvas_x, action.canvas_y, action.tile_x, action.tile_y, action.sheet)
              }
            }
          }
        }
      }
    }
  }

  changeTile = (e) => {
    switch (e.target.id){
      case "rightarrow":
        {this.props.openTileSheet < 37 ? this.props.changeTileSheet("right"):null}
        break
      case "leftarrow":
        {this.props.openTileSheet > 1 ? this.props.changeTileSheet("left"):null}
        break
      default:
        console.log("errors");
    }
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
        {!this.props.session ?
        <div className="right">
          <button id="erase" className="ui button" onClick={this.erase}>Erase</button>
          <div className="arrows">
            <img onClick={(e) => this.changeTile(e)} src="leftarrow.png" alt="leftarrow" id="leftarrow"/>
            <img onClick={(e) => this.changeTile(e)} src="rightarrow.png" alt="rightarrow" id="rightarrow"/>
          </div>
          <div className="ui cards">
            <div className="ui card tile-card">
              <img src={"Page-" + this.props.openTileSheet + ".png"} alt="Page-1" id="Page-1"/>
              <div className="tileMap">
                <table id="tileMap-grid" cellSpacing="0" cellPadding="0">
                  <tbody id="tileMap-body">
                    { this.creategrid(16,16,"tile-grid") }
                  </tbody>
                </table>
              </div>
            </div>
          </div></div>:null
      }
      </div>
    )
  }
}

function mapStatetoProps(state) {
  return(
    {actObj: state.actObj,
    openMap: state.openMap,
    currentUserMaps: state.currentUserMaps,
    editing: state.editing,
    openTileSheet: state.openTileSheet,
    openSession: state.openSession,
    openCampaign: state.openCampaign,
    currentUser: state.currentUser
  }
  )
}

export default connect(mapStatetoProps, {addAction, changeTileSheet, toggleEditing})(MapContainer)
