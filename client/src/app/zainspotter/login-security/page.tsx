'use client';

import { Input } from '../../register/components/input';
import 'react-phone-input-2/lib/style.css';
import Image from 'next/image';
import smsVerification from '@/app/assets/profile-details/smsVerification.svg';
import emailVerification from '@/app/assets/profile-details/emailVerification.svg';
import Layout from '../Layout';
import eyeOutline from '@/app/assets/register/eye-outline.svg';
import eyeOffOutline from '@/app/assets/register/eye-off-outline.svg';
import Translation from '@/app/components/translation';
import { useContext, useEffect, useState } from 'react';
import { UserData, useUpdateForm } from '@/app/lib/update-form';
import Breadcrumb from '../components/breadcrumb';
import axios from 'axios';
import { AuthContext } from '@/app/contexts/authContext';
import SaveChangesButton from '@/app/components/saveChangesButton';
import { useQuery } from '@tanstack/react-query';
import getUserData from '@/app/lib/getUserData';

const Page = () => {
	const [showPassword, setShowPassword] = useState(false);
	const [showConfirmPassword, setShowConfirmPassword] = useState(false);

	const { user } = useContext(AuthContext);

	const { data, isLoading, isError, error } = useQuery({
		queryKey: ['users', user?.user.userId],
		queryFn: () => getUserData(user?.user.userId, user?.access_token),
		enabled: !!user?.user.userId && !!user?.access_token,
	});

	const formik = useUpdateForm(data);

	if (isLoading) {
		return <div>Loading ...</div>;
	}
	if (isError) {
		return <div>{(error as Error).message}</div>;
	}

	const breadcrumbItems = [
		{ label: 'breadcrumb_home', href: '/' },
		{ label: 'breadcrumb_zainspotter', href: '/zainspotter' },
		{ label: 'editProfile_Login_Security' },
	];

	return (
		<div className='flex flex-col gap-4 md:gap-6 bg-background-foreground py-6 px-2 md:px-16 md:py-8  md:pb-20'>
			<Breadcrumb items={breadcrumbItems} />
			<Layout>
				<div className='flex flex-col p-4 px-6 gap-3 bg-background border mb-20'>
					<h1 className='font-bold'>
						<Translation translationKey='login_security_header' />
					</h1>
					<form onSubmit={formik.handleSubmit}>
						<div className='flex flex-col py-6 gap-8 border-b'>
							<h1 className='text-span font-semibold'>
								<Translation translationKey='login_security_password' />
							</h1>
							<div className='flex flex-col md:flex-row gap-6'>
								<div className='relative w-full'>
									<Input
										type={showPassword ? 'text' : 'password'}
										labelKey='register_password_label'
										value={formik.values.password || ''}
										name='password'
										handleChange={formik.handleChange}
										touched={formik.touched.password}
										errors={formik.errors.password}
										formik={formik}
									/>
									<div className='absolute inset-y-0 right-3 flex items-center'>
										{!formik.touched.password && (
											<Image
												src={
													formik.errors.password && formik.touched.password
														? ''
														: showPassword
														? eyeOffOutline
														: eyeOutline
												}
												alt={
													formik.errors.password && formik.touched.password
														? ''
														: 'eye-outline'
												}
												className='cursor-pointer'
												onClick={() => setShowPassword(!showPassword)}
											/>
										)}
									</div>
								</div>
								<div className='relative w-full'>
									<Input
										type={showConfirmPassword ? 'text' : 'password'}
										labelKey='register_confirm_password_label'
										value={formik.values.confirmPassword || ''}
										name='confirmPassword'
										handleChange={formik.handleChange}
										touched={formik.touched.confirmPassword}
										errors={formik.errors.confirmPassword}
										formik={formik}
									/>
									<div className='absolute inset-y-0 right-3 flex items-center'>
										{!formik.touched.confirmPassword && (
											<Image
												src={
													formik.errors.confirmPassword &&
													formik.touched.confirmPassword
														? ''
														: showConfirmPassword
														? eyeOffOutline
														: eyeOutline
												}
												alt={
													formik.errors.confirmPassword &&
													formik.touched.confirmPassword
														? ''
														: 'eye-outline'
												}
												className='cursor-pointer'
												onClick={() =>
													setShowConfirmPassword(!showConfirmPassword)
												}
											/>
										)}
									</div>
								</div>
							</div>
							<SaveChangesButton />
						</div>
					</form>
					<div className='flex flex-col gap-8'>
						<div className='flex flex-col gap-2 '>
							<h1 className='text-span'>
								<Translation translationKey='login_security_authentification_title' />
							</h1>
							<p className='text-span-foreground'>
								<Translation translationKey='login_security_authentification_desc' />
							</p>
						</div>
						<div className='flex flex-col md:flex-row md:justify-between gap-4 md:gap-0 text-sm '>
							<div className='flex items-center gap-5'>
								<Image src={smsVerification} alt='sms-verification' />
								<div className='flex flex-col gap-2'>
									<h1 className='text-span'>
										<Translation translationKey='login_security_smsAuth_title' />
									</h1>
									<p className='text-span-foreground'>
										<Translation translationKey='login_security_smsAuth_desc' />
									</p>
								</div>
							</div>
							<button className='px-4 py-2 border-2 rounded-md border-primary text-primary'>
								<Translation translationKey='login_security_button_title' />
							</button>
						</div>
						<div className='flex flex-col md:flex-row md:justify-between gap-4 md:gap-0 text-sm'>
							<div className='flex items-center gap-5'>
								<Image src={emailVerification} alt='sms-verification' />
								<div className='flex flex-col gap-2'>
									<h1 className='text-span'>
										<Translation translationKey='login_security_emailAuth_title' />
									</h1>
									<p className='text-span-foreground'>
										<Translation translationKey='login_security_emailAuth_desc' />
									</p>
								</div>
							</div>
							<button className='px-4 py-2 border-2 rounded-md border-primary text-primary'>
								<Translation translationKey='login_security_button_title' />
							</button>
						</div>
					</div>
				</div>
			</Layout>
		</div>
	);
};

export default Page;
