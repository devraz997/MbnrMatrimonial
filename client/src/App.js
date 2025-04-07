import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Register from './pages/Register';
import Login from './pages/Login';
import Profile from './pages/Profile';
import Search from './pages/Search';
import NotFound from './pages/NotFound';
import AgentDirectory from './pages/AgentDirectory';
import AgentProfile from './pages/AgentProfile';
import BecomeAgent from './pages/BecomeAgent';
import VerificationRequest from './pages/VerificationRequest';

// Context Providers
import { AgentProvider } from './context/AgentContext';
import { VerificationProvider } from './context/VerificationContext';

function App() {
  return (
    <AgentProvider>
      <VerificationProvider>
        <div className="flex flex-col min-h-screen">
          <Navbar />
          <main className="flex-grow">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/register" element={<Register />} />
              <Route path="/login" element={<Login />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/search" element={<Search />} />
              <Route path="/agents" element={<AgentDirectory />} />
              <Route path="/agents/:id" element={<AgentProfile />} />
              <Route path="/become-agent" element={<BecomeAgent />} />
              <Route path="/verification" element={<VerificationRequest />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </VerificationProvider>
    </AgentProvider>
  );
}

export default App;
