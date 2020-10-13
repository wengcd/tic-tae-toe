import React from 'react';
import Board from '../Board';
import './index.scss';

function Game(): JSX.Element {
  return (
    <div className="game">
      <Board />
    </div>
  );
};

export default Game;
