import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div>
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-pink-500 to-purple-600 text-white py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">Find Your Perfect Life Partner</h1>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Join thousands of happy couples who found their soulmate through MBNR Matrimonial
          </p>
          <Link to="/register" className="bg-white text-pink-600 px-6 py-3 rounded-md font-medium text-lg hover:bg-gray-100 transition-colors">
            Get Started Free
          </Link>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Why Choose MBNR Matrimonial?</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center p-6 rounded-lg">
              <div className="bg-pink-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-pink-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">Verified Profiles</h3>
              <p className="text-gray-600">
                All profiles are manually verified to ensure authenticity and trust
              </p>
            </div>
            
            <div className="text-center p-6 rounded-lg">
              <div className="bg-pink-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-pink-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">Advanced Search</h3>
              <p className="text-gray-600">
                Find matches based on religion, caste, location, education and more
              </p>
            </div>
            
            <div className="text-center p-6 rounded-lg">
              <div className="bg-pink-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-pink-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">Privacy Control</h3>
              <p className="text-gray-600">
                You decide who can view your profile and contact information
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Success Stories */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Success Stories</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="flex items-center mb-4">
                <div className="w-16 h-16 bg-gray-200 rounded-full mr-4"></div>
                <div>
                  <h3 className="text-xl font-semibold">Rahul & Priya</h3>
                  <p className="text-gray-600">Married on June 2023</p>
                </div>
              </div>
              <p className="text-gray-700">
                "We connected on MBNR Matrimonial and after a few months of getting to know each other, 
                we knew we were meant to be together. Thank you for helping us find each other!"
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="flex items-center mb-4">
                <div className="w-16 h-16 bg-gray-200 rounded-full mr-4"></div>
                <div>
                  <h3 className="text-xl font-semibold">Arjun & Meera</h3>
                  <p className="text-gray-600">Married on March 2023</p>
                </div>
              </div>
              <p className="text-gray-700">
                "The matching algorithm on MBNR Matrimonial is amazing! We had so many things in common 
                and hit it off immediately. We're now happily married and grateful for this platform."
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-pink-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6">Ready to Find Your Perfect Match?</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Join MBNR Matrimonial today and take the first step towards a beautiful journey together.
          </p>
          <Link to="/register" className="bg-white text-pink-600 px-6 py-3 rounded-md font-medium text-lg hover:bg-gray-100 transition-colors">
            Create Free Profile
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Home;
