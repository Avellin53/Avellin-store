import { formatPrice } from '../../utils/currencyUtils';
import { useCurrencyStore } from '../../store/currencyStore';

const SalesOverview: React.FC = () => {
  const currentCurrency = useCurrencyStore(state => state.currentCurrency);
  
  // Mock data for the demonstration
  const stats = [
    { label: 'Total Revenue', value: formatPrice(12450), icon: <DollarSign size={20} />, trend: '+14%', color: '#d4af37' },
    { label: 'Pending Orders', value: '18', icon: <Clock size={20} />, trend: '-2', color: '#888' },
    { label: 'Items Sold', value: '142', icon: <Package size={20} />, trend: '+24', color: '#1a1a1a' },
    { label: 'Completion Rate', value: '98.5%', icon: <CheckCircle size={20} />, trend: '+1%', color: '#4caf50' },
  ];

  const recentSales = [
    { id: '1', product: 'Hydra-Glow Moisturizer', buyer: 'Sarah J.', amount: formatPrice(45), date: '2 hours ago', status: 'Shipped' },
    { id: '2', product: 'Evening Velvet Dress', buyer: 'Emily R.', amount: formatPrice(299), date: '5 hours ago', status: 'Processing' },
    { id: '3', product: 'Radiance Serum', buyer: 'Michael K.', amount: formatPrice(68), date: 'Yesterday', status: 'Delivered' },
  ];

  return (
    <div className="sales-overview">
      <div className="stats-cards">
        {stats.map((stat, i) => (
          <div key={i} className="stat-card shadow-glass">
            <div className="stat-icon" style={{ color: stat.color }}>{stat.icon}</div>
            <div className="stat-info">
              <p className="stat-label">{stat.label}</p>
              <h3 className="stat-value">{stat.value}</h3>
              <span className={`stat-trend ${stat.trend.startsWith('+') ? 'up' : 'down'}`}>
                {stat.trend}
              </span>
            </div>
          </div>
        ))}
      </div>

      <div className="recent-sales-table shadow-glass">
        <h3>Recent Transactions</h3>
        <table>
          <thead>
            <tr>
              <th>Product</th>
              <th>Customer</th>
              <th>Amount</th>
              <th>Time</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {recentSales.map(sale => (
              <tr key={sale.id}>
                <td>{sale.product}</td>
                <td>{sale.buyer}</td>
                <td>{sale.amount}</td>
                <td>{sale.date}</td>
                <td><span className={`status-pill ${sale.status.toLowerCase()}`}>{sale.status}</span></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default SalesOverview;
