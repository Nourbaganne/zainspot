'use client';

import { useCurrency } from '@/app/contexts/CurrencyContext';
import { useLanguage } from '@/app/contexts/LanguageContext';
import { useAuth } from '@/app/contexts/useAuth';
import axiosInstance from '@/app/lib/axios/axiosInstance';
import { useRouter, useSearchParams } from 'next/navigation';
import { useState } from 'react';

const TwoFactorAuthentication = () => {
  const searchParams = useSearchParams();
  const email = searchParams.get('email');

  const maskedEmail = email
    ? email.replace(/(.{2})(.*)(?=@)/, (gp1, gp2, gp3) => `${gp2}${'*'.repeat(gp3.length)}`)
    : '';

  const [code, setCode] = useState<string>('');
  const [error, setError] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false); // Added loading state
  const router = useRouter();
  const { dispatch } = useAuth();
  const { setLanguage } = useLanguage();
  const { setCurrency } = useCurrency();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true); // Set loading to true when submission starts

    try {
      const response = await axiosInstance.post('/auth/verify-2fa', { email, code });
      if (response.status === 201) {
        setCurrency(response.data.user.preferedCurrency);
        setLanguage(response.data.user.preferedLanguage);
        dispatch({ type: 'LOGIN', payload: response.data });
        localStorage.setItem('token', response.data.access_token);
        router.push('/');
      }
    } catch (err) {
      setError('Invalid 2FA code. Please try again.');
    } finally {
      setLoading(false); // Reset loading state regardless of success or failure
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold mb-2 text-center">Two-Factor Authentication</h2>
        <p className="text-gray-600 mb-6 text-center">
          A verification code has been sent to <strong>{maskedEmail}</strong>. Please enter it below.
        </p>

        <form onSubmit={handleSubmit}>
          <input
            type="text"
            value={code}
            onChange={(e) => setCode(e.target.value)}
            placeholder="Enter your 2FA code"
            className="border border-gray-300 p-2 rounded w-full mb-4"
            required
          />
          {error && <p className="text-red-500 mb-4 text-center">{error}</p>}
          <button
            type="submit"
            className={`mt-2 w-full bg-primary text-white py-2 rounded hover:bg-primary-dark transition ${loading ? 'cursor-not-allowed opacity-70' : ''}`}
            disabled={loading}
          >
            {loading ? 'Verifying...' : 'Verify Code'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default TwoFactorAuthentication;
