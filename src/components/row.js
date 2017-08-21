import React from 'react'
import Cell from './cell'

class Row extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      size: this.props.size ? this.props.size : 10,
    }
  }

  renderCells() {
    let cellsGrid = []
    for(let i = 0; i < this.state.size; i++) {
      cellsGrid.push(<Cell key={this.props.subkey + 'C' + i.toString()} />)
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
