import React, { useState } from 'react';
import { Input } from '../register/components/input';
import Image from 'next/image';
import closeIcon from '@/app/assets/owner/locations/close-dialog.svg';

interface ResetPasswordDialogProps {
  isOpenDialog: boolean;
  setIsOpenDialog: (isOpen: boolean) => void;
}

const ResetPasswordDialog: React.FC<ResetPasswordDialogProps> = ({ isOpenDialog, setIsOpenDialog }) => {
  const [email, setEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    setIsSubmitted(true);
  };

  const handleCloseDialog = () => {
    setIsOpenDialog(false);
  };

  if (!isOpenDialog) return null;

  return (
    <div className='fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50'>
      <div className='bg-white w-full max-w-md mx-auto rounded-lg shadow-lg p-6 relative animate-fadeIn'>
        {/* Close Icon */}
        <button
          className='absolute top-4 right-4'
          onClick={handleCloseDialog}
        >
          <Image src={closeIcon} alt='close-icon' width={20} height={20} />
        </button>

        {/* Dialog Header */}
        <h2 className='text-2xl font-bold text-center mb-4'>
          <span className='text-primary'>Reset</span> Your Password
        </h2>
        <p className='text-center text-sm text-gray-500 mb-6'>
          Enter your email to receive a password reset link
        </p>

        {/* Dialog Form */}
        <form onSubmit={handleSubmit} className='flex flex-col gap-4'>
          <Input
            type='email'
            labelKey='email'
            value={email}
            name='email'
            handleChange={handleEmailChange}
            placeholder='Enter your email address'
            required
          />
          <button
            type='submit'
            className='w-full bg-primary text-white py-3 rounded-lg font-semibold text-lg hover:bg-primary-dark transition-all duration-200 ease-in-out'
          >
            Send Reset Link
          </button>
        </form>

        {isSubmitted && (
          <p className='text-primary-foreground text-center mt-4'>
            If the email exists, a reset link has been sent to your email.
          </p>
        )}
      </div>
    </div>
  );
};

export default ResetPasswordDialog;
