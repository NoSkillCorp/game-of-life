import React from 'react'
import CellRow from './row'

class Board extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      size: this.props.size ? this.props.size : 10,
    }
  }

  renderCells() {
    let cellsGrid = []
    for(let i = 0; i < this.state.size; i++) {
      cellsGrid.push(<CellRow subkey={'R' + i.toString()} key={'R' + i.toString()} size={this.state.size} />)
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
