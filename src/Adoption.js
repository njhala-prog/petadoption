import React from 'react';
import { Link } from 'react-router-dom';

export const Adoption = () => {
  return (
    <main className="flex items-center justify-center min-h-screen bg-gradient-to-r from-green-100 to-blue-100 ">
      <div className="bg-white rounded-lg shadow-xl p-8 max-w-md text-center mt-20">
        <div className="flex justify-center mb-4">
          <svg className="w-16 h-16 text-green-500" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 00-1.414-1.414L9 10.586 6.707 8.293a1 1 0 00-1.414 1.414l3 3a1 1 0 001.414 0l7-7z" clipRule="evenodd" />
          </svg>
        </div>
        <h1 className="text-3xl font-bold text-gray-900 mb-4">Application Submitted Successfully!</h1>
        <p className="text-gray-600 mb-6">Thank you for submitting your application. We will review your details and get back to you soon.</p>
        <Link
          to="/"
          className="inline-block px-6 py-3 bg-gradient-to-r from-purple-600 to-blue-600 text-white text-sm font-medium rounded-md hover:from-purple-700 hover:to-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 transition-colors duration-300"
        >
          Back to Home
        </Link>
      </div>
    </main>
  );
};