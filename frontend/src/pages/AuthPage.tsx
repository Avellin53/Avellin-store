import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../store/authStore';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import './AuthPage.css';

const AuthPage: React.FC = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [role, setRole] = useState<'BUYER' | 'VENDOR'>('BUYER');
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    brandName: '',
    storeSlug: ''
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [apiError, setApiError] = useState('');
  const [loading, setLoading] = useState(false);
  
  const navigate = useNavigate();
  const setAuth = useAuthStore(state => state.setAuth);

  const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api/v1';

  const validate = () => {
    const newErrors: Record<string, string> = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!formData.email) newErrors.email = 'Email is required';
    else if (!emailRegex.test(formData.email)) newErrors.email = 'Invalid email format';

    if (!formData.password) newErrors.password = 'Password is required';
    else if (formData.password.length < 8) newErrors.password = 'Password must be at least 8 characters';

    if (!isLogin && role === 'VENDOR') {
      if (!formData.brandName) newErrors.brandName = 'Brand Name is required';
      if (!formData.storeSlug) newErrors.storeSlug = 'Store Slug is required';
      else if (formData.storeSlug.includes(' ')) newErrors.storeSlug = 'Slug cannot contain spaces';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    if (errors[e.target.name]) {
      setErrors({ ...errors, [e.target.name]: '' });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    
    setApiError('');
    setLoading(true);

    let endpoint = isLogin ? `${API_URL}/auth/login` : `${API_URL}/auth/register/${role.toLowerCase()}`;
    
    try {
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || 'Identity verification failed. Please check your credentials.');
      }

      // Success
      setAuth(result.data.user, result.data.vendorProfile);
      navigate(result.data.user.role === 'VENDOR' ? '/vendor-dashboard' : '/');
    } catch (err: any) {
      setApiError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-page">
      <Navbar currentLang="English" setLanguage={() => {}} />
      <main className="auth-container">
        <div className="auth-card shadow-glass">
          <div className="auth-brand-header">
            <span className="premium-label">AVELLIN SECURE</span>
          </div>

          <div className="auth-tabs">
            <button className={isLogin ? 'active' : ''} onClick={() => setIsLogin(true)}>Enter</button>
            <button className={!isLogin ? 'active' : ''} onClick={() => setIsLogin(false)}>Join</button>
          </div>

          <div className="auth-content">
            <h2>{isLogin ? 'Welcome Back' : `Create your ${role === 'BUYER' ? 'Buyer' : 'Vendor'} Account`}</h2>
            
            {!isLogin && (
              <div className="role-switch-container">
                <div className={`role-switch-bg ${role === 'VENDOR' ? 'shift' : ''}`}></div>
                <button 
                  className={`role-btn ${role === 'BUYER' ? 'active' : ''}`} 
                  onClick={() => setRole('BUYER')}
                >
                  Buyer
                </button>
                <button 
                  className={`role-btn ${role === 'VENDOR' ? 'active' : ''}`} 
                  onClick={() => setRole('VENDOR')}
                >
                  Brand
                </button>
              </div>
            )}

            <form onSubmit={handleSubmit} noValidate>
              <div className={`form-group ${errors.email ? 'has-error' : ''}`}>
                <label>Email Address</label>
                <input 
                  type="email" 
                  name="email" 
                  autoComplete="email"
                  value={formData.email} 
                  onChange={handleInputChange} 
                  placeholder="name@example.com"
                />
                {errors.email && <span className="error-text">{errors.email}</span>}
              </div>

              <div className={`form-group ${errors.password ? 'has-error' : ''}`}>
                <label>Password</label>
                <input 
                  type="password" 
                  name="password" 
                  autoComplete="current-password"
                  value={formData.password} 
                  onChange={handleInputChange}
                  placeholder="Min. 8 characters"
                />
                {errors.password && <span className="error-text">{errors.password}</span>}
              </div>

              {!isLogin && role === 'VENDOR' && (
                <>
                  <div className={`form-group ${errors.brandName ? 'has-error' : ''}`}>
                    <label>Brand/Store Name</label>
                    <input 
                      type="text" 
                      name="brandName" 
                      value={formData.brandName} 
                      onChange={handleInputChange} 
                      placeholder="e.g. Alara Skincare"
                    />
                    {errors.brandName && <span className="error-text">{errors.brandName}</span>}
                  </div>
                  <div className={`form-group ${errors.storeSlug ? 'has-error' : ''}`}>
                    <label>Store URL Slug</label>
                    <input 
                      type="text" 
                      name="storeSlug" 
                      value={formData.storeSlug} 
                      onChange={handleInputChange} 
                      placeholder="e.g. alara-skincare"
                    />
                    {errors.storeSlug && <span className="error-text">{errors.storeSlug}</span>}
                  </div>
                </>
              )}

              {apiError && <div className="api-error-box">{apiError}</div>}

              <button type="submit" className="premium-submit-btn" disabled={loading}>
                {loading ? <span className="loader-dots"></span> : (isLogin ? 'Sign In' : 'Register Profile')}
              </button>
            </form>
          </div>
        </div>
      </main>
      <Footer currentLang="English" setLanguage={() => {}} />
    </div>
  );
};

export default AuthPage;
