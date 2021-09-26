import { useEffect, useState } from 'react';
import { getArray, getUpdatedArray, Grid } from './utils';

interface UseGrid {
  grid: Grid;
  next(): void;
  reset(defaultValue?: boolean): void;
  toggleCell(row: number, cell: number): void;
}

export default function useGrid(rows: number, cols: number): UseGrid {
  const [grid, setGrid] = useState({} as Grid);

  useEffect(() => {
    setGrid({ tick: 0, isOver: false, array: getArray(rows, cols) });
  }, [rows, cols]);

  const next = (): void => {
    const array = getUpdatedArray(grid.array, rows, cols);
    const isOver = JSON.stringify(array) === JSON.stringify(grid.array);

    setGrid({ tick: isOver ? grid.tick : grid.tick + 1, isOver, array });
  };

  const reset = (defaultValue?: boolean): void =>
    setGrid({
      tick: 0,
      isOver: false,
      array: getArray(rows, cols, defaultValue),
    });

  const toggleCell = (row: number, cell: number): void => {
    const clonedArray = [...grid.array];

    if (clonedArray?.[row]?.[cell] !== undefined) {
      clonedArray[row][cell] = !clonedArray[row][cell];
    }

    setGrid({ ...grid, array: clonedArray });
  };

  return { grid, next, reset, toggleCell };
}
