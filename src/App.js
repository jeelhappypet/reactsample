import React from 'react';
import AllUser from './pages/allUser';
import SingleUser from './pages/singleUser';
import SearchBar from './pages/searchBar';
import AddUserForm from './pages/addUser';
import UpdateUserForm from './pages/updateUser';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<AllUser />} />
        <Route path="/users/:id" element={<SingleUser />} />
        <Route path="/users/search" element={<SearchBar />} />
        <Route path="/users/add" element={<AddUserForm />} />
        <Route path="/update/:id" element={<UpdateUserForm />} />

      </Routes>
    </Router>
  );
}

export default App;
