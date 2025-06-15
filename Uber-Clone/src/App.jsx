import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './Components/Navbar';
import HeroSection from './Components/HeroSection';
import Home from './pages/Home';
import Login from './Pages/Login';
import Signup from './Pages/Signup';
import SignupType from './Pages/SignupType';
import ProtectedData from './Components/ProtectedData';
import './App.css';

function AppLayout() {
  const location = useLocation();

  // Show full navbar only on homepage and login
  const showFullNavbar = location.pathname === '/' || location.pathname === '/login';

  return (
    <>
      <Navbar showFull={showFullNavbar} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/signup/:type" element={<SignupType />} />
        <Route path="/private" element={<ProtectedData />} />
      </Routes>

      {/* Show Hero section only on signup */}
      {location.pathname.startsWith('/signup')}

    </>
  );
}

export default function App() {
  return (
    <Router>
      <AppLayout />
    </Router>
  );
}
