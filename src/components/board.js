import React from 'react';
import CellRow from './row';
import Navigation from './navigation';

class Board extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      play: false,
      size: this.props.size ? parseInt(this.props.size, 10) : 10,
    };

    this.state = {
      ...this.state,
      grid: this.initGrid(),
    };
  }

  initGrid() {
    return Array(this.state.size).fill(Array(this.state.size).fill(0));
  }

  async handleClick(i, row) {
    const newGrid = [...this.state.grid];
    newGrid[i] = row;
    await this.setState({
      grid: newGrid,
    });
  }

  async run() {
    this.handleNext();
    if (this.state.play) {
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
    const newGrid = [];
    for (let i = 0; i < this.state.size; i++) {
      const newColumn = [];
      for (let j = 0; j < this.state.size; j++) {
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
    const neighbors = this.sumNeighbors(i, j);
    if (neighbors === 3) {
      return true;
    }
    if (this.state.grid[i][j] === 1 && neighbors === 2) {
      return true;
    }

    return false;
  }

  sumNeighbors(i, j) {
    let sum = 0;
    if (i !== 0 && j !== 0) {
      sum += this.state.grid[i - 1][j - 1];
    }

    if (i !== this.state.size - 1 && j !== this.props.size - 1) {
      sum += this.state.grid[i + 1][j + 1];
    }

    if (i !== 0 && j !== this.props.size - 1) {
      sum += this.state.grid[i - 1][j + 1];
    }

    if (i !== this.props.size - 1 && j !== 0) {
      sum += this.state.grid[i + 1][j - 1];
    }

    if (i !== 0) {
      sum += this.state.grid[i - 1][j];
    }

    if (j !== 0) {
      sum += this.state.grid[i][j - 1];
    }

    if (j !== this.props.size - 1) {
      sum += this.state.grid[i][j + 1];
    }

    if (i !== this.props.size - 1) {
      sum += this.state.grid[i + 1][j];
    }

    return sum;
  }

  renderCells() {
    const cellsGrid = [];
    for (let i = 0; i < this.state.size; i++) {
      cellsGrid.push(
        <CellRow
          click={async row => this.handleClick(i, row)}
          subkey={`R${i.toString()}`}
          key={`R${i.toString()}`}
          size={this.state.size}
          row={this.state.grid[i]}
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

export default Board;
