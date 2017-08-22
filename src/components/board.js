import React from 'react'
import CellRow from './row'

class Board extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      size: this.props.size ? parseInt(this.props.size) : 10,
    }

    this.state = {
      ...this.state,
      grid: Array(this.state.size).fill(Array(this.state.size).fill(0))
    }
  }

  handleClick(i,row) {
      let newGrid = [...this.state.grid]
      newGrid[i] =  row
      this.setState({
        grid: newGrid
      })
      console.log(newGrid)
  }

  renderCells() {
    let cellsGrid = []
    for(let i = 0; i < this.state.size; i++) {
      cellsGrid.push(
        <CellRow
          click={(row) => this.handleClick(i,row)}
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
      <div className="cellContainer">
        {this.renderCells()}
      </div>
    );
  }
}

export default Board;
