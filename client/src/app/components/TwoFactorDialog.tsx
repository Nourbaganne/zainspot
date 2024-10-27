
import React, { useState } from 'react';
import axiosInstance from '../lib/axios/axiosInstance';
import { useRouter } from 'next/navigation';
import { useAuth } from '../contexts/useAuth';
import { withNoAuth } from '../lib/withZainspotter';

interface TwoFactorDialogProps {
	isOpen: boolean;
	setIsOpen: (isOpen: boolean) => void;
	email: string;
}

const TwoFactorDialog: React.FC<TwoFactorDialogProps> = ({ isOpen, setIsOpen, email }) => {
	const [code, setCode] = useState<string>('');
	const [error, setError] = useState<string>('');
	const router = useRouter();
	const { dispatch } = useAuth();

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		try {
			const response = await axiosInstance.post('/auth/verify-2fa', { email, code });
			if (response.status === 201) {
				setIsOpen(false);
				dispatch({ type: 'LOGIN', payload: response.data });
				localStorage.setItem('token', response.data.access_token);
				router.push('/zainspotter');
			}
		} catch (err) {
			setError('Invalid 2FA code. Please try again.');
		}
	};

	if (!isOpen) return null;

	return (
		<div className='fixed inset-0 flex items-center justify-center z-50'>
			<div className='bg-white p-6 rounded shadow-md'>
				<h2 className='text-2xl font-bold mb-4'>Enter 2FA Code</h2>
				<form onSubmit={handleSubmit}>
					<input
						type='text'
						value={code}
						onChange={(e) => setCode(e.target.value)}
						placeholder='Enter your 2FA code'
						className='border border-gray-300 p-2 rounded w-full'
						required
					/>
					{error && <p className='text-red-500'>{error}</p>}
					<button type='submit' className='mt-4 w-full bg-primary text-white py-2 rounded'>
						Verify Code
					</button>
				</form>
			</div>
		</div>
	);
};

export default TwoFactorDialog;