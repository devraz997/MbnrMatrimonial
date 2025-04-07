import React, { useState } from 'react';

// Mock data for profiles
const mockProfiles = [
  {
    id: 1,
    name: 'Priya Sharma',
    age: 28,
    gender: 'Female',
    location: 'Mumbai',
    religion: 'Hindu',
    occupation: 'Software Engineer',
    education: 'Masters in Computer Science',
    about: 'I am a passionate software engineer who loves to travel and explore new places.'
  },
  {
    id: 2,
    name: 'Rahul Verma',
    age: 30,
    gender: 'Male',
    location: 'Delhi',
    religion: 'Hindu',
    occupation: 'Doctor',
    education: 'MBBS, MD',
    about: 'I am a dedicated doctor who enjoys reading books and playing cricket in my free time.'
  },
  {
    id: 3,
    name: 'Aisha Khan',
    age: 26,
    gender: 'Female',
    location: 'Hyderabad',
    religion: 'Muslim',
    occupation: 'Architect',
    education: 'B.Arch',
    about: 'Creative architect with a passion for sustainable design and art.'
  },
  {
    id: 4,
    name: 'Vikram Singh',
    age: 32,
    gender: 'Male',
    location: 'Bangalore',
    religion: 'Sikh',
    occupation: 'Business Analyst',
    education: 'MBA Finance',
    about: 'Ambitious and hardworking professional who loves to cook and travel.'
  }
];

const Search = () => {
  const [filters, setFilters] = useState({
    gender: '',
    ageMin: '',
    ageMax: '',
    location: '',
    religion: ''
  });
  
  const [filteredProfiles, setFilteredProfiles] = useState(mockProfiles);
  
  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters({
      ...filters,
      [name]: value
    });
  };
  
  const applyFilters = () => {
    let results = mockProfiles;
    
    if (filters.gender) {
      results = results.filter(profile => profile.gender === filters.gender);
    }
    
    if (filters.ageMin) {
      results = results.filter(profile => profile.age >= parseInt(filters.ageMin));
    }
    
    if (filters.ageMax) {
      results = results.filter(profile => profile.age <= parseInt(filters.ageMax));
    }
    
    if (filters.location) {
      results = results.filter(profile => 
        profile.location.toLowerCase().includes(filters.location.toLowerCase())
      );
    }
    
    if (filters.religion) {
      results = results.filter(profile => 
        profile.religion.toLowerCase().includes(filters.religion.toLowerCase())
      );
    }
    
    setFilteredProfiles(results);
  };
  
  const resetFilters = () => {
    setFilters({
      gender: '',
      ageMin: '',
      ageMax: '',
      location: '',
      religion: ''
    });
    setFilteredProfiles(mockProfiles);
  };

  return (
    <div className="py-10 bg-gray-50">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-10">Find Your Perfect Match</h2>
        
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Filters */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-xl font-semibold mb-4">Search Filters</h3>
              
              <div className="mb-4">
                <label className="form-label">Looking for</label>
                <select 
                  name="gender" 
                  value={filters.gender}
                  onChange={handleFilterChange}
                  className="form-input"
                >
                  <option value="">Any</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                </select>
              </div>
              
              <div className="mb-4">
                <label className="form-label">Age Range</label>
                <div className="grid grid-cols-2 gap-2">
                  <input
                    type="number"
                    name="ageMin"
                    placeholder="Min"
                    value={filters.ageMin}
                    onChange={handleFilterChange}
                    className="form-input"
                    min="18"
                    max="80"
                  />
                  <input
                    type="number"
                    name="ageMax"
                    placeholder="Max"
                    value={filters.ageMax}
                    onChange={handleFilterChange}
                    className="form-input"
                    min="18"
                    max="80"
                  />
                </div>
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
              
              <div className="mb-6">
                <label className="form-label">Religion</label>
                <input
                  type="text"
                  name="religion"
                  placeholder="Religion"
                  value={filters.religion}
                  onChange={handleFilterChange}
                  className="form-input"
                />
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
            {filteredProfiles.length === 0 ? (
              <div className="bg-white rounded-lg shadow-md p-6 text-center">
                <p className="text-lg text-gray-600">No profiles match your search criteria.</p>
                <button 
                  onClick={resetFilters}
                  className="btn btn-primary mt-4"
                >
                  Reset Filters
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {filteredProfiles.map(profile => (
                  <div key={profile.id} className="bg-white rounded-lg shadow-md overflow-hidden">
                    <div className="h-48 bg-gray-200"></div>
                    <div className="p-6">
                      <div className="flex justify-between items-start mb-2">
                        <h3 className="text-xl font-semibold">{profile.name}</h3>
                        <span className="bg-pink-100 text-pink-800 text-xs px-2 py-1 rounded-full">
                          {profile.age} yrs
                        </span>
                      </div>
                      
                      <div className="mb-4 text-sm text-gray-600">
                        <p>{profile.location} • {profile.religion}</p>
                        <p>{profile.occupation}</p>
                        <p>{profile.education}</p>
                      </div>
                      
                      <p className="text-gray-700 mb-4 line-clamp-2">{profile.about}</p>
                      
                      <div className="flex space-x-2">
                        <button className="btn btn-primary flex-1">View Profile</button>
                        <button className="btn btn-secondary flex-1">Send Interest</button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Search;
