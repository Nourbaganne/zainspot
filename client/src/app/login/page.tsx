'use client';

import React, { useState } from 'react';
import { Input } from '../register/components/input';
import { useLoginForm } from '../lib/login-form';
import Link from 'next/link';
import { withNoAuth } from '../lib/withNoAuth';
import InputPassword from '../components/inputPassword';
import WelcomeToBusinessSection from '../components/WelcomeToBusiness';
import ResetPasswordDialog from '../components/resetPasswordDialog';

const Page = () => {
	const [isError, setIsError] = useState('');
	const [isOpenDialog, setIsOpenDialog] = useState(false);

	const formik = useLoginForm(setIsError);

	return (
		<div className='flex lg:grid lg:grid-cols-2 pt-6 pb-24'>
			{/* Left Section */}
			<WelcomeToBusinessSection />
			{/* Right Section */}
			<div className='flex-grow flex flex-col gap-10 px-4 md:px-6 lg:px-8 xl:px-5 '>
				<h1 className='text-4xl font-bold text-primary'>
					Login to Your Secure ZainSpot Account
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
						<p className='text-xs font-medium text-[#9B9B9B] underline pl-3 underline-offset-1 cursor-pointer '>
							Forgot your username?
						</p>
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
							className='text-xs font-medium text-[#9B9B9B] underline pl-3 underline-offset-1 cursor-pointer '>
							Forgot your password?
						</p>
					</div>


					<button
						disabled={!(formik.isValid && formik.dirty)}
						className={`w-full py-3 px-6 rounded-md text-white font-semibold ${formik.isValid && formik.dirty
							? 'bg-primary hover:bg-primary-dark'
							: 'bg-button cursor-not-allowed'
							}`}>
						Login to Zainspot
					</button>
				</form>
				{isError && <h1 className='text-center text-alert'>{isError}</h1>}

				<div className='flex justify-center gap-1 text-sm md:text-base'>
					<h1 className='text-text-foreground'>Don’t Have an Account?</h1>
					<Link
						href='/register'
						className='text-primary underline hover:no-underline'
					>
						Join ZainSpot
					</Link>
				</div>
			</div>
			{
				isOpenDialog && (
					<ResetPasswordDialog isOpenDialog={isOpenDialog} setIsOpenDialog={setIsOpenDialog} />
				)
			}
		</div>
	);
};

export default withNoAuth(Page);
