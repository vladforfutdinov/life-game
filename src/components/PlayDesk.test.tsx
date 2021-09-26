import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import PlayDesk from './PlayDesk';

const rows = 5;
const cols = 5;

test('renders empty play desk', () => {
  const { container } = render(<PlayDesk />);

  expect(container.querySelectorAll('.cell').length).toEqual(0);
});

test('renders not empty play desk', () => {
  const { container } = render(<PlayDesk rows={rows} cols={cols} />);

  expect(container.querySelectorAll('.cell').length).toEqual(rows * cols);
});

test('changes cell state on click', () => {
  const { container } = render(<PlayDesk rows={rows} cols={cols} />);

  const cells = container.querySelectorAll('.cell');
  const cell = cells[0];

  const prevState = cell.classList.contains('live');
  userEvent.click(cells[0]);
  const nextState = cell.classList.contains('live');

  expect(nextState).toEqual(!prevState);
});

test('clear cells by button click', () => {
  const { container } = render(<PlayDesk rows={rows} cols={cols} />);

  const clearButton = screen.getByText(/clear/i);
  userEvent.click(clearButton);
  const cells = Array.from(container.querySelectorAll('.cell'));

  expect(cells.every((el) => !el.classList.contains('live'))).toEqual(true);
});

test('reset cells by button click', () => {
  const { container } = render(<PlayDesk rows={rows} cols={cols} />);

  const resetButton = screen.getByText(/reset/i);

  const prevCellsClassNames = Array.from(container.querySelectorAll('.cell'))
    .map((el) => Array.from(el.classList))
    .flat();

  userEvent.click(resetButton);

  const nextCellsClassNames = Array.from(container.querySelectorAll('.cell'))
    .map((el) => Array.from(el.classList))
    .flat();

  expect(prevCellsClassNames).not.toEqual(nextCellsClassNames);
});

test('check game over', () => {
  render(<PlayDesk rows={rows} cols={cols} />);

  const clearButton = screen.getByText(/clear/i);
  userEvent.click(clearButton);

  const startButton = screen.getByText(/start/i);
  userEvent.click(startButton);

  expect(screen.getByText(/is over/i)).toBeInTheDocument();
});
