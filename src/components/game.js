import React from 'react'
import Board from './board'

class Game extends React.Component {
  render() {
    return (
      <div>
        <Board size="50" />
      </div>
    );
  }
}

export default Game;
