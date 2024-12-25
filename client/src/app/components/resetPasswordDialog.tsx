import React, { useState } from 'react';
import { Input } from '../register/components/input';
import Image from 'next/image';
import closeIcon from '../assets/owner/locations/close-dialog.svg';
import axiosInstance from '../lib/axios/axiosInstance';
import Translation from './translation';

interface ResetPasswordDialogProps {
	isOpenDialog: boolean;
	setIsOpenDialog: (isOpen: boolean) => void;
}

const ResetPasswordDialog: React.FC<ResetPasswordDialogProps> = ({
	isOpenDialog,
	setIsOpenDialog,
}) => {
	const [email, setEmail] = useState('');
	const [isSubmitted, setIsSubmitted] = useState(false);
	const [errorMessage, setErrorMessage] = useState<string | null>(null);
	const [isLoading, setIsLoading] = useState(false);

	const handleEmailChange = (
		e:
			| React.ChangeEvent<HTMLInputElement>
			| React.ChangeEvent<HTMLTextAreaElement>,
	) => {
		setEmail(e.target.value);
	};

	const handleCloseDialog = () => {
		setIsOpenDialog(false);
		setIsSubmitted(false);
		setEmail('');
		setErrorMessage(null);
	};

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		setIsLoading(true);
		setErrorMessage(null);

		try {
			const response = await axiosInstance.post('/reset-password/request', {
				email,
			});

			console.log('Response status:', response.status);

			if (response.status === 201) {
				setIsSubmitted(true);
				setTimeout(() => {
					handleCloseDialog();
				}, 3000);
			}
		} catch (error: any) {
			if (error.response && error.response.status === 400) {
				setErrorMessage('Email does not exist');
			} else {
				setErrorMessage('An error occurred. Please try again.');
			}
		} finally {
			setIsLoading(false);
		}
	};

	if (!isOpenDialog) return null;

	return (
		<div className='fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50'>
			<div className='bg-white w-full max-w-md mx-auto rounded-lg shadow-lg p-6 relative animate-fadeIn'>
				{/* Close Icon */}
				<button className='absolute top-4 right-4' onClick={handleCloseDialog}>
					<Image src={closeIcon} alt='close-icon' width={20} height={20} />
				</button>

				{/* Dialog Header */}
				<h2 className='text-2xl flex gap-1 items-center justify-center font-bold mb-4'>
					<span className='text-primary'>
						<Translation translationKey='reset_password_title' />
					</span>
					<Translation translationKey='reset_password_title_span' />
				</h2>
				<p className='text-center text-sm text-gray-500 mb-6'>
					<Translation translationKey='reset_password_description' />
				</p>

				{/* Dialog Form */}
				<form onSubmit={handleSubmit} className='flex flex-col gap-4'>
					<Input
						type='email'
						labelKey='register_email_label'
						value={email}
						name='email'
						handleChange={handleEmailChange}
						placeholderValue='Enter your email address'
					/>
					<button
						type='submit'
						className={`w-full bg-primary text-white py-3 rounded-lg font-semibold text-lg hover:bg-primary-dark transition-all duration-200 ease-in-out ${
							isLoading ? 'opacity-50 cursor-not-allowed' : ''
						}`}
						disabled={isLoading}
					>
						{isLoading ? 'Sending...' : 'Send Reset Link'}
					</button>
				</form>

				{errorMessage && (
					<p className='text-red-500 text-center mt-4'>{errorMessage}</p>
				)}

				{isSubmitted && (
					<p className='text-primary-foreground text-center mt-4'>
						<Translation translationKey='resetLink_text' />
					</p>
				)}
			</div>
		</div>
	);
};

export default ResetPasswordDialog;
