import React, { useState } from 'react';

// Mock user profile data
const mockUserProfile = {
  id: 1,
  name: 'Priya Sharma',
  age: 28,
  gender: 'Female',
  location: 'Mumbai, Maharashtra',
  religion: 'Hindu',
  caste: 'Brahmin',
  maritalStatus: 'Never Married',
  height: '5\'6"',
  education: 'Masters in Computer Science',
  occupation: 'Software Engineer',
  company: 'Tech Solutions Inc.',
  income: '₹15-20 LPA',
  about: 'I am a passionate software engineer who loves to travel and explore new places. I enjoy reading books, listening to music, and cooking in my free time. Looking for someone who shares similar interests and values.',
  interests: ['Reading', 'Traveling', 'Cooking', 'Music'],
  familyDetails: {
    fatherOccupation: 'Retired Government Officer',
    motherOccupation: 'Homemaker',
    siblings: '1 Brother (Married), 1 Sister (Unmarried)'
  },
  preferences: {
    ageRange: '28-33',
    heightRange: '5\'8" - 6\'2"',
    education: 'Bachelors or higher',
    occupation: 'Any Professional',
    location: 'Mumbai or willing to relocate'
  }
};

const Profile = () => {
  const [activeTab, setActiveTab] = useState('basic');
  const [isEditing, setIsEditing] = useState(false);
  const [profile, setProfile] = useState(mockUserProfile);
  
  const handleEditToggle = () => {
    setIsEditing(!isEditing);
  };
  
  const handleSaveProfile = () => {
    // Here you would typically send the updated profile to your API
    console.log('Saving profile:', profile);
    setIsEditing(false);
    alert('Profile updated successfully!');
  };
  
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProfile({
      ...profile,
      [name]: value
    });
  };

  return (
    <div className="py-10 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          {/* Profile Header */}
          <div className="relative">
            <div className="h-48 bg-gradient-to-r from-pink-500 to-purple-600"></div>
            <div className="absolute bottom-0 left-0 w-full transform translate-y-1/2 flex justify-center">
              <div className="w-32 h-32 rounded-full border-4 border-white bg-gray-200"></div>
            </div>
          </div>
          
          {/* Profile Actions */}
          <div className="mt-20 px-6 py-4 flex justify-between items-center border-b">
            <h1 className="text-2xl font-bold">{profile.name}</h1>
            <div>
              {isEditing ? (
                <div className="flex space-x-2">
                  <button 
                    onClick={handleSaveProfile}
                    className="btn btn-primary"
                  >
                    Save Changes
                  </button>
                  <button 
                    onClick={handleEditToggle}
                    className="btn btn-secondary"
                  >
                    Cancel
                  </button>
                </div>
              ) : (
                <button 
                  onClick={handleEditToggle}
                  className="btn btn-primary"
                >
                  Edit Profile
                </button>
              )}
            </div>
          </div>
          
          {/* Profile Tabs */}
          <div className="border-b">
            <div className="flex">
              <button 
                className={`px-6 py-3 font-medium ${activeTab === 'basic' ? 'text-pink-600 border-b-2 border-pink-600' : 'text-gray-600 hover:text-pink-600'}`}
                onClick={() => setActiveTab('basic')}
              >
                Basic Information
              </button>
              <button 
                className={`px-6 py-3 font-medium ${activeTab === 'family' ? 'text-pink-600 border-b-2 border-pink-600' : 'text-gray-600 hover:text-pink-600'}`}
                onClick={() => setActiveTab('family')}
              >
                Family Details
              </button>
              <button 
                className={`px-6 py-3 font-medium ${activeTab === 'preferences' ? 'text-pink-600 border-b-2 border-pink-600' : 'text-gray-600 hover:text-pink-600'}`}
                onClick={() => setActiveTab('preferences')}
              >
                Partner Preferences
              </button>
            </div>
          </div>
          
          {/* Profile Content */}
          <div className="p-6">
            {activeTab === 'basic' && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-lg font-semibold mb-4">Personal Information</h3>
                  
                  <div className="space-y-3">
                    <div className="grid grid-cols-3">
                      <span className="text-gray-600">Age:</span>
                      {isEditing ? (
                        <input
                          type="number"
                          name="age"
                          value={profile.age}
                          onChange={handleInputChange}
                          className="form-input col-span-2"
                        />
                      ) : (
                        <span className="col-span-2">{profile.age} years</span>
                      )}
                    </div>
                    
                    <div className="grid grid-cols-3">
                      <span className="text-gray-600">Gender:</span>
                      {isEditing ? (
                        <select
                          name="gender"
                          value={profile.gender}
                          onChange={handleInputChange}
                          className="form-input col-span-2"
                        >
                          <option value="Male">Male</option>
                          <option value="Female">Female</option>
                        </select>
                      ) : (
                        <span className="col-span-2">{profile.gender}</span>
                      )}
                    </div>
                    
                    <div className="grid grid-cols-3">
                      <span className="text-gray-600">Location:</span>
                      {isEditing ? (
                        <input
                          type="text"
                          name="location"
                          value={profile.location}
                          onChange={handleInputChange}
                          className="form-input col-span-2"
                        />
                      ) : (
                        <span className="col-span-2">{profile.location}</span>
                      )}
                    </div>
                    
                    <div className="grid grid-cols-3">
                      <span className="text-gray-600">Religion:</span>
                      {isEditing ? (
                        <input
                          type="text"
                          name="religion"
                          value={profile.religion}
                          onChange={handleInputChange}
                          className="form-input col-span-2"
                        />
                      ) : (
                        <span className="col-span-2">{profile.religion}</span>
                      )}
                    </div>
                    
                    <div className="grid grid-cols-3">
                      <span className="text-gray-600">Caste:</span>
                      {isEditing ? (
                        <input
                          type="text"
                          name="caste"
                          value={profile.caste}
                          onChange={handleInputChange}
                          className="form-input col-span-2"
                        />
                      ) : (
                        <span className="col-span-2">{profile.caste}</span>
                      )}
                    </div>
                    
                    <div className="grid grid-cols-3">
                      <span className="text-gray-600">Marital Status:</span>
                      {isEditing ? (
                        <select
                          name="maritalStatus"
                          value={profile.maritalStatus}
                          onChange={handleInputChange}
                          className="form-input col-span-2"
                        >
                          <option value="Never Married">Never Married</option>
                          <option value="Divorced">Divorced</option>
                          <option value="Widowed">Widowed</option>
                        </select>
                      ) : (
                        <span className="col-span-2">{profile.maritalStatus}</span>
                      )}
                    </div>
                    
                    <div className="grid grid-cols-3">
                      <span className="text-gray-600">Height:</span>
                      {isEditing ? (
                        <input
                          type="text"
                          name="height"
                          value={profile.height}
                          onChange={handleInputChange}
                          className="form-input col-span-2"
                        />
                      ) : (
                        <span className="col-span-2">{profile.height}</span>
                      )}
                    </div>
                  </div>
                </div>
                
                <div>
                  <h3 className="text-lg font-semibold mb-4">Professional Information</h3>
                  
                  <div className="space-y-3">
                    <div className="grid grid-cols-3">
                      <span className="text-gray-600">Education:</span>
                      {isEditing ? (
                        <input
                          type="text"
                          name="education"
                          value={profile.education}
                          onChange={handleInputChange}
                          className="form-input col-span-2"
                        />
                      ) : (
                        <span className="col-span-2">{profile.education}</span>
                      )}
                    </div>
                    
                    <div className="grid grid-cols-3">
                      <span className="text-gray-600">Occupation:</span>
                      {isEditing ? (
                        <input
                          type="text"
                          name="occupation"
                          value={profile.occupation}
                          onChange={handleInputChange}
                          className="form-input col-span-2"
                        />
                      ) : (
                        <span className="col-span-2">{profile.occupation}</span>
                      )}
                    </div>
                    
                    <div className="grid grid-cols-3">
                      <span className="text-gray-600">Company:</span>
                      {isEditing ? (
                        <input
                          type="text"
                          name="company"
                          value={profile.company}
                          onChange={handleInputChange}
                          className="form-input col-span-2"
                        />
                      ) : (
                        <span className="col-span-2">{profile.company}</span>
                      )}
                    </div>
                    
                    <div className="grid grid-cols-3">
                      <span className="text-gray-600">Income:</span>
                      {isEditing ? (
                        <input
                          type="text"
                          name="income"
                          value={profile.income}
                          onChange={handleInputChange}
                          className="form-input col-span-2"
                        />
                      ) : (
                        <span className="col-span-2">{profile.income}</span>
                      )}
                    </div>
                  </div>
                </div>
                
                <div className="md:col-span-2">
                  <h3 className="text-lg font-semibold mb-4">About Me</h3>
                  {isEditing ? (
                    <textarea
                      name="about"
                      value={profile.about}
                      onChange={handleInputChange}
                      className="form-input h-32"
                    ></textarea>
                  ) : (
                    <p className="text-gray-700">{profile.about}</p>
                  )}
                </div>
                
                <div className="md:col-span-2">
                  <h3 className="text-lg font-semibold mb-4">Interests & Hobbies</h3>
                  <div className="flex flex-wrap gap-2">
                    {profile.interests.map((interest, index) => (
                      <span key={index} className="bg-pink-100 text-pink-800 px-3 py-1 rounded-full text-sm">
                        {interest}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            )}
            
            {activeTab === 'family' && (
              <div>
                <h3 className="text-lg font-semibold mb-4">Family Background</h3>
                
                <div className="space-y-3">
                  <div className="grid grid-cols-3">
                    <span className="text-gray-600">Father's Occupation:</span>
                    {isEditing ? (
                      <input
                        type="text"
                        name="familyDetails.fatherOccupation"
                        value={profile.familyDetails.fatherOccupation}
                        onChange={(e) => setProfile({
                          ...profile,
                          familyDetails: {
                            ...profile.familyDetails,
                            fatherOccupation: e.target.value
                          }
                        })}
                        className="form-input col-span-2"
                      />
                    ) : (
                      <span className="col-span-2">{profile.familyDetails.fatherOccupation}</span>
                    )}
                  </div>
                  
                  <div className="grid grid-cols-3">
                    <span className="text-gray-600">Mother's Occupation:</span>
                    {isEditing ? (
                      <input
                        type="text"
                        name="familyDetails.motherOccupation"
                        value={profile.familyDetails.motherOccupation}
                        onChange={(e) => setProfile({
                          ...profile,
                          familyDetails: {
                            ...profile.familyDetails,
                            motherOccupation: e.target.value
                          }
                        })}
                        className="form-input col-span-2"
                      />
                    ) : (
                      <span className="col-span-2">{profile.familyDetails.motherOccupation}</span>
                    )}
                  </div>
                  
                  <div className="grid grid-cols-3">
                    <span className="text-gray-600">Siblings:</span>
                    {isEditing ? (
                      <input
                        type="text"
                        name="familyDetails.siblings"
                        value={profile.familyDetails.siblings}
                        onChange={(e) => setProfile({
                          ...profile,
                          familyDetails: {
                            ...profile.familyDetails,
                            siblings: e.target.value
                          }
                        })}
                        className="form-input col-span-2"
                      />
                    ) : (
                      <span className="col-span-2">{profile.familyDetails.siblings}</span>
                    )}
                  </div>
                </div>
              </div>
            )}
            
            {activeTab === 'preferences' && (
              <div>
                <h3 className="text-lg font-semibold mb-4">Partner Preferences</h3>
                
                <div className="space-y-3">
                  <div className="grid grid-cols-3">
                    <span className="text-gray-600">Age Range:</span>
                    {isEditing ? (
                      <input
                        type="text"
                        name="preferences.ageRange"
                        value={profile.preferences.ageRange}
                        onChange={(e) => setProfile({
                          ...profile,
                          preferences: {
                            ...profile.preferences,
                            ageRange: e.target.value
                          }
                        })}
                        className="form-input col-span-2"
                      />
                    ) : (
                      <span className="col-span-2">{profile.preferences.ageRange} years</span>
                    )}
                  </div>
                  
                  <div className="grid grid-cols-3">
                    <span className="text-gray-600">Height Range:</span>
                    {isEditing ? (
                      <input
                        type="text"
                        name="preferences.heightRange"
                        value={profile.preferences.heightRange}
                        onChange={(e) => setProfile({
                          ...profile,
                          preferences: {
                            ...profile.preferences,
                            heightRange: e.target.value
                          }
                        })}
                        className="form-input col-span-2"
                      />
                    ) : (
                      <span className="col-span-2">{profile.preferences.heightRange}</span>
                    )}
                  </div>
                  
                  <div className="grid grid-cols-3">
                    <span className="text-gray-600">Education:</span>
                    {isEditing ? (
                      <input
                        type="text"
                        name="preferences.education"
                        value={profile.preferences.education}
                        onChange={(e) => setProfile({
                          ...profile,
                          preferences: {
                            ...profile.preferences,
                            education: e.target.value
                          }
                        })}
                        className="form-input col-span-2"
                      />
                    ) : (
                      <span className="col-span-2">{profile.preferences.education}</span>
                    )}
                  </div>
                  
                  <div className="grid grid-cols-3">
                    <span className="text-gray-600">Occupation:</span>
                    {isEditing ? (
                      <input
                        type="text"
                        name="preferences.occupation"
                        value={profile.preferences.occupation}
                        onChange={(e) => setProfile({
                          ...profile,
                          preferences: {
                            ...profile.preferences,
                            occupation: e.target.value
                          }
                        })}
                        className="form-input col-span-2"
                      />
                    ) : (
                      <span className="col-span-2">{profile.preferences.occupation}</span>
                    )}
                  </div>
                  
                  <div className="grid grid-cols-3">
                    <span className="text-gray-600">Location:</span>
                    {isEditing ? (
                      <input
                        type="text"
                        name="preferences.location"
                        value={profile.preferences.location}
                        onChange={(e) => setProfile({
                          ...profile,
                          preferences: {
                            ...profile.preferences,
                            location: e.target.value
                          }
                        })}
                        className="form-input col-span-2"
                      />
                    ) : (
                      <span className="col-span-2">{profile.preferences.location}</span>
                    )}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
