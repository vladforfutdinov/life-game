interface Props {
  cell?: boolean;
  toggleState?(): void;
}

const Cell = ({ cell = false, toggleState = () => null }: Props) => (
  <div className={`cell ${cell ? 'live' : ''}`} onClick={toggleState} />
);

export default Cell;
