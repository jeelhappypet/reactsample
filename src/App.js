import React from 'react';
import AllUser from './pages/allUser';
import SingleUser from './pages/singleUser';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/users" element={<AllUser />} />
        <Route path="/users/:id" element={<SingleUser />} />
      </Routes>
    </Router>
  );
}

export default App;
