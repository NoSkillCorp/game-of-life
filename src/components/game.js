import React from 'react'
import Board from './board'

class Game extends React.Component {
  render() {
    return (
      <div>
        <Board size="75" />
      </div>
    );
  }
}

export default Game;
