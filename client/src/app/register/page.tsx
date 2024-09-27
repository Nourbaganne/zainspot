'use client';

import { useRegisterForm } from '../lib/register-form';
import Translation from '../components/translation';
import { withNoAuth } from '../lib/withNoAuth';
import { useState } from 'react';
import Dialog from '../components/dialog';
import WelcomeToBusinessSection from '../components/WelcomeToBusiness';
import PrivacyPolicyLinks from './components/privacyPolicyLinks';
import FormSection from './components/formSection';

const Register = () => {
	const [isOpenDialog, setIsOpenDialog] = useState(false);
	const [error, setError] = useState<string | null>();
	const formik = useRegisterForm({ setIsOpenDialog, setError });

	return (
		<div className='flex lg:grid lg:grid-cols-2 pb-20 md:pb-56 pt-10 px-4 md:px-0'>
			<WelcomeToBusinessSection />

			<div className='flex-grow flex lg:col-span-1 lg:w-full lg:px-7 flex-col items-center gap-10 w-3/5 md:px-10 bg-background z-10'>
				<h1 className='text-2xl md:text-4xl font-extrabold text-primary leading-snug mr-auto'>
					<Translation translationKey='registerpage_header' />
				</h1>
				<form
					onSubmit={formik.handleSubmit}
					className='flex flex-col gap-10 w-full'
				>
					<FormSection formik={formik} />
					<button
						type='submit'
						disabled={!(formik.isValid && formik.dirty)}
						className={`w-full py-3 px-6 rounded-md text-white font-semibold ${formik.isValid && formik.dirty
							? 'bg-primary hover:bg-primary-dark'
							: 'bg-button cursor-not-allowed'
							}`}
					>
						<Translation translationKey='register_submit_button' />
					</button>
				</form>
				{error && <h1 className='text-alert'>{error}</h1>}
				<PrivacyPolicyLinks />
			</div>

			{isOpenDialog && (
				<Dialog
					email={formik?.values?.email}
					isOpenDialog={isOpenDialog}
					setIsOpenDialog={setIsOpenDialog}
				/>
			)}
		</div>
	);
};

export default withNoAuth(Register);
