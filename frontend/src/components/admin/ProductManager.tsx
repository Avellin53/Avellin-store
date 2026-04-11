import React, { useState } from 'react';
import { useStore } from '../../store/useStore';
import type { Product } from '../../store/useStore';
import { Edit2, Trash2, Plus } from 'lucide-react';
import './AdminStyles.css';

const ProductManager: React.FC = () => {
  const { products, addProduct, updateProduct, deleteProduct } = useStore();
  const [isEditing, setIsEditing] = useState<string | null>(null);
  const [formData, setFormData] = useState<Omit<Product, 'id'>>({
    name: '', category: 'Clothing', price: 0, image: '', seller: ''
  });

  const handleEdit = (product: Product) => {
    setIsEditing(product.id);
    setFormData({
      name: product.name,
      category: product.category,
      price: product.price,
      image: product.image,
      seller: product.seller
    });
  };

  const handleDelete = (id: string) => {
    if (confirm('Are you sure you want to delete this product?')) {
      deleteProduct(id);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isEditing) {
      updateProduct(isEditing, formData);
      setIsEditing(null);
    } else {
      addProduct(formData);
    }
    setFormData({ name: '', category: 'Clothing', price: 0, image: '', seller: '' });
  };

  return (
    <div className="admin-product-manager">
      <div className="pm-header">
        <h2>Products</h2>
        <button className="btn btn-primary" onClick={() => setIsEditing(null)}>
          <Plus size={16} /> Add New Product
        </button>
      </div>

      <div className="pm-layout">
        <div className="pm-form-panel">
          <h3>{isEditing ? 'Edit Product' : 'Add Product'}</h3>
          <form onSubmit={handleSubmit} className="pm-form">
            <div className="form-group">
              <label>Product Name</label>
              <input type="text" required value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} />
            </div>
            <div className="form-group">
              <label>Category</label>
              <select value={formData.category} onChange={(e) => setFormData({...formData, category: e.target.value})}>
                <option value="Clothing">Clothing</option>
                <option value="Skincare">Skincare</option>
                <option value="Bags">Bags</option>
                <option value="Makeup">Makeup</option>
                <option value="Shoes">Shoes</option>
                <option value="Accessories">Accessories</option>
              </select>
            </div>
            <div className="form-group">
              <label>Price ($)</label>
              <input type="number" required value={formData.price} onChange={(e) => setFormData({...formData, price: Number(e.target.value)})} />
            </div>
            <div className="form-group">
              <label>Seller Name</label>
              <input type="text" required value={formData.seller} onChange={(e) => setFormData({...formData, seller: e.target.value})} />
            </div>
            <div className="form-group">
              <label>Image URL</label>
              <input type="text" required value={formData.image} onChange={(e) => setFormData({...formData, image: e.target.value})} />
            </div>
            <div className="form-actions">
              {isEditing && <button type="button" className="btn btn-secondary" onClick={() => {setIsEditing(null); setFormData({name: '', category: 'Clothing', price: 0, image: '', seller: ''})}}>Cancel</button>}
              <button type="submit" className="btn btn-primary">{isEditing ? 'Save Changes' : 'Add Product'}</button>
            </div>
          </form>
        </div>

        <div className="pm-table-panel">
          <table className="admin-table">
            <thead>
              <tr>
                <th>Product</th>
                <th>Category</th>
                <th>Price</th>
                <th>Seller</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {products.map(p => (
                <tr key={p.id}>
                  <td className="product-cell">
                    <img src={p.image} alt={p.name} className="product-thumb" />
                    <span>{p.name}</span>
                  </td>
                  <td>{p.category}</td>
                  <td>${p.price}</td>
                  <td>{p.seller}</td>
                  <td className="actions-cell">
                    <button onClick={() => handleEdit(p)} className="action-btn edit" title="Edit"><Edit2 size={16} /></button>
                    <button onClick={() => handleDelete(p.id)} className="action-btn delete" title="Delete"><Trash2 size={16} /></button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ProductManager;
