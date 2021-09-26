import Cell from './Cell';
import styles from './Row.module.css';

interface Props {
  row?: boolean[];
  rowIndex?: number;
}

const Row = ({ row = [], rowIndex = 0 }: Props) => (
  <div className={styles.row}>
    {row.map((cell, index) => (
      <Cell
        cellState={cell}
        key={`${rowIndex}${index}`}
        cell={index}
        row={rowIndex}
      />
    ))}
  </div>
);

export default Row;
