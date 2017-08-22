import React from 'react'
import Cell from './cell'

class Row extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      size: this.props.size ? parseInt(this.props.size) : 10,
    }
  }

  hancleClick(index) {
    let newRow = [...this.props.row]
    newRow[index] = newRow[index] === 0 ? 1 : 0
    return newRow
  }

  renderCells() {
    let cellsGrid = []
    for(let i = 0; i < this.state.size; i++) {
      cellsGrid.push(
        <Cell
          alive={this.props.row[i]}
          key={this.props.subkey + 'C' + i.toString()}
          click={() => this.props.click(this.hancleClick(i))}
        />)
    }
    return cellsGrid
  }

  render() {
    return (
      <div className="cellRow">
        {this.renderCells()}
      </div>
    );
  }
}

export default Row;
