import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useAgent } from '../context/AgentContext';

const AgentProfile = () => {
  const { id } = useParams();
  const { currentAgent, loading, error, getAgentById, addAgentReview } = useAgent();
  
  const [reviewForm, setReviewForm] = useState({
    rating: 5,
    comment: ''
  });
  
  const [reviewSubmitted, setReviewSubmitted] = useState(false);
  
  useEffect(() => {
    getAgentById(id);
  }, [id]);
  
  const handleReviewChange = (e) => {
    const { name, value } = e.target;
    setReviewForm({
      ...reviewForm,
      [name]: value
    });
  };
  
  const handleReviewSubmit = async (e) => {
    e.preventDefault();
    try {
      await addAgentReview(id, reviewForm);
      setReviewForm({
        rating: 5,
        comment: ''
      });
      setReviewSubmitted(true);
    } catch (error) {
      console.error('Failed to submit review:', error);
    }
  };

  if (loading) {
    return (
      <div className="py-10 bg-gray-50 text-center">
        <div className="container mx-auto px-4">
          <p className="text-lg">Loading agent profile...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="py-10 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="bg-red-100 text-red-700 p-4 rounded-lg">
            <p>{error}</p>
          </div>
        </div>
      </div>
    );
  }

  if (!currentAgent) {
    return (
      <div className="py-10 bg-gray-50 text-center">
        <div className="container mx-auto px-4">
          <p className="text-lg">Agent not found</p>
          <Link to="/agents" className="btn btn-primary mt-4">
            Back to Agent Directory
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="py-10 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          {/* Agent Header */}
          <div className="relative">
            <div className="h-48 bg-gradient-to-r from-pink-500 to-purple-600"></div>
            <div className="absolute bottom-0 left-0 w-full transform translate-y-1/2 flex justify-center">
              <div className="w-32 h-32 rounded-full border-4 border-white bg-gray-200 flex items-center justify-center text-4xl font-bold text-gray-400">
                {currentAgent.businessName.charAt(0)}
              </div>
            </div>
          </div>
          
          {/* Agent Info */}
          <div className="mt-20 px-6 py-4">
            <div className="text-center mb-6">
              <h1 className="text-3xl font-bold">{currentAgent.businessName}</h1>
              <div className="flex items-center justify-center mt-2">
                <div className="flex">
                  {[1, 2, 3, 4, 5].map(star => (
                    <svg 
                      key={star}
                      className={`w-5 h-5 ${star <= Math.round(currentAgent.rating) ? 'text-yellow-400' : 'text-gray-300'}`}
                      fill="currentColor" 
                      viewBox="0 0 20 20"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                <span className="ml-2 text-gray-600">
                  {currentAgent.rating.toFixed(1)} ({currentAgent.reviews.length} reviews)
                </span>
              </div>
              {currentAgent.isVerified && (
                <span className="inline-flex items-center bg-green-100 text-green-800 text-sm px-3 py-1 rounded-full mt-2">
                  <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  Verified Agent
                </span>
              )}
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
              <div>
                <h2 className="text-xl font-semibold mb-4">About</h2>
                <p className="text-gray-700 mb-4">{currentAgent.description}</p>
                
                <h3 className="text-lg font-semibold mb-2">Specialization</h3>
                <div className="flex flex-wrap gap-2 mb-4">
                  {currentAgent.specialization.map((item, index) => (
                    <span key={index} className="bg-pink-100 text-pink-800 px-3 py-1 rounded-full text-sm">
                      {item}
                    </span>
                  ))}
                </div>
                
                <h3 className="text-lg font-semibold mb-2">Serving Areas</h3>
                <div className="flex flex-wrap gap-2">
                  {currentAgent.servingAreas.map((area, index) => (
                    <span key={index} className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">
                      {area}
                    </span>
                  ))}
                </div>
              </div>
              
              <div>
                <h2 className="text-xl font-semibold mb-4">Details</h2>
                
                <div className="space-y-3">
                  <div className="grid grid-cols-2">
                    <span className="text-gray-600">Experience:</span>
                    <span>{currentAgent.experience} years</span>
                  </div>
                  
                  <div className="grid grid-cols-2">
                    <span className="text-gray-600">Clients:</span>
                    <span>{currentAgent.clientCount}</span>
                  </div>
                  
                  <div className="grid grid-cols-2">
                    <span className="text-gray-600">Successful Matches:</span>
                    <span>{currentAgent.successfulMatches}</span>
                  </div>
                  
                  <div className="grid grid-cols-2">
                    <span className="text-gray-600">Contact:</span>
                    <span>{currentAgent.contactInfo.phone}</span>
                  </div>
                  
                  <div className="grid grid-cols-2">
                    <span className="text-gray-600">Email:</span>
                    <span>{currentAgent.contactInfo.email}</span>
                  </div>
                  
                  {currentAgent.contactInfo.address && (
                    <div className="grid grid-cols-2">
                      <span className="text-gray-600">Address:</span>
                      <span>{currentAgent.contactInfo.address}</span>
                    </div>
                  )}
                </div>
                
                <div className="mt-6">
                  <Link to={`/contact-agent/${currentAgent._id}`} className="btn btn-primary w-full">
                    Contact Agent
                  </Link>
                </div>
              </div>
            </div>
            
            {/* Reviews Section */}
            <div className="border-t pt-8">
              <h2 className="text-2xl font-semibold mb-6">Reviews</h2>
              
              {currentAgent.reviews.length === 0 ? (
                <p className="text-gray-600 mb-8">No reviews yet. Be the first to review this agent!</p>
              ) : (
                <div className="space-y-6 mb-8">
                  {currentAgent.reviews.map((review, index) => (
                    <div key={index} className="border-b pb-6 last:border-b-0">
                      <div className="flex justify-between items-start">
                        <div>
                          <div className="flex items-center">
                            <div className="font-medium">{review.userId?.name || 'Anonymous'}</div>
                            <span className="mx-2 text-gray-300">•</span>
                            <div className="text-sm text-gray-500">
                              {new Date(review.date).toLocaleDateString()}
                            </div>
                          </div>
                          <div className="flex mt-1">
                            {[1, 2, 3, 4, 5].map(star => (
                              <svg 
                                key={star}
                                className={`w-4 h-4 ${star <= review.rating ? 'text-yellow-400' : 'text-gray-300'}`}
                                fill="currentColor" 
                                viewBox="0 0 20 20"
                              >
                                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                              </svg>
                            ))}
                          </div>
                        </div>
                      </div>
                      <p className="mt-3 text-gray-700">{review.comment}</p>
                    </div>
                  ))}
                </div>
              )}
              
              {/* Add Review Form */}
              <div className="bg-gray-50 p-6 rounded-lg">
                <h3 className="text-xl font-semibold mb-4">Write a Review</h3>
                
                {reviewSubmitted ? (
                  <div className="bg-green-100 text-green-700 p-4 rounded-lg mb-4">
                    <p>Thank you for your review!</p>
                  </div>
                ) : (
                  <form onSubmit={handleReviewSubmit}>
                    <div className="mb-4">
                      <label className="form-label">Rating</label>
                      <div className="flex">
                        {[1, 2, 3, 4, 5].map(star => (
                          <button
                            key={star}
                            type="button"
                            onClick={() => setReviewForm({ ...reviewForm, rating: star })}
                            className="focus:outline-none"
                          >
                            <svg 
                              className={`w-8 h-8 ${star <= reviewForm.rating ? 'text-yellow-400' : 'text-gray-300'}`}
                              fill="currentColor" 
                              viewBox="0 0 20 20"
                            >
                              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                            </svg>
                          </button>
                        ))}
                      </div>
                    </div>
                    
                    <div className="mb-4">
                      <label htmlFor="comment" className="form-label">Your Review</label>
                      <textarea
                        id="comment"
                        name="comment"
                        rows="4"
                        value={reviewForm.comment}
                        onChange={handleReviewChange}
                        className="form-input"
                        placeholder="Share your experience with this agent..."
                        required
                      ></textarea>
                    </div>
                    
                    <button type="submit" className="btn btn-primary">
                      Submit Review
                    </button>
                  </form>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AgentProfile;
