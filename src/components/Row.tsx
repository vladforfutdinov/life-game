import Cell from './Cell';

interface Props {
  row?: boolean[];
  toggleState?(index: number): void;
}

const Row = ({ row = [], toggleState = () => null }: Props) => (
  <div className="row">
    {row.map((cell, index) => (
      <Cell cell={cell} key={index} toggleState={() => toggleState(index)} />
    ))}
  </div>
);

export default Row;
