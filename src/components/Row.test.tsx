import { render } from '@testing-library/react';
import Row from './Row';

test('renders row', () => {
  const { container } = render(<Row row={[]} />);
  const el = container?.firstChild as HTMLElement;
  const { classList } = el;

  expect(classList.contains('row')).toEqual(true);
});

test('renders cells in row', () => {
  const { container } = render(<Row row={[false, false]} />);

  expect(container?.firstChild?.childNodes.length).toEqual(2);
});
