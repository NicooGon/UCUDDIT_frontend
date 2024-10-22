import './App.css';
import MainScreen from './Components/CenterScreen/MainScreen';
import SettingsScreen from './Components/SettingsScreen/SettingsScreen';
import TopBar from './Components/TopBar/TopBar';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import LeftBar from './Components/LeftBar/LeftBar';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        
        <TopBar />
        <Routes>
          <Route path="/" element={<MainScreen />} />
          <Route path="/settings" element={<SettingsScreen />} />
        </Routes>
    
        
      </header>
    </div>
  );
}

export default App;
