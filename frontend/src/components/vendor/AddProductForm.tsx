import React, { useState } from 'react';
import { Upload, AlertCircle, Check } from 'lucide-react';

interface AddProductFormProps {
  onComplete: () => void;
}

const AddProductForm: React.FC<AddProductFormProps> = ({ onComplete }) => {
  const [formData, setFormData] = useState({
    name: '',
    category: 'FASHION',
    basePrice: '',
    stockQuantity: '',
    description: '',
    imageUrl: '',
    tags: ''
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);

  const validate = () => {
    const newErrors: Record<string, string> = {};
    
    // Data Sanitization & Validation
    if (!formData.name.trim()) newErrors.name = 'Product name is required';
    
    const price = parseFloat(formData.basePrice);
    if (isNaN(price) || price <= 0) newErrors.basePrice = 'Enter a valid positive price';
    
    const stock = parseInt(formData.stockQuantity);
    if (isNaN(stock) || stock < 0) newErrors.stockQuantity = 'Stock cannot be negative';

    if (!formData.imageUrl.startsWith('http')) newErrors.imageUrl = 'Enter a valid image URL';
    
    if (formData.description.length < 20) newErrors.description = 'Description must be at least 20 characters';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      setSuccess(true);
      setTimeout(() => onComplete(), 1500);
    }, 2000);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    if (errors[e.target.name]) setErrors({ ...errors, [e.target.name]: '' });
  };

  if (success) {
    return (
      <div className="form-success-view">
        <div className="success-icon"><Check size={48} /></div>
        <h3>Product Listed Successfully</h3>
        <p>Your item is now live on the AVELLIN marketplace.</p>
      </div>
    );
  }

  return (
    <div className="add-product-container shadow-glass">
      <form onSubmit={handleSubmit} noValidate>
        <div className="form-grid">
          <div className="form-column">
             <div className={`form-group ${errors.name ? 'has-error' : ''}`}>
                <label>Product Name</label>
                <input type="text" name="name" value={formData.name} onChange={handleInputChange} placeholder="e.g. Midnight Mesh Gown" />
                {errors.name && <span className="error-hint"><AlertCircle size={12}/> {errors.name}</span>}
             </div>

             <div className="form-row">
                <div className={`form-group ${errors.basePrice ? 'has-error' : ''}`}>
                  <label>Price (USD)</label>
                  <input type="number" name="basePrice" value={formData.basePrice} onChange={handleInputChange} placeholder="0.00" />
                  {errors.basePrice && <span className="error-hint">{errors.basePrice}</span>}
                </div>
                <div className={`form-group ${errors.stockQuantity ? 'has-error' : ''}`}>
                  <label>Initial Stock</label>
                  <input type="number" name="stockQuantity" value={formData.stockQuantity} onChange={handleInputChange} placeholder="0" />
                  {errors.stockQuantity && <span className="error-hint">{errors.stockQuantity}</span>}
                </div>
             </div>

             <div className="form-group">
                <label>Category</label>
                <select name="category" value={formData.category} onChange={handleInputChange}>
                  <option value="FASHION">Fashion</option>
                  <option value="SKINCARE">Skincare</option>
                </select>
             </div>
          </div>

          <div className="form-column">
             <div className={`form-group ${errors.imageUrl ? 'has-error' : ''}`}>
                <label>Product Image URL</label>
                <input type="url" name="imageUrl" value={formData.imageUrl} onChange={handleInputChange} placeholder="https://..." />
                {errors.imageUrl && <span className="error-hint">{errors.imageUrl}</span>}
             </div>

             <div className={`form-group ${errors.description ? 'has-error' : ''}`}>
                <label>Detail Description</label>
                <textarea name="description" value={formData.description} onChange={handleInputChange} rows={4} placeholder="Describe the materials, fit, or skin benefits..." />
                {errors.description && <span className="error-hint">{errors.description}</span>}
             </div>
          </div>
        </div>

        <div className="form-footer">
          <button type="submit" className="submit-product-btn" disabled={isSubmitting}>
            {isSubmitting ? 'Verifying & Uploading...' : 'Publish to Marketplace'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddProductForm;
