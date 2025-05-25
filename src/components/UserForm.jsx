import React, { useState, useEffect } from 'react';
import { validateUser, sanitizeUserData } from '../utils/validation';

const UserForm = ({ user, onSubmit, onCancel, isLoading }) => {
  const [formData, setFormData] = useState({
    name: '',
    username: '',
    email: '',
    phone: '',
    website: '',
    company: '',
    street: '',
    city: '',
    zipcode: ''
  });

  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});

  useEffect(() => {
    if (user) {
      setFormData({
        name: user.name || '',
        username: user.username || '',
        email: user.email || '',
        phone: user.phone || '',
        website: user.website || '',
        company: user.company || '',
        street: user.street || '',
        city: user.city || '',
        zipcode: user.zipcode || ''
      });
    }
  }, [user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));

    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const handleBlur = (e) => {
    const { name } = e.target;
    setTouched(prev => ({
      ...prev,
      [name]: true
    }));

    const sanitizedData = sanitizeUserData(formData);
    const validation = validateUser(sanitizedData);
    if (validation.errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: validation.errors[name]
      }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    const sanitizedData = sanitizeUserData(formData);
    
    const validation = validateUser(sanitizedData);
    
    if (!validation.isValid) {
      setErrors(validation.errors);
      setTouched(Object.keys(formData).reduce((acc, key) => {
        acc[key] = true;
        return acc;
      }, {}));
      return;
    }

    setErrors({});
    onSubmit(sanitizedData);
  };

  const handleReset = () => {
    setFormData({
      name: '',
      username: '',
      email: '',
      phone: '',
      website: '',
      company: '',
      street: '',
      city: '',
      zipcode: ''
    });
    setErrors({});
    setTouched({});
  };

  return (
    <form className="user-form" onSubmit={handleSubmit}>
      <div className="form-group">
        <label htmlFor="name">
          Full Name <span style={{ color: '#dc3545' }}>*</span>
        </label>
        <input
          type="text"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          onBlur={handleBlur}
          placeholder="Enter full name"
          disabled={isLoading}
        />
        {touched.name && errors.name && (
          <div className="form-error">{errors.name}</div>
        )}
      </div>

      <div className="form-group">
        <label htmlFor="username">
          Username <span style={{ color: '#dc3545' }}>*</span>
        </label>
        <input
          type="text"
          id="username"
          name="username"
          value={formData.username}
          onChange={handleChange}
          onBlur={handleBlur}
          placeholder="Enter username"
          disabled={isLoading}
        />
        {touched.username && errors.username && (
          <div className="form-error">{errors.username}</div>
        )}
      </div>

      <div className="form-group">
        <label htmlFor="email">
          Email <span style={{ color: '#dc3545' }}>*</span>
        </label>
        <input
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          onBlur={handleBlur}
          placeholder="Enter email address"
          disabled={isLoading}
        />
        {touched.email && errors.email && (
          <div className="form-error">{errors.email}</div>
        )}
      </div>

      <div className="form-group">
        <label htmlFor="phone">
          Phone <span style={{ color: '#dc3545' }}>*</span>
        </label>
        <input
          type="text"
          id="phone"
          name="phone"
          value={formData.phone}
          onChange={handleChange}
          onBlur={handleBlur}
          placeholder="Enter phone number"
          disabled={isLoading}
        />
        {touched.phone && errors.phone && (
          <div className="form-error">{errors.phone}</div>
        )}
      </div>

      <div className="form-group">
        <label htmlFor="website">Website</label>
        <input
          type="text"
          id="website"
          name="website"
          value={formData.website}
          onChange={handleChange}
          onBlur={handleBlur}
          placeholder="Enter website URL"
          disabled={isLoading}
        />
        {touched.website && errors.website && (
          <div className="form-error">{errors.website}</div>
        )}
      </div>

      <div className="form-group">
        <label htmlFor="company">Company</label>
        <input
          type="text"
          id="company"
          name="company"
          value={formData.company}
          onChange={handleChange}
          onBlur={handleBlur}
          placeholder="Enter company name"
          disabled={isLoading}
        />
        {touched.company && errors.company && (
          <div className="form-error">{errors.company}</div>
        )}
      </div>

      <div className="form-group">
        <label htmlFor="street">
          Street Address <span style={{ color: '#dc3545' }}>*</span>
        </label>
        <input
          type="text"
          id="street"
          name="street"
          value={formData.street}
          onChange={handleChange}
          onBlur={handleBlur}
          placeholder="Enter street address"
          disabled={isLoading}
        />
        {touched.street && errors.street && (
          <div className="form-error">{errors.street}</div>
        )}
      </div>

      <div className="form-group">
        <label htmlFor="city">
          City <span style={{ color: '#dc3545' }}>*</span>
        </label>
        <input
          type="text"
          id="city"
          name="city"
          value={formData.city}
          onChange={handleChange}
          onBlur={handleBlur}
          placeholder="Enter city"
          disabled={isLoading}
        />
        {touched.city && errors.city && (
          <div className="form-error">{errors.city}</div>
        )}
      </div>

      <div className="form-group">
        <label htmlFor="zipcode">
          Zipcode <span style={{ color: '#dc3545' }}>*</span>
        </label>
        <input
          type="text"
          id="zipcode"
          name="zipcode"
          value={formData.zipcode}
          onChange={handleChange}
          onBlur={handleBlur}
          placeholder="Enter zipcode"
          disabled={isLoading}
        />
        {touched.zipcode && errors.zipcode && (
          <div className="form-error">{errors.zipcode}</div>
        )}
      </div>

      <div className="form-actions">
        <button
          type="button"
          className="btn btn-secondary"
          onClick={onCancel}
          disabled={isLoading}
        >
          Cancel
        </button>
        {!user && (
          <button
            type="button"
            className="btn btn-secondary"
            onClick={handleReset}
            disabled={isLoading}
          >
            Reset
          </button>
        )}
        <button
          type="submit"
          className="btn btn-success"
          disabled={isLoading}
        >
          {isLoading ? (
            <>
              <i className="fas fa-spinner fa-spin"></i>
              {user ? 'Updating...' : 'Creating...'}
            </>
          ) : (
            <>
              {user ? 'Update User' : 'Create User'}
            </>
          )}
        </button>
      </div>
    </form>
  );
};

export default UserForm;