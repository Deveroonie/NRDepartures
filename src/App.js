import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Departures from './pages/Departures';
import Arrivals from './pages/Arrivals';

import GoogleAnalytics from './components/GoogleAnalytics';

function App() {  
return (
  <Router>
    <GoogleAnalytics />
      <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/departures/:id" element={<Departures />} />
      <Route path="/arrivals/:id" element={<Arrivals />} />
      </Routes>
  </Router> 
);
}

export default App; 