import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import AdminDashboard from './pages/AdminDashboard';
import DepartmentPage from './pages/DepartmentPage';
import ContentPage from './pages/ContentPage';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/department/:categoryName" element={<DepartmentPage />} />
        <Route path="/page/:pageName" element={<ContentPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
