import React, { createContext, useState, useContext } from 'react';
import api from '../services/api';

const VerificationContext = createContext();

export const useVerification = () => useContext(VerificationContext);

export const VerificationProvider = ({ children }) => {
  const [verifications, setVerifications] = useState([]);
  const [pendingVerifications, setPendingVerifications] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Submit verification documents
  const submitVerification = async (verificationData) => {
    try {
      setLoading(true);
      setError(null);

      const response = await api.post('/verification', verificationData);
      
      // Update verifications list
      await getVerificationStatus();
      
      setLoading(false);
      return response.data;
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to submit verification');
      setLoading(false);
      throw err;
    }
  };

  // Get user's verification status
  const getVerificationStatus = async () => {
    try {
      setLoading(true);
      setError(null);

      const response = await api.get('/verification/status');
      setVerifications(response.data);
      
      setLoading(false);
      return response.data;
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to fetch verification status');
      setLoading(false);
      throw err;
    }
  };

  // Get all pending verifications (admin only)
  const getPendingVerifications = async () => {
    try {
      setLoading(true);
      setError(null);

      const response = await api.get('/verification/pending');
      setPendingVerifications(response.data);
      
      setLoading(false);
      return response.data;
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to fetch pending verifications');
      setLoading(false);
      throw err;
    }
  };

  // Process verification (approve/reject) (admin only)
  const processVerification = async (verificationId, status, rejectionReason) => {
    try {
      setLoading(true);
      setError(null);

      const response = await api.put(`/verification/${verificationId}`, {
        status,
        rejectionReason
      });
      
      // Refresh pending verifications
      await getPendingVerifications();
      
      setLoading(false);
      return response.data;
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to process verification');
      setLoading(false);
      throw err;
    }
  };

  return (
    <VerificationContext.Provider
      value={{
        verifications,
        pendingVerifications,
        loading,
        error,
        submitVerification,
        getVerificationStatus,
        getPendingVerifications,
        processVerification
      }}
    >
      {children}
    </VerificationContext.Provider>
  );
};

export default VerificationContext;
