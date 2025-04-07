import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useVerification } from '../context/VerificationContext';

const VerificationRequest = () => {
  const navigate = useNavigate();
  const { submitVerification, getVerificationStatus, verifications, loading, error } = useVerification();
  
  const [formData, setFormData] = useState({
    documentType: 'id_card',
    documentNumber: '',
    documentImage: ''
  });
  
  const [errors, setErrors] = useState({});
  const [filePreview, setFilePreview] = useState(null);
  const [hasPendingRequest, setHasPendingRequest] = useState(false);
  
  useEffect(() => {
    // Check if user has any pending verification requests
    const checkVerificationStatus = async () => {
      try {
        await getVerificationStatus();
      } catch (err) {
        console.error('Failed to fetch verification status:', err);
      }
    };
    
    checkVerificationStatus();
  }, []);
  
  useEffect(() => {
    // Check if there's a pending verification
    if (verifications && verifications.length > 0) {
      const pendingVerification = verifications.find(v => v.status === 'pending');
      if (pendingVerification) {
        setHasPendingRequest(true);
      }
    }
  }, [verifications]);
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };
  
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Create a preview URL
      const previewUrl = URL.createObjectURL(file);
      setFilePreview(previewUrl);
      
      // In a real app, you would upload this file to a server/cloud storage
      // and get back a URL to store in formData
      // For this example, we'll just store the file name
      setFormData({
        ...formData,
        documentImage: file.name
      });
    }
  };
  
  const validate = () => {
    const newErrors = {};
    
    if (!formData.documentNumber.trim()) {
      newErrors.documentNumber = 'Document number is required';
    }
    
    if (!formData.documentImage) {
      newErrors.documentImage = 'Document image is required';
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
      // In a real app, you would first upload the image to a server/cloud storage
      // and then submit the verification request with the image URL
      
      await submitVerification(formData);
      
      // Redirect to profile or verification status page
      navigate('/profile');
    } catch (err) {
      console.error('Failed to submit verification request:', err);
    }
  };

  if (hasPendingRequest) {
    return (
      <div className="py-10 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-md p-8">
            <h2 className="text-2xl font-bold text-center mb-6">Verification Status</h2>
            
            <div className="bg-blue-100 text-blue-700 p-4 rounded-lg mb-6">
              <p>You already have a pending verification request. Our team is reviewing your documents.</p>
            </div>
            
            <div className="text-center">
              <button
                onClick={() => navigate('/profile')}
                className="btn btn-primary"
              >
                Back to Profile
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="py-10 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-md p-8">
          <h2 className="text-2xl font-bold text-center mb-6">Verify Your Identity</h2>
          
          <div className="mb-6">
            <p className="text-gray-700">
              To ensure trust and safety on our platform, we require identity verification.
              Please provide a valid government-issued ID document.
            </p>
          </div>
          
          {error && (
            <div className="bg-red-100 text-red-700 p-4 rounded-lg mb-6">
              <p>{error}</p>
            </div>
          )}
          
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label htmlFor="documentType" className="form-label">Document Type</label>
              <select
                id="documentType"
                name="documentType"
                value={formData.documentType}
                onChange={handleChange}
                className="form-input"
              >
                <option value="id_card">ID Card</option>
                <option value="passport">Passport</option>
                <option value="driver_license">Driver's License</option>
                <option value="business_license">Business License</option>
                <option value="other">Other</option>
              </select>
            </div>
            
            <div className="mb-4">
              <label htmlFor="documentNumber" className="form-label">Document Number</label>
              <input
                type="text"
                id="documentNumber"
                name="documentNumber"
                value={formData.documentNumber}
                onChange={handleChange}
                className={`form-input ${errors.documentNumber ? 'border-red-500' : ''}`}
              />
              {errors.documentNumber && <p className="text-red-500 text-sm mt-1">{errors.documentNumber}</p>}
            </div>
            
            <div className="mb-6">
              <label htmlFor="documentImage" className="form-label">Upload Document Image</label>
              <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
                <div className="space-y-1 text-center">
                  {filePreview ? (
                    <div>
                      <img
                        src={filePreview}
                        alt="Document preview"
                        className="mx-auto h-32 object-cover"
                      />
                      <p className="text-sm text-gray-500 mt-2">
                        Click "Choose File" to change
                      </p>
                    </div>
                  ) : (
                    <svg
                      className="mx-auto h-12 w-12 text-gray-400"
                      stroke="currentColor"
                      fill="none"
                      viewBox="0 0 48 48"
                      aria-hidden="true"
                    >
                      <path
                        d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                        strokeWidth={2}
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  )}
                  
                  <div className="flex text-sm text-gray-600">
                    <label
                      htmlFor="documentImage"
                      className="relative cursor-pointer bg-white rounded-md font-medium text-pink-600 hover:text-pink-500 focus-within:outline-none"
                    >
                      <span>Choose File</span>
                      <input
                        id="documentImage"
                        name="documentImage"
                        type="file"
                        className="sr-only"
                        accept="image/*"
                        onChange={handleFileChange}
                      />
                    </label>
                    <p className="pl-1">or drag and drop</p>
                  </div>
                  <p className="text-xs text-gray-500">
                    PNG, JPG, GIF up to 10MB
                  </p>
                </div>
              </div>
              {errors.documentImage && <p className="text-red-500 text-sm mt-1">{errors.documentImage}</p>}
            </div>
            
            <div className="mb-6">
              <div className="bg-yellow-50 p-4 rounded-lg">
                <div className="flex">
                  <div className="flex-shrink-0">
                    <svg className="h-5 w-5 text-yellow-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                      <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div className="ml-3">
                    <h3 className="text-sm font-medium text-yellow-800">Privacy Notice</h3>
                    <div className="mt-2 text-sm text-yellow-700">
                      <p>
                        Your document will only be used for verification purposes and will be handled according to our privacy policy.
                        We do not share your documents with other users.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            <div>
              <button
                type="submit"
                className="btn btn-primary w-full py-3"
                disabled={loading}
              >
                {loading ? 'Submitting...' : 'Submit for Verification'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default VerificationRequest;
