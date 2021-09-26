export interface Grid {
  tick: number;
  isOver: boolean;
  array: GridArray;
}

export type GridArray = boolean[][];

export const getArray = (
  rows: number,
  cols: number,
  defaultValue?: boolean
): GridArray =>
  Array.from(Array(rows)).map(() =>
    Array.from(Array(cols)).map(() => defaultValue ?? Math.random() <= 0.4)
  );

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

export const countNeighbours = (
  array: GridArray,
  row: number,
  cell: number,
  rows: number,
  cols: number
): number =>
  neighbourMatrix.reduce((acc, [rowOffset, cellOffset]) => {
    const rowIndex = row + rowOffset;
    const cellIndex = cell + cellOffset;

    const hasCell =
      rowIndex >= 0 && rowIndex < rows && cellIndex >= 0 && cellIndex < cols;

    return hasCell && array[rowIndex][cellIndex] ? acc + 1 : acc;
  }, 0);

export const getUpdatedArray = (
  array: GridArray,
  rows: number,
  cols: number
): GridArray =>
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
