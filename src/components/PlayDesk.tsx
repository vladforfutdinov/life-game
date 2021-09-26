import { useEffect, useState } from 'react';
import styles from './PlayDesk.module.css';
import Row from './Row';
import useGrid from './useGrid';

interface Props {
  rows?: number;
  cols?: number;
}

const TICK_DURATION = 0.4; // seconds

const PlayDesk = ({ rows = 0, cols = 0 }: Props) => {
  const { grid, next, reset, toggleCell } = useGrid(rows, cols);
  const [timeoutHandler, setTimeoutHandler] = useState<number | undefined>();
  const [startGame, setStartGame] = useState(false);

  useEffect(() => {
    if (grid.isOver) {
      setStartGame(false);
    }
  }, [grid]);

  useEffect(() => {
    if (startGame) {
      setTimeoutHandler(window.setTimeout(next, TICK_DURATION * 1000));
    }
  }, [grid.tick]);

  useEffect(() => {
    startGame ? next() : window.clearTimeout(timeoutHandler);
  }, [startGame]);

  const resetBoard = () => {
    resetStates();
    reset();
  };

  const resetStates = () => {
    if (timeoutHandler) {
      window.clearTimeout(timeoutHandler);
      setTimeoutHandler(undefined);
    }

    setStartGame(false);
    reset();
  };

  const clear = () => {
    resetStates();
    reset(false);
  };

  const handleCellClick = (e: any) => {
    const {
      dataset: { cell, row },
    } = e?.target;

    toggleCell(row, cell);
  };

  const getBoard = (array: boolean[][] = []): JSX.Element => (
    <div className="board" onClick={handleCellClick}>
      {array.map((row, index) => (
        <Row row={row} key={index} rowIndex={index} />
      ))}
    </div>
  );

  const board = getBoard(grid.array);

  const toggleStart = () => setStartGame(!startGame);

  return (
    <>
      {board}
      <div className={styles.controls}>
        <button type="button" onClick={toggleStart}>
          {startGame ? 'Stop' : 'Start'}
        </button>
        <span>
          {grid.tick} {grid.isOver && '(is over)'}
        </span>
        <button type="reset" onClick={clear}>
          Clear
        </button>
        <button type="reset" onClick={resetBoard}>
          Reset
        </button>
      </div>
    </>
  );
};

export default PlayDesk;
