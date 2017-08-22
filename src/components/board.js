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
    let newGrid = [];
    for (let i = 0; i < this.state.size; i++) {
      let newColumn = []
      for (let j = 0; j < this.state.size; j++) {
        if (this.shouldILive(i,j)) {
          newColumn.push(1)
        } else {
          newColumn.push(0)
        }
      }
      newGrid.push(newColumn)
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
    let sum = 0
    if (i !== 0 && j !== 0) {
      sum += this.state.grid[i-1][j-1]
    }

    if (i !== this.state.size - 1 && j !== this.props.size - 1) {
      sum += this.state.grid[i+1][j+1]
    }

    if (i !== 0 && j !== this.props.size - 1) {
      sum += this.state.grid[i-1][j+1]
    }

    if (i !== this.props.size - 1 && j !== 0) {
      sum += this.state.grid[i+1][j-1]
    }

    if (i !== 0) {
      sum += this.state.grid[i-1][j]
    }

    if (j !== 0) {
      sum += this.state.grid[i][j-1]
    }

    if (j !== this.props.size - 1) {
      sum += this.state.grid[i][j+1]
    }

    if (i !== this.props.size - 1) {
      sum += this.state.grid[i+1][j]
    }

    return sum
  }

  renderCells() {
    let cellsGrid = []
    for(let i = 0; i < this.state.size; i++) {
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
