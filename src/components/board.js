import React from 'react';
import PropTypes from 'prop-types';
import CellRow from './row';
import Navigation from './navigation';

class Board extends React.Component {
  constructor(props) {
    super(props);
    const { size } = this.props;
    this.state = {
      play: false,
      size: size ? parseInt(size, 10) : 10,
    };

    this.state = {
      ...this.state,
      grid: this.initGrid(),
    };
  }

  initGrid() {
    const { size } = this.state;
    return Array(size).fill(Array(size).fill(0));
  }

  async handleClick(i, row) {
    const { grid } = this.state;
    const newGrid = [...grid];
    newGrid[i] = row;
    await this.setState({
      grid: newGrid,
    });
  }

  async run() {
    const { play } = this.state;
    this.handleNext();
    if (play) {
      setTimeout(this.run.bind(this), 10);
    }
  }

  async play() {
    await this.setState({ play: true });
    this.run();
  }

  async stop() {
    this.setState({ play: false });
  }

  async handleNext() {
    const { size } = this.state;
    const newGrid = [];
    for (let i = 0; i < size; i += 1) {
      const newColumn = [];
      for (let j = 0; j < size; j += 1) {
        if (this.shouldILive(i, j)) {
          newColumn.push(1);
        } else {
          newColumn.push(0);
        }
      }
      newGrid.push(newColumn);
    }

    await this.setState({
      grid: newGrid,
    });
  }

  shouldILive(i, j) {
    const { grid } = this.state;
    const neighbors = this.sumNeighbors(i, j);
    if (neighbors === 3) {
      return true;
    }
    if (grid[i][j] === 1 && neighbors === 2) {
      return true;
    }

    return false;
  }

  sumNeighbors(i, j) {
    const { size, grid } = this.state;
    let sum = 0;
    if (i !== 0 && j !== 0) {
      sum += grid[i - 1][j - 1];
    }

    if (i !== size - 1 && j !== size - 1) {
      sum += grid[i + 1][j + 1];
    }

    if (i !== 0 && j !== size - 1) {
      sum += grid[i - 1][j + 1];
    }

    if (i !== size - 1 && j !== 0) {
      sum += grid[i + 1][j - 1];
    }

    if (i !== 0) {
      sum += grid[i - 1][j];
    }

    if (j !== 0) {
      sum += grid[i][j - 1];
    }

    if (j !== size - 1) {
      sum += grid[i][j + 1];
    }

    if (i !== size - 1) {
      sum += grid[i + 1][j];
    }

    return sum;
  }

  renderCells() {
    const { size, grid } = this.state;
    const cellsGrid = [];
    for (let i = 0; i < size; i += 1) {
      cellsGrid.push(
        <CellRow
          click={async row => this.handleClick(i, row)}
          subkey={`R${i.toString()}`}
          key={`R${i.toString()}`}
          size={size}
          row={grid[i]}
        />,
      );
    }
    return cellsGrid;
  }

  render() {
    return (
      <div>
        <div>
          <Navigation
            next={() => this.handleNext()}
            play={() => this.play()}
            stop={() => this.stop()}
          />
        </div>
        <div className="cellContainer">{this.renderCells()}</div>
      </div>
    );
  }
}

Board.propTypes = {
  size: PropTypes.number.isRequired,
};

export default Board;
