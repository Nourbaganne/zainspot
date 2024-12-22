'use client'

import React from 'react';
import { useRouter } from 'next/navigation';
import Translation from './components/translation';

const NotFound = () => {
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
              d="M9.75 17.25h4.5l-.75-3h-3l-.75 3zM12 9.75a1.5 1.5 0 110-3 1.5 1.5 0 010 3z"
            />
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M12 2.25c5.385 0 9.75 4.365 9.75 9.75s-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12 6.615 2.25 12 2.25z"
            />
          </svg>
        </div>
        <h1 className="text-3xl font-bold text-gray-800 mb-2">
          <Translation translationKey='notFound_header' />
        </h1>
        <p className="text-gray-600 mb-6">
          <Translation translationKey='notFound_desc' />
        </p>
        <button
          onClick={() => router.push('/')}
          className="bg-primary text-white font-semibold py-2 px-4 rounded hover:bg-primary-dark transition duration-300"
        >
          <Translation translationKey='notFound_btn' />
        </button>
      </div>
    </div>
  );
};

export default NotFound;
