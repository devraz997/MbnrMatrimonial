import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAgent } from '../context/AgentContext';

const AgentDirectory = () => {
  const { agents, loading, error, pagination, getAgents } = useAgent();
  
  const [filters, setFilters] = useState({
    specialization: '',
    location: '',
    rating: '',
    verified: false,
    page: 1
  });
  
  useEffect(() => {
    getAgents(filters);
  }, [filters.page]); // Only reload when page changes
  
  const handleFilterChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFilters({
      ...filters,
      [name]: type === 'checkbox' ? checked : value
    });
  };
  
  const applyFilters = () => {
    setFilters({
      ...filters,
      page: 1 // Reset to first page when applying new filters
    });
    getAgents(filters);
  };
  
  const resetFilters = () => {
    setFilters({
      specialization: '',
      location: '',
      rating: '',
      verified: false,
      page: 1
    });
    getAgents({});
  };
  
  const handlePageChange = (newPage) => {
    if (newPage > 0 && newPage <= pagination.pages) {
      setFilters({
        ...filters,
        page: newPage
      });
    }
  };

  return (
    <div className="py-10 bg-gray-50">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-10">Find a Matrimonial Agent</h2>
        
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Filters */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-xl font-semibold mb-4">Filter Agents</h3>
              
              <div className="mb-4">
                <label className="form-label">Specialization</label>
                <input
                  type="text"
                  name="specialization"
                  placeholder="e.g. Muslim, Hindu, Christian"
                  value={filters.specialization}
                  onChange={handleFilterChange}
                  className="form-input"
                />
              </div>
              
              <div className="mb-4">
                <label className="form-label">Location</label>
                <input
                  type="text"
                  name="location"
                  placeholder="City or State"
                  value={filters.location}
                  onChange={handleFilterChange}
                  className="form-input"
                />
              </div>
              
              <div className="mb-4">
                <label className="form-label">Minimum Rating</label>
                <select
                  name="rating"
                  value={filters.rating}
                  onChange={handleFilterChange}
                  className="form-input"
                >
                  <option value="">Any Rating</option>
                  <option value="5">5 Stars</option>
                  <option value="4">4+ Stars</option>
                  <option value="3">3+ Stars</option>
                  <option value="2">2+ Stars</option>
                  <option value="1">1+ Star</option>
                </select>
              </div>
              
              <div className="mb-6">
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    name="verified"
                    checked={filters.verified}
                    onChange={handleFilterChange}
                    className="mr-2"
                  />
                  <span>Verified Agents Only</span>
                </label>
              </div>
              
              <div className="flex space-x-2">
                <button 
                  onClick={applyFilters}
                  className="btn btn-primary flex-1"
                >
                  Apply Filters
                </button>
                <button 
                  onClick={resetFilters}
                  className="btn btn-secondary"
                >
                  Reset
                </button>
              </div>
            </div>
          </div>
          
          {/* Results */}
          <div className="lg:col-span-3">
            {loading ? (
              <div className="text-center py-10">
                <p className="text-lg">Loading agents...</p>
              </div>
            ) : error ? (
              <div className="bg-red-100 text-red-700 p-4 rounded-lg">
                <p>{error}</p>
              </div>
            ) : agents.length === 0 ? (
              <div className="bg-white rounded-lg shadow-md p-6 text-center">
                <p className="text-lg text-gray-600">No agents match your search criteria.</p>
                <button 
                  onClick={resetFilters}
                  className="btn btn-primary mt-4"
                >
                  Reset Filters
                </button>
              </div>
            ) : (
              <>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {agents.map(agent => (
                    <div key={agent._id} className="bg-white rounded-lg shadow-md overflow-hidden">
                      <div className="p-6">
                        <div className="flex justify-between items-start mb-2">
                          <h3 className="text-xl font-semibold">{agent.businessName}</h3>
                          {agent.isVerified && (
                            <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full flex items-center">
                              <svg className="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                              </svg>
                              Verified
                            </span>
                          )}
                        </div>
                        
                        <div className="mb-4 text-sm text-gray-600">
                          <p>
                            <span className="font-medium">Experience:</span> {agent.experience} years
                          </p>
                          <p>
                            <span className="font-medium">Areas:</span> {agent.servingAreas.join(', ')}
                          </p>
                          <p>
                            <span className="font-medium">Specialization:</span> {agent.specialization.join(', ')}
                          </p>
                        </div>
                        
                        <div className="flex items-center mb-4">
                          <div className="flex">
                            {[1, 2, 3, 4, 5].map(star => (
                              <svg 
                                key={star}
                                className={`w-5 h-5 ${star <= Math.round(agent.rating) ? 'text-yellow-400' : 'text-gray-300'}`}
                                fill="currentColor" 
                                viewBox="0 0 20 20"
                              >
                                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                              </svg>
                            ))}
                          </div>
                          <span className="ml-2 text-gray-600">
                            {agent.rating.toFixed(1)} ({agent.reviews.length} reviews)
                          </span>
                        </div>
                        
                        <p className="text-gray-700 mb-4 line-clamp-2">{agent.description}</p>
                        
                        <div className="flex space-x-2">
                          <Link 
                            to={`/agents/${agent._id}`}
                            className="btn btn-primary flex-1"
                          >
                            View Profile
                          </Link>
                          <Link 
                            to={`/contact-agent/${agent._id}`}
                            className="btn btn-secondary flex-1"
                          >
                            Contact
                          </Link>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                
                {/* Pagination */}
                {pagination.pages > 1 && (
                  <div className="flex justify-center mt-8">
                    <nav className="flex items-center">
                      <button
                        onClick={() => handlePageChange(filters.page - 1)}
                        disabled={filters.page === 1}
                        className={`px-3 py-1 rounded-l-md border ${
                          filters.page === 1 
                            ? 'bg-gray-100 text-gray-400 cursor-not-allowed' 
                            : 'bg-white text-gray-700 hover:bg-gray-50'
                        }`}
                      >
                        Previous
                      </button>
                      
                      {[...Array(pagination.pages).keys()].map(page => (
                        <button
                          key={page + 1}
                          onClick={() => handlePageChange(page + 1)}
                          className={`px-3 py-1 border-t border-b ${
                            filters.page === page + 1
                              ? 'bg-pink-600 text-white'
                              : 'bg-white text-gray-700 hover:bg-gray-50'
                          }`}
                        >
                          {page + 1}
                        </button>
                      ))}
                      
                      <button
                        onClick={() => handlePageChange(filters.page + 1)}
                        disabled={filters.page === pagination.pages}
                        className={`px-3 py-1 rounded-r-md border ${
                          filters.page === pagination.pages
                            ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                            : 'bg-white text-gray-700 hover:bg-gray-50'
                        }`}
                      >
                        Next
                      </button>
                    </nav>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AgentDirectory;
