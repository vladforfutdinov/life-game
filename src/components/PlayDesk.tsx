import { useEffect, useState } from 'react';
import './PlayDesk.css';
import Row from './Row';

interface Props {
  rows?: number;
  cols?: number;
}

interface Grid {
  tick: number;
  array: boolean[][];
}

const neighbourMatrix = [
  [-1, -1],
  [-1, 0],
  [-1, 1],
  [0, -1],
  [0, 1],
  [1, -1],
  [1, 0],
  [1, 1],
];

const TICK_DURATION = 0.4; // seconds

export const getArray = (rows: number, cols: number, defaultValue = false) =>
  Array.from(Array(rows)).map(() =>
    Array.from(Array(cols)).map(() => defaultValue)
  );

export const countNeighbours = (
  array: boolean[][],
  row: number,
  cell: number,
  rows: number,
  cols: number
) =>
  neighbourMatrix.reduce((acc, [rowOffset, cellOffset]) => {
    const rowIndex = row + rowOffset;
    const cellIndex = cell + cellOffset;

    const hasCell =
      rowIndex >= 0 && rowIndex < rows && cellIndex >= 0 && cellIndex < cols;

    if (!hasCell) {
      return acc;
    }

    return array[rowIndex][cellIndex] ? acc + 1 : acc;
  }, 0);

export const getUpdatedArray = (
  array: boolean[][],
  rows: number,
  cols: number
) =>
  array.map((row, rowIndex) =>
    row.map((cell, cellIndex) => {
      const count = countNeighbours(array, rowIndex, cellIndex, rows, cols);

      if (cell && (count === 2 || count === 3)) {
        return true;
      }

      if (!cell && count === 3) {
        return true;
      }

      return false;
    })
  );

const PlayDesk = ({ rows = 0, cols = 0 }: Props) => {
  const [grid, setGrid] = useState({ tick: 0, array: getArray(rows, cols) });
  const [board, setBoard] = useState<JSX.Element | null>(null);
  const [startGame, setStartGame] = useState(false);
  const [timeoutHandler, setTimeoutHandler] = useState<number | undefined>();

  useEffect(() => {
    setStartGame(false);
    setTimeoutHandler(undefined);
  }, []);

  useEffect(() => {
    setBoard(getBoard(grid.array));
  }, [grid]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    startGame ? calcGrid(grid) : window.clearTimeout(timeoutHandler);
  }, [startGame]); // eslint-disable-line react-hooks/exhaustive-deps

  const calcGrid = (baseGrid: Grid) => {
    const { array, tick } = baseGrid;
    const updatedArray = getUpdatedArray(array, rows, cols);
    const updatedGrid = { tick: tick + 1, array: updatedArray };

    setGrid(updatedGrid);

    setTimeoutHandler(
      window.setTimeout(() => calcGrid(updatedGrid), TICK_DURATION * 1000)
    );
  };

  const toggleState = (rowIndex: number, cellIndex: number) => {
    grid.array[rowIndex][cellIndex] = !grid.array[rowIndex][cellIndex];

    setBoard(getBoard(grid.array));
  };

  const getBoard = (array: boolean[][]): JSX.Element => (
    <div className="board">
      {array.map((row, index) => (
        <Row
          row={row}
          key={index}
          toggleState={
            !startGame
              ? (cellIndex: number) => toggleState(index, cellIndex)
              : () => null
          }
        />
      ))}
    </div>
  );

  return (
    <div className="playField">
      {board}
      <div className="controls">
        <button type="button" onClick={() => setStartGame(!startGame)}>
          {startGame ? 'Stop' : 'Start'}
        </button>
      </div>
    </div>
  );
};

export default PlayDesk;
