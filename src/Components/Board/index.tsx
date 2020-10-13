import React, { useState, useCallback } from 'react';
import Square from '../Square';
import './index.scss';

const Board = (): JSX.Element => {
  const [squares, setSquares] = useState(Array(9).fill(null));
  const [xIsNext, changeNext] = useState(true);
  
  function calculateWinner(squaresCopy: any) {
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];
    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      if (squaresCopy[a] && squaresCopy[a] === squaresCopy[b] && squaresCopy[a] === squaresCopy[c]) {
        return squaresCopy[a];
      }
    }
    return null;
  }
  
  const handleClick = useCallback((index: number): void => {
    const squaresClone = squares.slice();
    if (calculateWinner(squaresClone) || squaresClone[index]) {
      return;
    }
    squaresClone[index] = xIsNext ? 'X' : 'O';
    setSquares(squaresClone);
    changeNext(!xIsNext);
  }, [squares, xIsNext, setSquares, changeNext]);

  const restartGame = useCallback((): void => {
    setSquares(Array(9).fill(null));
    changeNext(true);
  }, [setSquares, changeNext]);
  
  const renderSquares = useCallback((index: number): JSX.Element => {
    return <Square value={squares[index]} clickItem={(): void => handleClick(index)} />
  }, [squares, handleClick]);

  const renderStatus = useCallback((): JSX.Element => {
    const winner = calculateWinner(squares);
    let status = '';
    if (winner) {
      status = `Winner: ${winner}!`;
    } else if (!squares.includes(null)) {
      status = 'Draw!';
    } else {
      status = `Next Player: ${xIsNext ? 'X' : 'O'}`;
    }
    return (
      <div className="status">
        {status} 
      </div>
    );
  }, [squares, xIsNext]);

  return (
    <>
      {renderStatus()}
      <div className="boardRow">
        {renderSquares(0)}
        {renderSquares(1)}
        {renderSquares(2)}
      </div>
      <div className="boardRow">
        {renderSquares(3)}
        {renderSquares(4)}
        {renderSquares(5)}
      </div>
      <div className="boardRow">
        {renderSquares(6)}
        {renderSquares(7)}
        {renderSquares(8)}
      </div>
      <div className="restartGame">
        <button onClick={restartGame}>RESTART GAME</button>
      </div>
    </>
  );
};

export default Board;
