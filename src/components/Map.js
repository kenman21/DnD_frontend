import React from 'react'

class Map extends React.Component {
  state = {
    xdimension: null,
    ydimension: null,
    map : {

    }
  }

  componentDidMount() {
    let canvas = document.getElementById('canvas-1')
    canvas.width = 820;
    canvas.height= 820;
    // Visible Canvas Width
    let map_w = 800;
    let map_h = 800;
    let p = 10;
    let ctx = canvas.getContext('2d');
    for (var x = 0; x <= map_w; x += 16) {
      ctx.moveTo(0.5 + x + p, p);
      ctx.lineTo(0.5 + x + p, map_h + p);
      }


    for (var x = 0; x <= map_h; x += 16) {
        ctx.moveTo(p, 0.5 + x + p);
        ctx.lineTo(map_w + p, 0.5 + x + p);
      }

    ctx.strokeStyle = "grey";
    ctx.stroke();
    }

  handleClick = () => {
    let canvas = document.getElementById('canvas-2')
    canvas.width = 788;
    canvas.height= 788;
    let ctx = canvas.getContext('2d');
    let image = new Image();
    image.src = "/0x72_16x16DungeonTileset.v4.png"
    let x = 16 * 4
    let y = 16 * 0
    ctx.drawImage(image,x,y,16,16,0,0,32,32);
  }

  render() {
    // <button onClick={this.handleClick}>Click This</button>
    const grid = []
    for (let i = 0; i < 50; i++){
      const row = []
      for (let j = 0; j < 50; j++){
        row.push(
          <td key={`${i},${j}`} id={`${i},${j}`}>
          </td>
        )
      }
      grid.push(
        <tr key={`${i}`}>
          { row }
        </tr>
      )
    }

    return (
      <div id="canvas-container">
        <canvas id="canvas-1" >
        </canvas>
        <div className="table">
          <table id="grid">
            <tbody id="body">
              { grid }
            </tbody>
          </table>
        </div>
      </div>
    )
  }
}

export default Map
