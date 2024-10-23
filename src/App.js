import './App.css';
import MainScreen from './Pages/CenterScreen/MainScreen';
import SettingsScreen from './Pages/SettingsScreen/SettingsScreen';
import TopBar from './Components/TopBar/TopBar';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import Post from './Atoms/Post/Post';

function App() {
  return (
    <div className="App">
      <header className="App-header">
      
      <TopBar />
        
        <Routes>
          <Route path="/" element={<MainScreen />} />
          <Route path="/settings" element={<SettingsScreen />} />
          <Route path="/post" element={<Post />} />
        </Routes>
        
    
        
      </header>
    </div>
  );
}

export default App;
