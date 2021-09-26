import { countNeighbours, getUpdatedArray } from './utils';

const centerPosition = {
  row: 1,
  cell: 1,
};

const edgePosition = {
  row: 2,
  cell: 2,
};

const trueMatrix = [
  [true, true, true],
  [true, true, true],
  [true, true, true],
];

const falseMatrix = [
  [false, false, false],
  [false, false, false],
  [false, false, false],
];

const verticalMatrix = [
  [false, true, false],
  [false, true, false],
  [false, true, false],
];

const horizontalMatrix = [
  [false, false, false],
  [true, true, true],
  [false, false, false],
];

test('calc neighbours', () => {
  const { row, cell } = centerPosition;
  const rows = trueMatrix.length;
  const cols = trueMatrix[0].length;

  expect(countNeighbours(trueMatrix, row, cell, rows, cols)).toEqual(8);
});

test('calc empty neighbours', () => {
  const { row, cell } = centerPosition;
  const rows = falseMatrix.length;
  const cols = falseMatrix[0].length;

  expect(countNeighbours(falseMatrix, row, cell, rows, cols)).toEqual(0);
});

test('calc empty neighbours for edge case', () => {
  const { row, cell } = edgePosition;
  const rows = trueMatrix.length;
  const cols = trueMatrix[0].length;

  expect(countNeighbours(trueMatrix, row, cell, rows, cols)).toEqual(3);
});

test('check update grid', () => {
  const rows = verticalMatrix.length;
  const cols = verticalMatrix[0].length;

  expect(getUpdatedArray(verticalMatrix, rows, cols)).toEqual(horizontalMatrix);
});
