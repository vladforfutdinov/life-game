import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import PlayDesk, { countNeighbours, getUpdatedArray } from './PlayDesk';

test('renders empty play desk', () => {
  const { container } = render(<PlayDesk />);

  expect(container.querySelectorAll('.cell').length).toEqual(0);
});

test('renders not empty play desk', () => {
  const rows = 5;
  const cols = 5;
  const { container } = render(<PlayDesk rows={rows} cols={cols} />);

  expect(container.querySelectorAll('.cell').length).toEqual(rows * cols);
});

test('test click cell', () => {
  const rows = 5;
  const cols = 5;
  const { container } = render(<PlayDesk rows={rows} cols={cols} />);

  const cells = container.querySelectorAll('.cell');
  userEvent.click(cells[0]);

  expect(
    container.querySelectorAll('.cell')[0].classList.contains('live')
  ).toEqual(true);
});

test('calc neighbours', () => {
  const rows = 3;
  const cols = 3;

  const row = 1;
  const cell = 1;

  const baseMatrix = [
    [true, true, true],
    [true, true, true],
    [true, true, true],
  ];

  const result = countNeighbours(baseMatrix, row, cell, rows, cols);

  expect(result).toEqual(8);
});

test('calc empty neighbours', () => {
  const rows = 3;
  const cols = 3;

  const row = 1;
  const cell = 1;

  const baseMatrix = [
    [false, false, false],
    [false, false, false],
    [false, false, false],
  ];

  const result = countNeighbours(baseMatrix, row, cell, rows, cols);

  expect(result).toEqual(0);
});

test('calc empty neighbours for edge case', () => {
  const rows = 3;
  const cols = 3;

  const row = 2;
  const cell = 2;

  const baseMatrix = [
    [true, true, true],
    [true, true, true],
    [true, true, true],
  ];

  const result = countNeighbours(baseMatrix, row, cell, rows, cols);

  expect(result).toEqual(3);
});

test('check update grid', () => {
  const rows = 3;
  const cols = 3;

  const baseMatrix = [
    [false, true, false],
    [false, true, false],
    [false, true, false],
  ];

  const resultMatrix = [
    [false, false, false],
    [true, true, true],
    [false, false, false],
  ];

  const result = getUpdatedArray(baseMatrix, rows, cols);

  expect(result).toEqual(resultMatrix);
});
