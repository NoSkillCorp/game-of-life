import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Cell from './cell';

class Row extends Component {
  constructor(props) {
    super(props);
    const { size } = this.props;
    this.state = {
      size: size ? parseInt(size, 10) : 10,
    };
  }

  hancleClick(index) {
    const { row } = this.props;
    const newRow = [...row];
    newRow[index] = newRow[index] === 0 ? 1 : 0;
    return newRow;
  }

  renderCells() {
    const { size } = this.state;
    const { row, subkey, click } = this.props;
    const cellsGrid = [];
    for (let i = 0; i < size; i += 1) {
      cellsGrid.push(
        <Cell
          alive={row[i]}
          key={`${subkey}C${i.toString()}`}
          click={() => click(this.hancleClick(i))}
        />,
      );
    }
    return cellsGrid;
  }

  render() {
    return <div className="cellRow">{this.renderCells()}</div>;
  }
}

Row.propTypes = {
  size: PropTypes.number.isRequired,
  row: PropTypes.arrayOf(PropTypes.number).isRequired,
  subkey: PropTypes.string.isRequired,
  click: PropTypes.func.isRequired,
};

export default Row;
