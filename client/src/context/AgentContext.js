import React, { createContext, useState, useContext } from 'react';
import api from '../services/api';

const AgentContext = createContext();

export const useAgent = () => useContext(AgentContext);

export const AgentProvider = ({ children }) => {
  const [agents, setAgents] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [currentAgent, setCurrentAgent] = useState(null);
  const [pagination, setPagination] = useState({
    page: 1,
    pages: 1,
    total: 0
  });

  // Get all agents with filters
  const getAgents = async (filters = {}) => {
    try {
      setLoading(true);
      setError(null);

      const queryParams = new URLSearchParams();
      
      // Add filters to query params
      Object.entries(filters).forEach(([key, value]) => {
        if (value) queryParams.append(key, value);
      });

      const response = await api.get(`/agents?${queryParams.toString()}`);
      
      setAgents(response.data.agents);
      setPagination({
        page: response.data.page,
        pages: response.data.pages,
        total: response.data.total
      });
      
      setLoading(false);
      return response.data;
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to fetch agents');
      setLoading(false);
      throw err;
    }
  };

  // Get agent by ID
  const getAgentById = async (id) => {
    try {
      setLoading(true);
      setError(null);

      const response = await api.get(`/agents/${id}`);
      setCurrentAgent(response.data);
      
      setLoading(false);
      return response.data;
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to fetch agent');
      setLoading(false);
      throw err;
    }
  };

  // Register as an agent
  const registerAsAgent = async (agentData) => {
    try {
      setLoading(true);
      setError(null);

      const response = await api.post('/agents', agentData);
      setCurrentAgent(response.data);
      
      setLoading(false);
      return response.data;
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to register as agent');
      setLoading(false);
      throw err;
    }
  };

  // Update agent profile
  const updateAgentProfile = async (agentData) => {
    try {
      setLoading(true);
      setError(null);

      const response = await api.put('/agents', agentData);
      setCurrentAgent(response.data);
      
      setLoading(false);
      return response.data;
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to update agent profile');
      setLoading(false);
      throw err;
    }
  };

  // Add review for an agent
  const addAgentReview = async (agentId, reviewData) => {
    try {
      setLoading(true);
      setError(null);

      const response = await api.post(`/agents/${agentId}/reviews`, reviewData);
      
      // Refresh agent data
      await getAgentById(agentId);
      
      setLoading(false);
      return response.data;
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to add review');
      setLoading(false);
      throw err;
    }
  };

  // Get agent's clients
  const getAgentClients = async () => {
    try {
      setLoading(true);
      setError(null);

      const response = await api.get('/agents/clients');
      
      setLoading(false);
      return response.data;
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to fetch clients');
      setLoading(false);
      throw err;
    }
  };

  // Add client to agent
  const addClient = async (userId) => {
    try {
      setLoading(true);
      setError(null);

      const response = await api.post(`/agents/clients/${userId}`);
      
      setLoading(false);
      return response.data;
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to add client');
      setLoading(false);
      throw err;
    }
  };

  return (
    <AgentContext.Provider
      value={{
        agents,
        loading,
        error,
        currentAgent,
        pagination,
        getAgents,
        getAgentById,
        registerAsAgent,
        updateAgentProfile,
        addAgentReview,
        getAgentClients,
        addClient
      }}
    >
      {children}
    </AgentContext.Provider>
  );
};

export default AgentContext;
