"use client";

import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import InputPassword from '../components/inputPassword';
import { useResetPassword } from '../lib/resetPassword-form';
import Translation from '../components/translation';

const ResetPassword = () => {
  const searchParams = useSearchParams();
  const token = searchParams.get('token');
  const [message, setMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isPasswordReset, setIsPasswordReset] = useState(false);

  useEffect(() => {
    setMessage('Please enter your new password');
  }, [token]);

  const formik = useResetPassword({ setErrorMessage, setMessage, setIsPasswordReset, setIsLoading, token });

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="bg-white w-full max-w-lg mx-auto p-8 rounded-lg shadow-md">
        <div className="text-center mb-6">
          <h2 className="text-3xl font-bold mb-2">
            <Translation translationKey='resetPassword_header' />
          </h2>
          <p className="text-gray-600">{message}</p>
        </div>

        {/* Password Reset Form */}
        {!isPasswordReset && (
          <form onSubmit={formik.handleSubmit} className="space-y-6">
            <InputPassword
              labelKey='resetPassword_label'
              value={formik.values.password}
              name='password'
              touched={formik.touched.password}
              errors={formik.errors.password}
              formik={formik}
            />

            <InputPassword
              labelKey='resetPassword_confirm'
              value={formik.values.confirmPassword}
              name='confirmPassword'
              touched={formik.touched.confirmPassword}
              errors={formik.errors.confirmPassword}
              formik={formik}
            />

            <button
              type="submit"
              className={`w-full bg-primary text-white py-3 rounded-lg font-semibold text-lg transition-all duration-200 ease-in-out hover:bg-primary-dark ${isLoading ? 'opacity-50 cursor-not-allowed' : ''
                }`}
              disabled={isLoading}
            >
              <Translation translationKey={isLoading ? 'resetPassword_updateBtn' : 'resetPassword_resetBtn'} />
            </button>

            {errorMessage && <p className="text-red-500 text-center mt-4">{errorMessage}</p>}
          </form>
        )}

        {isPasswordReset && (
          <div className="text-center mt-6">
            <p className="text-primary font-medium">
              <Translation translationKey='resetPassword_success' />
            </p>
            <Link href="/login">
              <p className="mt-4 inline-block text-primary hover:underline">
                <Translation translationKey='login_redirection' />
              </p>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default ResetPassword;
