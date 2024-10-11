import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './pages/HomePage';
import AdminDashboard from './admin/AdminDashboard';
import AddEditProfile from './admin/AddEditProfile';

function App() {
  return (
    <Router>
      <Routes>
        {/* Main page */}
        <Route path="/" element={<HomePage />} />

        {/* Admin dashboard */}
        <Route path="/admin" element={<AdminDashboard />} />

        {/* Add and Edit Profile routes */}
        <Route path="/admin/add" element={<AddEditProfile />} />
        <Route path="/admin/edit/:id" element={<AddEditProfile />} />
      </Routes>
    </Router>
  );
}

export default App;
