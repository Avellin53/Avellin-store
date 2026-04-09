import React from 'react';
import { useStore } from '../../store/useStore';
import { DollarSign, ShoppingBag, Users, Store } from 'lucide-react';
import './AdminStyles.css';

const OverviewPane: React.FC = () => {
  const { totalSales, activeBuyers, approvedSellers, products } = useStore();

  return (
    <div className="admin-overview">
      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-icon-wrap"><DollarSign className="stat-icon" /></div>
          <div>
            <p className="stat-label">Total Revenue</p>
            <h3 className="stat-value">${totalSales.toLocaleString()}</h3>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon-wrap"><Users className="stat-icon" /></div>
          <div>
            <p className="stat-label">Active Buyers</p>
            <h3 className="stat-value">{activeBuyers.toLocaleString()}</h3>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon-wrap"><Store className="stat-icon" /></div>
          <div>
            <p className="stat-label">Approved Sellers</p>
            <h3 className="stat-value">{approvedSellers}</h3>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon-wrap"><ShoppingBag className="stat-icon" /></div>
          <div>
            <p className="stat-label">Total Products</p>
            <h3 className="stat-value">{products.length}</h3>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OverviewPane;
