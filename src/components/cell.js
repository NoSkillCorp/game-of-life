import React from 'react';

class Cell extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      alive : 'dead'
    }
  }

  handleClick() {
    this.setState({
      alive: this.state.alive === 'dead' ? 'alive' : 'dead'
    })
  }

  render() {
    return (
      <div
        className={'cell ' + this.state.alive}
        onClick={() => this.handleClick()}
        >
      </div>    );
  }
}

export default Cell;
