import React, { useEffect, useState } from 'react';
import './App.css';
import MainScreen from './Pages/MainScreen/MainScreen';
import SettingsScreen from './Pages/SettingsScreen/SettingsScreen';
import TopBar from './Components/TopBar/TopBar';
import { Routes, Route } from 'react-router-dom';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import PostScreen from './Pages/SubmitPostScreen/SubmitPost';
import CommentsScreen from './Pages/CommentsScreen/CommentsScreen';
import UserActivity from './Pages/UserActivityScreen/UserActivity';
import PostsBySearch from './Pages/PostBySearch/PostBySearch';
import LeftBar from './Components/LeftBar/LeftBar';
import PostCommunityScreen from './Pages/PostCommunityScreen/PostCommunityScreen';

function App() {

  return (
    <div className="App">
      <header className="App-header">
        <div  style={{minHeight:'5vh'}}>
        <TopBar />
        </div>
        <div className="d-flex flex-column flex-md-row border border-secondary" style={{backgroundColor:"black", minHeight:'95vh'}}>
          <LeftBar />
          <Routes>
            <Route path="/" element={<MainScreen />} />
            <Route path="/settings" element={<SettingsScreen />} />
            <Route path="/post" element={<PostScreen />} />
            <Route path="/activity/user/:auth0id" element={<UserActivity />} />
            <Route path='/post/:postId' element={<CommentsScreen />} />
            <Route path='/posts/:search' element={<PostsBySearch />} />
            <Route path='/postsCommunity/:community' element={<PostCommunityScreen/>}/>
          </Routes>
        </div>
      </header>
    </div>
  );
}

export default App;
