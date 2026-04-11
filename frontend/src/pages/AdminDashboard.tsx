import React, { useState } from 'react';
import { useStore } from '../store/useStore';
import { LayoutDashboard, Package, Users, Settings, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';
import OverviewPane from '../components/admin/OverviewPane';
import ProductManager from '../components/admin/ProductManager';
import './AdminDashboard.css';

const AdminDashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'overview' | 'products' | 'sellers'>('overview');

  return (
    <div className="admin-layout">
      {/* Sidebar */}
      <aside className="admin-sidebar">
        <div className="admin-brand">
          <img src="/avellin-logo.jpeg" alt="Avellin" className="admin-logo-img" />
          <h2>Avellin Admin</h2>
        </div>
        <nav className="admin-nav">
          <button 
            className={`admin-nav-item ${activeTab === 'overview' ? 'active' : ''}`}
            onClick={() => setActiveTab('overview')}
          >
            <LayoutDashboard size={20} /> Overview
          </button>
          <button 
            className={`admin-nav-item ${activeTab === 'products' ? 'active' : ''}`}
            onClick={() => setActiveTab('products')}
          >
            <Package size={20} /> Manage Products
          </button>
          <button 
            className={`admin-nav-item ${activeTab === 'sellers' ? 'active' : ''}`}
            onClick={() => setActiveTab('sellers')}
          >
            <Users size={20} /> Manage Sellers
          </button>
        </nav>
        <div className="admin-sidebar-footer">
          <Link to="/" className="admin-nav-item back-link">
            <ArrowLeft size={18} /> Back to Market
          </Link>
        </div>
      </aside>

      {/* Main Content */}
      <main className="admin-main">
        <header className="admin-header">
          <h1>{activeTab === 'overview' ? 'Dashboard Overview' : activeTab === 'products' ? 'Product Management' : 'Seller Management'}</h1>
          <div className="admin-user">Admin Profile</div>
        </header>
        <div className="admin-content-area">
          {activeTab === 'overview' && <OverviewPane />}
          {activeTab === 'products' && <ProductManager />}
          {activeTab === 'sellers' && <div><p>Seller management module coming soon.</p></div>}
        </div>
      </main>
    </div>
  );
};

export default AdminDashboard;
