import React, { useEffect, useState } from 'react';
import './App.css';
import MainScreen from './Pages/MainScreen/MainScreen';
import SettingsScreen from './Pages/SettingsScreen/SettingsScreen';
import TopBar from './Components/TopBar/TopBar';
import { Routes, Route } from 'react-router-dom';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import PostScreen from './Pages/SubmitPostScreen/SubmitPost';
import CommentsScreen from './Pages/CommentsScreen/CommentsScreen';
import getPosts from './Axios/getPosts';  

function App() {

  return (
    <div className="App">
      <header className="App-header">
        <TopBar />
        <Routes>
          <Route path="/" element={<MainScreen />} />
          <Route path="/settings" element={<SettingsScreen />} />
          <Route path="/post" element={<PostScreen />} />
          <Route path='/post/:postId' element={<CommentsScreen />} />
        </Routes>
      </header>
    </div>
  );
}

export default App;
