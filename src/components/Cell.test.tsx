import { render } from '@testing-library/react';
import Cell from './Cell';

test('renders cell', () => {
  const { container } = render(<Cell row={1} cell={1} />);
  const el = container?.firstChild as HTMLElement;
  const { classList } = el;

  expect(classList.contains('cell')).toEqual(true);
});

test('renders live cell', () => {
  const { container } = render(<Cell row={1} cell={1} cellState={true} />);
  const el = container?.firstChild as HTMLElement;
  const { classList } = el;

  expect(classList.contains('live')).toEqual(true);
});

test('renders empty cell', () => {
  const { container } = render(<Cell row={1} cell={1} cellState={false} />);
  const el = container?.firstChild as HTMLElement;
  const { classList } = el;

  expect(classList.contains('live')).toEqual(false);
});
