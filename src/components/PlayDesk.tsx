import { useEffect, useState } from 'react';
import './PlayDesk.css';
import Row from './Row';

interface Props {
  rows?: number;
  cols?: number;
}

type GridArray = boolean[][];
interface Grid {
  tick: number;
  array: GridArray;
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

export const getArray = (rows: number, cols: number, defaultValue?: boolean) =>
  Array.from(Array(rows)).map(() =>
    Array.from(Array(cols)).map(() => defaultValue ?? Math.random() <= 0.4)
  );

export const countNeighbours = (
  array: GridArray,
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

export const getUpdatedArray = (array: GridArray, rows: number, cols: number) =>
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
  const [board, setBoard] = useState<JSX.Element | null>(null);
  const [grid, setGrid] = useState<Grid>({} as Grid);
  const [timeoutHandler, setTimeoutHandler] = useState<number | undefined>();
  const [startGame, setStartGame] = useState(false);
  const [tick, setTick] = useState(0);

  useEffect(() => {
    reset();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    tick && calcGrid(tick);
  }, [tick]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    setBoard(getBoard(grid.array));
  }, [grid]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    startGame ? setTick(tick + 1) : window.clearTimeout(timeoutHandler);
  }, [startGame]); // eslint-disable-line react-hooks/exhaustive-deps

  const resetStates = () => {
    if (timeoutHandler) {
      window.clearTimeout(timeoutHandler);
    }

    setTimeoutHandler(undefined);
    setStartGame(false);
    setTick(0);
  };

  const reset = () => {
    resetStates();
    setGrid({ tick: 0, array: getArray(rows, cols) });
  };

  const clear = () => {
    resetStates();
    setGrid({ tick: 0, array: getArray(rows, cols, false) });
  };

  const increaseTick = () => startGame && setTick(tick + 1);

  const calcGrid = (baseTick = 0) => {
    const array = baseTick ? grid.array : getArray(rows, cols, false);
    const updatedArray = getUpdatedArray(array, rows, cols);
    const updatedGrid = { tick: baseTick, array: updatedArray };

    setGrid(updatedGrid);

    if (startGame) {
      setTimeoutHandler(window.setTimeout(increaseTick, TICK_DURATION * 1000));
    }
  };

  const toggleState = (rowIndex: number, cellIndex: number) => {
    grid.array[rowIndex][cellIndex] = !grid.array[rowIndex][cellIndex];

    setBoard(getBoard(grid.array));
  };

  const getBoard = (array: boolean[][] = []): JSX.Element => (
    <div className="board">
      {array.map((row, index) => (
        <Row
          row={row}
          key={index}
          toggleState={(cellIndex: number) => toggleState(index, cellIndex)}
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
        <span>{grid.tick}</span>
        <button type="reset" onClick={clear}>
          Clear
        </button>
        <button type="reset" onClick={reset}>
          Reset
        </button>
      </div>
    </div>
  );
};

export default PlayDesk;
