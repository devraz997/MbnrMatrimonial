import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Register = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    gender: '',
    dob: '',
    agreeTerms: false
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value
    });
  };

  const validate = () => {
    const newErrors = {};
    
    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }
    
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(formData.email)) {
      newErrors.email = 'Invalid email address';
    }
    
    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }
    
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }
    
    if (!formData.gender) {
      newErrors.gender = 'Please select your gender';
    }
    
    if (!formData.dob) {
      newErrors.dob = 'Date of birth is required';
    }
    
    if (!formData.agreeTerms) {
      newErrors.agreeTerms = 'You must agree to the terms and conditions';
    }
    
    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    
    // Clear errors
    setErrors({});
    
    // Here you would typically send the data to your API
    console.log('Form submitted:', formData);
    
    // For now, just show an alert
    alert('Registration successful! Please check your email to verify your account.');
  };

  return (
    <div className="py-10 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="max-w-md mx-auto bg-white rounded-lg shadow-md p-6">
          <h2 className="text-2xl font-bold text-center mb-6">Create Your Account</h2>
          
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label htmlFor="name" className="form-label">Full Name</label>
              <input
                type="text"
                id="name"
                name="name"
                className={`form-input ${errors.name ? 'border-red-500' : ''}`}
                value={formData.name}
                onChange={handleChange}
              />
              {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
            </div>
            
            <div className="mb-4">
              <label htmlFor="email" className="form-label">Email Address</label>
              <input
                type="email"
                id="email"
                name="email"
                className={`form-input ${errors.email ? 'border-red-500' : ''}`}
                value={formData.email}
                onChange={handleChange}
              />
              {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
            </div>
            
            <div className="mb-4">
              <label htmlFor="password" className="form-label">Password</label>
              <input
                type="password"
                id="password"
                name="password"
                className={`form-input ${errors.password ? 'border-red-500' : ''}`}
                value={formData.password}
                onChange={handleChange}
              />
              {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password}</p>}
            </div>
            
            <div className="mb-4">
              <label htmlFor="confirmPassword" className="form-label">Confirm Password</label>
              <input
                type="password"
                id="confirmPassword"
                name="confirmPassword"
                className={`form-input ${errors.confirmPassword ? 'border-red-500' : ''}`}
                value={formData.confirmPassword}
                onChange={handleChange}
              />
              {errors.confirmPassword && <p className="text-red-500 text-sm mt-1">{errors.confirmPassword}</p>}
            </div>
            
            <div className="mb-4">
              <label className="form-label">Gender</label>
              <div className="flex space-x-4">
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="gender"
                    value="male"
                    checked={formData.gender === 'male'}
                    onChange={handleChange}
                    className="mr-2"
                  />
                  Male
                </label>
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="gender"
                    value="female"
                    checked={formData.gender === 'female'}
                    onChange={handleChange}
                    className="mr-2"
                  />
                  Female
                </label>
              </div>
              {errors.gender && <p className="text-red-500 text-sm mt-1">{errors.gender}</p>}
            </div>
            
            <div className="mb-4">
              <label htmlFor="dob" className="form-label">Date of Birth</label>
              <input
                type="date"
                id="dob"
                name="dob"
                className={`form-input ${errors.dob ? 'border-red-500' : ''}`}
                value={formData.dob}
                onChange={handleChange}
              />
              {errors.dob && <p className="text-red-500 text-sm mt-1">{errors.dob}</p>}
            </div>
            
            <div className="mb-6">
              <label className="flex items-center">
                <input
                  type="checkbox"
                  name="agreeTerms"
                  checked={formData.agreeTerms}
                  onChange={handleChange}
                  className="mr-2"
                />
                <span className={errors.agreeTerms ? 'text-red-500' : ''}>
                  I agree to the <a href="#" className="text-pink-600 hover:underline">Terms and Conditions</a>
                </span>
              </label>
              {errors.agreeTerms && <p className="text-red-500 text-sm mt-1">{errors.agreeTerms}</p>}
            </div>
            
            <button type="submit" className="w-full btn btn-primary py-3">
              Create Account
            </button>
          </form>
          
          <p className="text-center mt-4">
            Already have an account? <Link to="/login" className="text-pink-600 hover:underline">Login</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;
