'use client';

import React, { useState } from 'react';
import { Input } from '../register/components/input';
import { useLoginForm } from '../lib/login-form';
import Link from 'next/link';
import { withNoAuth } from '../lib/withNoAuth';
import InputPassword from '../components/inputPassword';
import WelcomeToBusinessSection from '../components/WelcomeToBusiness';
import ResetPasswordDialog from '../components/resetPasswordDialog';
import TwoFactorDialog from '../components/TwoFactorDialog'; 
import { useAuth } from '../contexts/useAuth';
import { useRouter } from 'next/navigation';
import Translation from '../components/translation';

const Page: React.FC = () => {
	const [isError, setIsError] = useState<string>('');
	const [isOpenDialog, setIsOpenDialog] = useState<boolean>(false);
	const [isOpenEmailDialog, setIsOpenEmailDialog] = useState<boolean>(false);
	const [email, setEmail] = useState<string>(''); 

	const formik = useLoginForm(setIsError, setIsOpenEmailDialog, setEmail);

	return (
		<div className='flex lg:grid lg:grid-cols-2 pt-6 pb-24'>
			<WelcomeToBusinessSection />
			<div className='flex-grow flex flex-col gap-10 px-4 md:px-6 lg:px-8 xl:px-5'>
				<h1 className='text-4xl font-bold text-primary'>
					<Translation translationKey='login_header' />
				</h1>
				<form onSubmit={formik.handleSubmit} className='flex flex-col gap-8'>
					<div className='flex flex-col gap-1'>
						<Input
							type='text'
							labelKey='register_email_label'
							value={formik.values.email}
							name='email'
							handleChange={formik.handleChange}
							touched={formik.touched.email}
							errors={formik.errors.email}
							formik={formik}
						/>
					</div>
					<div className='flex flex-col gap-1'>
						<div className='relative w-full'>
							<InputPassword
								labelKey='register_password_label'
								value={formik.values.password}
								name='password'
								touched={formik.touched.password}
								errors={formik.errors.password}
								formik={formik}
							/>
						</div>
						<p
							onClick={() => setIsOpenDialog(true)}
							className='text-xs font-medium text-[#9B9B9B] underline pl-3 underline-offset-1 cursor-pointer'>
							<Translation translationKey='login_forgetPassword' />
						</p>
					</div>
	
					<button
						disabled={!(formik.isValid && formik.dirty)}
						className={`w-full py-3 px-6 rounded-md text-white font-semibold ${formik.isValid && formik.dirty
							? 'bg-primary hover:bg-primary-dark'
							: 'bg-button cursor-not-allowed'}
							${formik.isSubmitting && 'cursor-not-allowed opacity-70'}
							`
							}>
						{formik.isSubmitting ? "Connecting..." : "Login to Zainspot"}
						
					</button>
				</form>
				{isError && <h1 className='text-center text-alert'>{isError}</h1>}
	
				<div className='flex justify-center gap-1 text-sm md:text-base'>
					<h1 className='text-text-foreground'>
						<Translation translationKey='join_redirection' />
					</h1>
					<Link
						href='/register'
						className='text-primary underline hover:no-underline'>
						<Translation translationKey='login_btn' />
					</Link>
				</div>
			</div>
			{
				isOpenEmailDialog && (
					<TwoFactorDialog
						isOpen={isOpenEmailDialog}
						setIsOpen={setIsOpenEmailDialog}
						email={email}
					/>
				)
			}
			{
				isOpenDialog && (
					<ResetPasswordDialog isOpenDialog={isOpenDialog} setIsOpenDialog={setIsOpenDialog} />
				)
			}
		</div>
	);
};

export default withNoAuth(Page);