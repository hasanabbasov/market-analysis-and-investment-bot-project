import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import Main from '../../frontend/src/page/main/Main'
import DiscoveryPage from '../../frontend/src/page/discovery-page/Main'
import Profile from '../../frontend/src/page/profile/Profile'

export default function App() {
  return (
      <Router>
          <Routes>
          <Route path="/" element={<Main/>}/>
          <Route path="/discovery" element={<DiscoveryPage/>}/>
          <Route path="/profile" element={<Profile/>}/>
          </Routes>
      </Router>
  );
}
