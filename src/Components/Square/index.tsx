import React from 'react';
import './index.scss';

interface clickFunc {
  (): void;
}

interface SquareProps {
  value: string;
  clickItem: clickFunc;
}

function Square(props: SquareProps): JSX.Element {
  const { value, clickItem } = props;
  return (
    <button className={`square ${value}`} onClick={clickItem}>
      {value}
    </button>
  );
};

export default Square;
