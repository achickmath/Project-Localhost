import React from 'react';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import HomePage from './pages/HomePage';
import Login from './pages/Login';
import Profile from './pages/Profile';
import Signup from './pages/Signup';
import Writeup from './pages/Writeup';
import WriteupZone from './pages/WriteupZone';
import FullWriteup from './pages/FullWriteup';
import LandingPage from './pages/LandingPage';
import CTFEvents from './pages/CTFEvents';
function App() {
  return (
    <Router>
      <Routes>
        <Route path = "/" element = {<LandingPage />} /> {/*Default route */}
        <Route path="/profile" element={<Profile />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/Login" element={<Login />} />
        <Route path= "/Signup" element = {<Signup />} />
        <Route path = "/Writeup" element = {<Writeup />} />
        <Route path = "/WriteupZone" element = {<WriteupZone/>} />
        <Route path = "/writeup/:id" element = {<FullWriteup/>} />
        <Route path = "/LandingPage" element = {<LandingPage/>} />
        <Route path = "/CTFEvents" element = {<CTFEvents/>} />
      </Routes>
    </Router>
  );
}

export default App;
