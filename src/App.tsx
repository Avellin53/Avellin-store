import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import AdminDashboard from './pages/AdminDashboard';
import DepartmentPage from './pages/DepartmentPage';
import ContentPage from './pages/ContentPage';
import AuthPage from './pages/AuthPage';
import VendorDashboard from './pages/VendorDashboard';
import CheckoutPage from './pages/CheckoutPage';
import ProductDetailPage from './pages/ProductDetailPage';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/auth" element={<AuthPage />} />
        <Route path="/vendor-dashboard" element={<VendorDashboard />} />
        <Route path="/checkout" element={<CheckoutPage />} />
        <Route path="/product/:id" element={<ProductDetailPage />} />
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/department/:categoryName" element={<DepartmentPage />} />
        <Route path="/page/:pageName" element={<ContentPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
