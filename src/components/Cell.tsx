import cl from 'classnames';
import styles from './Cell.module.css';

interface Props {
  cellState?: boolean;
  cell: number;
  row: number;
}

const Cell = ({ cellState = false, cell, row }: Props) => (
  <div
    data-cell={cell}
    data-row={row}
    className={cl(styles.cell, cellState ? styles.live : {})}
  />
);

export default Cell;
