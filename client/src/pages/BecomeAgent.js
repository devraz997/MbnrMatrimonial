import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAgent } from '../context/AgentContext';

const BecomeAgent = () => {
  const navigate = useNavigate();
  const { registerAsAgent, loading, error } = useAgent();
  
  const [formData, setFormData] = useState({
    businessName: '',
    experience: '',
    specialization: '',
    servingAreas: '',
    contactInfo: {
      phone: '',
      email: '',
      address: ''
    },
    description: ''
  });
  
  const [errors, setErrors] = useState({});
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    
    if (name.includes('.')) {
      const [parent, child] = name.split('.');
      setFormData({
        ...formData,
        [parent]: {
          ...formData[parent],
          [child]: value
        }
      });
    } else {
      setFormData({
        ...formData,
        [name]: value
      });
    }
  };
  
  const validate = () => {
    const newErrors = {};
    
    if (!formData.businessName.trim()) {
      newErrors.businessName = 'Business name is required';
    }
    
    if (!formData.experience) {
      newErrors.experience = 'Experience is required';
    } else if (isNaN(formData.experience) || Number(formData.experience) < 0) {
      newErrors.experience = 'Experience must be a positive number';
    }
    
    if (!formData.servingAreas.trim()) {
      newErrors.servingAreas = 'At least one serving area is required';
    }
    
    if (!formData.contactInfo.phone.trim()) {
      newErrors['contactInfo.phone'] = 'Phone number is required';
    }
    
    if (!formData.contactInfo.email.trim()) {
      newErrors['contactInfo.email'] = 'Email is required';
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(formData.contactInfo.email)) {
      newErrors['contactInfo.email'] = 'Invalid email address';
    }
    
    if (!formData.description.trim()) {
      newErrors.description = 'Description is required';
    } else if (formData.description.length > 1000) {
      newErrors.description = 'Description cannot exceed 1000 characters';
    }
    
    return newErrors;
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    
    // Clear errors
    setErrors({});
    
    try {
      // Format the data
      const agentData = {
        ...formData,
        experience: Number(formData.experience),
        specialization: formData.specialization.split(',').map(item => item.trim()),
        servingAreas: formData.servingAreas.split(',').map(item => item.trim())
      };
      
      // Register as agent
      await registerAsAgent(agentData);
      
      // Redirect to agent dashboard or profile
      navigate('/profile');
    } catch (err) {
      console.error('Failed to register as agent:', err);
    }
  };

  return (
    <div className="py-10 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto bg-white rounded-lg shadow-md p-8">
          <h2 className="text-3xl font-bold text-center mb-8">Become a Matrimonial Agent</h2>
          
          {error && (
            <div className="bg-red-100 text-red-700 p-4 rounded-lg mb-6">
              <p>{error}</p>
            </div>
          )}
          
          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="md:col-span-2">
                <label htmlFor="businessName" className="form-label">Business Name</label>
                <input
                  type="text"
                  id="businessName"
                  name="businessName"
                  value={formData.businessName}
                  onChange={handleChange}
                  className={`form-input ${errors.businessName ? 'border-red-500' : ''}`}
                />
                {errors.businessName && <p className="text-red-500 text-sm mt-1">{errors.businessName}</p>}
              </div>
              
              <div>
                <label htmlFor="experience" className="form-label">Years of Experience</label>
                <input
                  type="number"
                  id="experience"
                  name="experience"
                  value={formData.experience}
                  onChange={handleChange}
                  min="0"
                  className={`form-input ${errors.experience ? 'border-red-500' : ''}`}
                />
                {errors.experience && <p className="text-red-500 text-sm mt-1">{errors.experience}</p>}
              </div>
              
              <div>
                <label htmlFor="specialization" className="form-label">
                  Specialization (comma separated)
                </label>
                <input
                  type="text"
                  id="specialization"
                  name="specialization"
                  value={formData.specialization}
                  onChange={handleChange}
                  placeholder="e.g. Muslim, Hindu, Christian"
                  className="form-input"
                />
              </div>
              
              <div className="md:col-span-2">
                <label htmlFor="servingAreas" className="form-label">
                  Serving Areas (comma separated)
                </label>
                <input
                  type="text"
                  id="servingAreas"
                  name="servingAreas"
                  value={formData.servingAreas}
                  onChange={handleChange}
                  placeholder="e.g. Mumbai, Delhi, Bangalore"
                  className={`form-input ${errors.servingAreas ? 'border-red-500' : ''}`}
                />
                {errors.servingAreas && <p className="text-red-500 text-sm mt-1">{errors.servingAreas}</p>}
              </div>
              
              <div>
                <label htmlFor="contactInfo.phone" className="form-label">Phone Number</label>
                <input
                  type="tel"
                  id="contactInfo.phone"
                  name="contactInfo.phone"
                  value={formData.contactInfo.phone}
                  onChange={handleChange}
                  className={`form-input ${errors['contactInfo.phone'] ? 'border-red-500' : ''}`}
                />
                {errors['contactInfo.phone'] && <p className="text-red-500 text-sm mt-1">{errors['contactInfo.phone']}</p>}
              </div>
              
              <div>
                <label htmlFor="contactInfo.email" className="form-label">Email</label>
                <input
                  type="email"
                  id="contactInfo.email"
                  name="contactInfo.email"
                  value={formData.contactInfo.email}
                  onChange={handleChange}
                  className={`form-input ${errors['contactInfo.email'] ? 'border-red-500' : ''}`}
                />
                {errors['contactInfo.email'] && <p className="text-red-500 text-sm mt-1">{errors['contactInfo.email']}</p>}
              </div>
              
              <div className="md:col-span-2">
                <label htmlFor="contactInfo.address" className="form-label">Address (Optional)</label>
                <input
                  type="text"
                  id="contactInfo.address"
                  name="contactInfo.address"
                  value={formData.contactInfo.address}
                  onChange={handleChange}
                  className="form-input"
                />
              </div>
              
              <div className="md:col-span-2">
                <label htmlFor="description" className="form-label">Description</label>
                <textarea
                  id="description"
                  name="description"
                  rows="5"
                  value={formData.description}
                  onChange={handleChange}
                  className={`form-input ${errors.description ? 'border-red-500' : ''}`}
                  placeholder="Tell potential clients about your services, experience, and success stories..."
                ></textarea>
                {errors.description && <p className="text-red-500 text-sm mt-1">{errors.description}</p>}
                <p className="text-sm text-gray-500 mt-1">
                  {formData.description.length}/1000 characters
                </p>
              </div>
            </div>
            
            <div className="mt-8">
              <button
                type="submit"
                className="btn btn-primary w-full py-3"
                disabled={loading}
              >
                {loading ? 'Submitting...' : 'Register as Agent'}
              </button>
            </div>
            
            <div className="mt-4 text-center text-sm text-gray-600">
              <p>
                By registering as an agent, you agree to our Terms of Service and Privacy Policy.
                Your profile will be reviewed before being made public.
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default BecomeAgent;
