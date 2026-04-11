import React, { useState } from 'react';
import { useAuthStore } from '../store/authStore';
import { 
  LayoutDashboard, 
  Package, 
  ShoppingBag, 
  Settings, 
  LogOut, 
  TrendingUp,
  PlusCircle
} from 'lucide-react';
import SalesOverview from '../components/vendor/SalesOverview';
import AddProductForm from '../components/vendor/AddProductForm';
import './VendorDashboard.css';

const VendorDashboard: React.FC = () => {
  const { user, vendorProfile, logout } = useAuthStore();
  const [activeTab, setActiveTab] = useState<'overview' | 'products' | 'add'>('overview');

  const handleLogout = () => {
    logout();
    window.location.href = '/auth';
  };

  return (
    <div className="vendor-layout">
      {/* Sidebar */}
      <aside className="vendor-sidebar shadow-glass">
        <div className="vendor-brand">
          <div className="brand-dot"></div>
          <h2>AVELLIN<span>PRO</span></h2>
        </div>

        <div className="vendor-profile-mini">
          <div className="mini-avatar">
            {vendorProfile?.brandName.charAt(0) || 'V'}
          </div>
          <div className="mini-details">
            <p className="brand-name">{vendorProfile?.brandName || 'Store Owner'}</p>
            <p className="brand-status">{vendorProfile?.verificationStatus.toLowerCase()}</p>
          </div>
        </div>

        <nav className="vendor-nav">
          <button 
            className={`nav-item ${activeTab === 'overview' ? 'active' : ''}`}
            onClick={() => setActiveTab('overview')}
          >
            <LayoutDashboard size={18} /> Overview
          </button>
          <button 
            className={`nav-item ${activeTab === 'products' ? 'active' : ''}`}
            onClick={() => setActiveTab('products')}
          >
            <Package size={18} /> Inventory
          </button>
          <button 
            className={`nav-item ${activeTab === 'add' ? 'active' : ''}`}
            onClick={() => setActiveTab('add')}
          >
            <PlusCircle size={18} /> Add Product
          </button>
          <button className="nav-item">
            <ShoppingBag size={18} /> Orders
          </button>
        </nav>

        <div className="sidebar-footer">
          <button className="nav-item logout" onClick={handleLogout}>
            <LogOut size={18} /> Logout
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="vendor-main">
        <header className="vendor-header">
          <div className="header-left">
            <h1>{
              activeTab === 'overview' ? 'Dashboard Overview' : 
              activeTab === 'products' ? 'Product Inventory' : 
              'List New Product'
            }</h1>
            <p>Welcome back, {user?.email}</p>
          </div>
          <div className="header-right">
            <div className="trend-badge">
              <TrendingUp size={14} /> +12% this month
            </div>
            <div className="settings-btn"><Settings size={20} /></div>
          </div>
        </header>

        <div className="vendor-content-area">
          {activeTab === 'overview' && <SalesOverview />}
          {activeTab === 'products' && (
            <div className="placeholder-view">
              <h3>Inventory list coming soon...</h3>
              <button onClick={() => setActiveTab('add')}>Add your first product</button>
            </div>
          )}
          {activeTab === 'add' && <AddProductForm onComplete={() => setActiveTab('products')} />}
        </div>
      </main>
    </div>
  );
};

export default VendorDashboard;
