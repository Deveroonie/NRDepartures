import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Departures from './pages/Departures';
import Arrivals from './pages/Arrivals';

function App() {  
return (
  <Router>
      <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/departures/:id" element={<Departures />} />
      <Route path="/arrivals/:id" element={<Arrivals />} />
      </Routes>
  </Router> 
);
}

export default App; 