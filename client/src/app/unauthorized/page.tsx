'use client'
import React from 'react';
import { useRouter } from 'next/navigation';
import Translation from '../components/translation';

const Unauthorized = () => {
  const router = useRouter();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
      <div className="bg-white shadow-lg rounded-lg p-8 max-w-lg text-center">
        <div className="text-primary text-6xl mb-4">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            className="w-16 h-16 mx-auto text-primary"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M12 11c-1.657 0-3-1.343-3-3s1.343-3 3-3 3 1.343 3 3-1.343 3-3 3z"
            />
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M12 14v8m0-8a4 4 0 11-8 0m8 0a4 4 0 108 0"
            />
          </svg>
        </div>
        <h1 className="text-3xl font-bold text-gray-800 mb-4">
          <Translation translationKey='unauthorized_header' />
        </h1>
        <p className="text-gray-600 mb-6">
          <Translation translationKey='unauthorized_desc' />
        </p>
        <button
          onClick={() => router.push('/')}
          className="bg-primary text-white font-semibold py-2 px-4 rounded hover:bg-primary-dark transition duration-300"
        >
          <Translation translationKey='unauthorized_btn' />
        </button>
      </div>
    </div>
  );
};

export default Unauthorized;
