import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import Main from '../../frontend/src/page/main/Main'
import DiscoveryPage from '../../frontend/src/page/discovery-page/Main'
import Profile from '../../frontend/src/page/profile/Profile'
import Register from '../../frontend/src/page/register/Register'
import Login from '../../frontend/src/page/login/Login'

export default function App() {
  return (
      <Router>
          <Routes>
          <Route path="/main" element={<Main/>}/>
          <Route path="/discovery" element={<DiscoveryPage/>}/>
          <Route path="/profile" element={<Profile/>}/>
          <Route path="/register" element={<Register/>}/>
          <Route path="/login" element={<Login/>}/>
          </Routes>
      </Router>
  );
}
