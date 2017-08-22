import React from 'react'
import CellRow from './row'
import Navigation from './navigation'

class Board extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      size: this.props.size ? parseInt(this.props.size) : 10,
    }

    this.state = {
      ...this.state,
      grid: this.initGrid()
    }
  }

  initGrid() {
    return Array(this.state.size).fill(Array(this.state.size).fill(0))
  }

  async handleClick(i,row) {
      let newGrid = [...this.state.grid]
      newGrid[i] = row
      await this.setState({
        grid: newGrid
      })
  }

  async handleNext() {
    let newGrid = this.initGrid()
    for (let i = 1; i < newGrid.length - 1; i++) {
      for (let j = 1; j < newGrid[i].length - 1; j++) {
        if (this.shouldILive(i,j)) {
          console.log(newGrid.join('\n')+'\n\n')
          newGrid[i][j] = 1
          console.log(newGrid.join('\n')+'\n\n')
        }
      }
    }

    await this.setState({
      grid: newGrid
    })
  }

  shouldILive(i,j) {
    let neighbors = this.sumNeighbors(i,j)
    if (neighbors === 3) {
      return true
    } else {
      if (this.state.grid[i][j] === 1 && neighbors === 2) {
        return true
      }
    }
    return false
  }

  sumNeighbors(i,j) {
    return (
      this.state.grid[i-1][j-1]
      + this.state.grid[i][j-1]
      + this.state.grid[i-1][j]
      + this.state.grid[i-1][j+1]
      + this.state.grid[i+1][j]
      + this.state.grid[i][j+1]
      + this.state.grid[i+1][j+1]
      + this.state.grid[i+1][j-1]
    )
  }

  renderCells() {
    let cellsGrid = []
    for(let i = 1; i < this.state.size-1; i++) {
      cellsGrid.push(
        <CellRow
          click={async (row) => await this.handleClick(i,row)}
          subkey={'R' + i.toString()}
          key={'R' + i.toString()}
          size={this.state.size}
          row={this.state.grid[i]}
        />
      )
    }
    return cellsGrid
  }

  render() {
    return (
      <div>
        <div>
          <Navigation next={async () => await this.handleNext()}/>
        </div>
        <div className="cellContainer">
          {this.renderCells()}
        </div>
      </div>
    );
  }
}

export default Board;
