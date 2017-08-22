import React from 'react';

class Cell extends React.Component {
  render() {
    return (
      <div
        className={'cell ' + (this.props.alive === 1 ? 'alive' : 'dead')}
        onClick={() => this.props.click()}
        >
      </div>    );
  }
}

export default Cell;
