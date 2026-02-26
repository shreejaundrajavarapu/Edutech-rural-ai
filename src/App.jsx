import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Profile from './pages/Profile';
import SubjectView from './pages/SubjectView';
import Roadmap from './pages/Roadmap';
import DoubtSolver from './pages/DoubtSolver';
import Quiz from './pages/Quiz';

function App() {
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem('user');
    return saved ? JSON.parse(saved) : null;
  });

  const [progress, setProgress] = useState(() => {
    const saved = localStorage.getItem('progress');
    return saved ? JSON.parse(saved) : {};
  });

  useEffect(() => {
    if (user) {
      localStorage.setItem('user', JSON.stringify(user));
      console.log("User is logged in:", user.name); // Helps verify login
    }
  }, [user]);

  useEffect(() => {
    localStorage.setItem('progress', JSON.stringify(progress));
  }, [progress]);

  const handleLogin = (userData) => {
    setUser(userData);
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
  };

  const addXP = (amount) => {
    setUser(prev => {
      if (!prev) return prev;
      const currentXP = prev.xp || 0;
      const newXP = currentXP + amount;
      // Level calculation: 1 + floor(XP / 300)
      const newLevel = Math.floor(newXP / 300) + 1;

      return {
        ...prev,
        xp: newXP,
        level: newLevel
      };
    });
  };

  // If no user is logged in, show ONLY the Login page
  if (!user) {
    return <Login onLogin={handleLogin} />;
  }

  return (
    <Router>
      <div className="flex min-h-screen bg-slate-50">
        <Sidebar logout={logout} user={user} />
        <div className="flex-1 flex flex-col">
          <Navbar user={user} />
          <main className="flex-1 p-4 md:p-8 overflow-y-auto">
            <Routes>
              <Route path="/" element={<Dashboard user={user} setUser={setUser} progress={progress} addXP={addXP} />} />
              <Route path="/profile" element={<Profile user={user} progress={progress} />} />
              <Route path="/subject/:subjectId" element={<SubjectView progress={progress} setProgress={setProgress} addXP={addXP} />} />
              <Route path="/roadmap" element={<Roadmap progress={progress} setProgress={setProgress} />} />
              <Route path="/doubts" element={<DoubtSolver />} />
              <Route path="/quiz/:subjectId" element={<Quiz setProgress={setProgress} addXP={addXP} />} />
              <Route path="*" element={<Navigate to="/" />} />
            </Routes>
          </main>
        </div>
      </div>
    </Router>
  );
}

export default App;