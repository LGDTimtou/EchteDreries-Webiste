import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Main from './pages/Main';
import Boffen from './pages/Boffen';
import TimtouHome from './pages/TimtouHome'

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Boffen />} />
        <Route path="/test" element={<Main />} />
        <Route path="/timtou" element={<TimtouHome />} />
      </Routes>
    </Router>
  );
}

export default App;
