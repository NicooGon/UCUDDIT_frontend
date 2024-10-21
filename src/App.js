import './App.css';
import LeftBar from './Components/LeftBar/LeftBar';
import TopBar from './Components/TopBar/TopBar';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <TopBar></TopBar>
        <LeftBar></LeftBar>
      </header>
    </div>
  );
}

export default App;
