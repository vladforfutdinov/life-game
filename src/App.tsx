import './App.css';
import PlayDesk from './components/PlayDesk';

const ROWS: number = 50;
const COLS:number = 50;

const App = () => (
  <div className="App">
    <header className="App-header">Conway's Life Game</header>
    <PlayDesk rows={ROWS} cols={COLS} />
  </div>
);

export default App;
