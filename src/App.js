import './App.css';
import MainScreen from './Pages/CenterScreen/MainScreen';
import SettingsScreen from './Pages/SettingsScreen/SettingsScreen';
import TopBar from './Components/TopBar/TopBar';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import PostScreen from "./Pages/SubmitPostScreen/SubmitPost"

function App() {
  return (
    <div className="App">
      <header className="App-header">
      
      
        <TopBar></TopBar>
        
        <Routes>
          <Route path="/" element={<MainScreen />} />
          <Route path="/settings" element={<SettingsScreen />} />
          <Route path="/post" element={<PostScreen />} />
        </Routes>
        
    
        
      </header>
    </div>
  );
}

export default App;
