import { act, renderHook } from '@testing-library/react-hooks';
import useGrid from './useGrid';

const rows = 5;
const cols = 5;

test('init grid', () => {
  const { result } = renderHook(() => useGrid(rows, cols));
  const {
    grid: { array },
  } = result.current;

  expect(array.length).toEqual(rows);
  expect(array[0].length).toEqual(cols);
  expect(array.flat().every((cell) => cell)).toEqual(false);
});

test('toggle cell', () => {
  const { result } = renderHook(() => useGrid(rows, cols));
  const { grid, toggleCell } = result.current;

  const cellState = grid.array[1][1];

  act(() => {
    toggleCell(1, 1);
  });

  expect(grid.array[1][1]).toEqual(!cellState);
});

test('reset grid', () => {
  const { result } = renderHook(() => useGrid(rows, cols));

  const prevCells = result.current.grid.array.flat();

  act(() => {
    result.current.reset();
  });

  const nextCells = result.current.grid.array.flat();

  expect(prevCells).not.toEqual(nextCells);
});

test('clear grid', () => {
  const { result } = renderHook(() => useGrid(rows, cols));

  act(() => {
    result.current.reset(false);
  });

  expect(result.current.grid.array.flat().every((cell) => !cell)).toEqual(true);
});

test('next grid', () => {
  const { result } = renderHook(() => useGrid(rows, cols));

  const prevGrid = { ...result.current.grid };
  act(() => {
    result.current.next();
  });
  const nextGrid = { ...result.current.grid };

  expect(nextGrid.array.flat()).not.toEqual(prevGrid.array.flat());
  expect(nextGrid.tick).toEqual(prevGrid.tick + 1);
});
