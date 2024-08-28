'use client';

import Image from 'next/image';
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';
import loginImage from '@/app/assets/register/login-image.svg';
import { Input } from './components/input';
import { useRegisterForm } from '../lib/register-form';
import Translation from '../components/translation';
import { withNoAuth } from '../lib/withNoAuth';
import InputPassword from '../components/inputPassword';
import { useState } from 'react';
import Dialog from '../components/dialog';
import WelcomeToBusinessSection from '../components/WelcomeToBusiness';

const Register = () => {
	const [isOpenDialog, setIsOpenDialog] = useState(false);
	const [error, setError] = useState<string | null>();
	const formik = useRegisterForm({ setIsOpenDialog, setError });

	return (
		<div className='flex pb-20 md:pb-56 pt-10 px-4 md:px-0'>
			<WelcomeToBusinessSection />

			<div className='flex-grow flex flex-col items-center gap-10 w-3/5 md:px-10 bg-background z-10'>
				<h1 className='text-2xl md:text-4xl font-extrabold text-primary leading-snug mr-auto'>
					<Translation translationKey='registerpage_header' />
				</h1>
				<form
					onSubmit={formik.handleSubmit}
					className='flex flex-col gap-10 w-full'
				>
					<Input
						type='text'
						labelKey='register_email_label'
						value={formik.values.email}
						placeholderValue='example@mail.com'
						name='email'
						handleChange={formik.handleChange}
						touched={formik.touched.email}
						errors={formik.errors.email}
						formik={formik}
					/>

					<div className='flex flex-col md:flex-row gap-6'>
						<InputPassword
							labelKey='register_password_label'
							value={formik.values.password}
							name='password'
							touched={formik.touched.password}
							errors={formik.errors.password}
							formik={formik}
						/>

						<InputPassword
							labelKey='register_confirm_password_label'
							value={formik.values.confirmPassword}
							name='confirmPassword'
							touched={formik.touched.confirmPassword}
							errors={formik.errors.confirmPassword}
							formik={formik}
						/>
					</div>
					<div className='flex flex-col gap-2'>
						<div className='relative flex flex-col'>
							<PhoneInput
								country={'us'}
								value={formik.values.businessNumber}
								onChange={(value: string) =>
									formik.setFieldValue('businessNumber', value)
								}
								inputProps={{
									className: `
                  border pl-14 text-base py-3 rounded-md peer focus:outline-none focus:ring-0 w-full
                  ${
										formik.errors.businessNumber &&
										formik.touched.businessNumber
											? 'border-alert'
											: 'border-button focus:border-primary'
									}
                  `,
									name: 'businessNumber',
								}}
							/>
							<label
								htmlFor='businessNumber'
								className={`absolute left-3 bottom-10 pointer-events-none px-1 text-xs bg-white z-10   
                  ${
										formik.values.businessNumber &&
										!formik.errors.businessNumber
											? 'text-primary'
											: formik.errors.businessNumber &&
											  formik.touched.businessNumber
											? 'text-alert'
											: 'text-primary'
									} `}
							>
								<Translation translationKey='register_business_number_label' />
							</label>
						</div>

						{formik.touched.businessNumber && formik.errors.businessNumber && (
							<h1 className='pl-4 text-alert'>
								{formik.errors.businessNumber}
							</h1>
						)}
					</div>
					<div className='flex flex-col md:flex-row gap-6'>
						<Input
							type='text'
							labelKey='register_business_name_label'
							value={formik.values.businessName}
							name='businessName'
							handleChange={formik.handleChange}
							touched={formik.touched.businessName}
							errors={formik.errors.businessName}
							formik={formik}
						/>
						<Input
							type='text'
							labelKey='register_business_trading_name_label'
							value={formik.values.tradeName}
							name='tradeName'
							handleChange={formik.handleChange}
							touched={formik.touched.tradeName}
							errors={formik.errors.tradeName}
							formik={formik}
						/>
					</div>
					<div className='flex flex-col md:flex-row gap-6'>
						<div className='flex flex-col gap-2 w-full'>
							<div className='relative flex flex-col w-full'>
								<select
									name='businessType'
									value={formik.values.businessType}
									onChange={formik.handleChange}
									className={`custom-select border px-2 py-3 rounded-md peer focus:outline-none focus:ring-0 ${
										formik.errors.businessType && formik.touched.businessType
											? 'border-alert'
											: 'border-button focus:border-primary'
									}`}
								>
									<option value='' disabled></option>
									<option value='business1'>Business 1</option>
									<option value='business2'>Business 2</option>
									<option value='business3'>Business 3</option>
								</select>
								<label
									htmlFor='businessType'
									className={`absolute left-3 bottom-10 pointer-events-none px-1 text-xs bg-white   
                    ${
											formik.values.businessType && !formik.errors.businessType
												? 'text-primary'
												: formik.errors.businessType &&
												  formik.touched.businessType
												? 'text-alert'
												: 'text-primary'
										} `}
								>
									<Translation translationKey='register_typeof_business_label' />
								</label>
							</div>
							{formik.touched.businessType && formik.errors.businessType && (
								<h1 className='pl-4 text-alert'>
									{formik.errors.businessType}
								</h1>
							)}
						</div>

						<Input
							type='text'
							labelKey='register_website_label'
							value={formik.values.businessWebsite}
							placeholderValue='www.website.com'
							name='businessWebsite'
							handleChange={formik.handleChange}
							touched={formik.touched.businessWebsite}
							errors={formik.errors.businessWebsite}
							formik={formik}
						/>
					</div>
					<div className='flex flex-col md:flex-row gap-6'>
						<Input
							type='text'
							labelKey='register_business_country_label'
							value={formik.values.country}
							name='country'
							handleChange={formik.handleChange}
							touched={formik.touched.country}
							errors={formik.errors.country}
							formik={formik}
						/>
						<Input
							type='text'
							labelKey='register_city_label'
							value={formik.values.city}
							name='city'
							handleChange={formik.handleChange}
							touched={formik.touched.city}
							errors={formik.errors.city}
							formik={formik}
						/>
						<Input
							type='text'
							labelKey='register_state_label'
							value={formik.values.state}
							name='state'
							handleChange={formik.handleChange}
							touched={formik.touched.state}
							errors={formik.errors.state}
							formik={formik}
						/>
					</div>
					<div className='flex flex-col gap-2 w-full'>
						<div className='relative flex flex-col w-full'>
							<select
								name='interestRegion'
								value={formik.values.interestRegion}
								onChange={formik.handleChange}
								className={`custom-select border px-2 py-3 rounded-md peer focus:outline-none focus:ring-0 ${
									formik.errors.interestRegion && formik.touched.interestRegion
										? 'border-alert'
										: 'border-button focus:border-primary'
								}`}
							>
								<option value=''></option>
								<option value='region1'>Region 1</option>
								<option value='region2'>Region 2</option>
								<option value='region3'>Region 3</option>
							</select>
							<label
								htmlFor='interestRegion'
								className={`absolute left-3 bottom-10 pointer-events-none px-1 text-xs bg-white z-10   
                    ${
											formik.values.interestRegion &&
											!formik.errors.interestRegion
												? 'text-primary'
												: formik.errors.interestRegion &&
												  formik.touched.interestRegion
												? 'text-alert'
												: 'text-primary'
										} `}
							>
								<Translation translationKey='regster_interest_region_label' />
							</label>
						</div>
						{formik.touched.interestRegion && formik.errors.interestRegion && (
							<h1 className='pl-4 text-alert'>
								{formik.errors.interestRegion}
							</h1>
						)}
					</div>
					<div className='flex flex-col md:flex-row gap-6'>
						<Input
							type='text'
							labelKey='register_first_name_label'
							value={formik.values.name}
							name='name'
							handleChange={formik.handleChange}
							touched={formik.touched.name}
							errors={formik.errors.name}
							formik={formik}
						/>
						<Input
							type='text'
							labelKey='register_middle_name_label'
							value={formik.values.middleName}
							name='middleName'
							handleChange={formik.handleChange}
							touched={formik.touched.middleName}
							errors={formik.errors.middleName}
							formik={formik}
						/>
						<Input
							type='text'
							labelKey='register_last_name_label'
							value={formik.values.lastName}
							name='lastName'
							handleChange={formik.handleChange}
							touched={formik.touched.lastName}
							errors={formik.errors.lastName}
							formik={formik}
						/>
					</div>
					<div className='flex flex-col md:flex-row gap-4 text-sm w-full items-center justify-center '>
						<div className=' flex flex-col gap-2 w-full '>
							<div
								className={`relative flex border px-2 py-4 rounded-md peer focus:outline-none focus:ring-0 autofill:bg-white ${
									formik.errors.gender && formik.touched.gender
										? 'border-alert'
										: 'border-button focus:border-primary'
								}`}
							>
								<label
									htmlFor='gender'
									className={`absolute left-3 bottom-11 pointer-events-none px-1 text-xs bg-white z-10   
                  ${
										formik.values.gender && !formik.errors.gender
											? 'text-primary'
											: formik.errors.gender && formik.touched.gender
											? 'text-alert'
											: 'text-primary'
									} `}
								>
									<Translation translationKey='register_gender_label' />
								</label>
								<div className='flex gap-5'>
									<div className='flex gap-3'>
										<input
											type='radio'
											id='male'
											name='gender'
											value='male'
											checked={formik.values.gender === 'male'}
											onChange={formik.handleChange}
											className={`w-5 h-5 accent-primary ${
												formik.errors.gender && formik.touched.gender
													? 'border-alert'
													: ''
											}`}
										/>
										<label htmlFor='male'>
											<Translation translationKey='register_gender_male_label' />
										</label>
									</div>
									<div className='flex gap-3'>
										<input
											type='radio'
											id='female'
											name='gender'
											value='female'
											checked={formik.values.gender === 'female'}
											onChange={formik.handleChange}
											className={`w-5 h-5 accent-primary ${
												formik.errors.gender && formik.touched.gender
													? 'border-alert'
													: ''
											}`}
										/>
										<label htmlFor='female'>
											<Translation translationKey='register_gender_female_label' />
										</label>
									</div>
								</div>
							</div>
							{formik.touched.gender && formik.errors.gender && (
								<p className='text-alert'>{formik.errors.gender}</p>
							)}
						</div>

						<div className='flex flex-col w-full gap-2 place-self-start'>
							<div className='flex gap-2 md:gap-4 items-center '>
								<h1 className='text-xs text-text-foreground'>
									<Translation translationKey='register_birthday_label' />
								</h1>
								<input
									type='date'
									name='birthday'
									id='birthday'
									value={formik.values.birthday}
									onChange={formik.handleChange}
									className={`border  px-2 py-3 rounded-md peer focus:outline-none focus:ring-0 w-2/3 ${
										formik.errors.birthday && formik.touched.birthday
											? 'border-alert'
											: 'border-button focus:border-primary'
									}`}
								/>
							</div>

							{formik.errors.birthday && formik.touched.birthday && (
								<p className='text-alert'>{formik.errors.birthday}</p>
							)}
						</div>
					</div>

					<div className='flex flex-col gap-2'>
						<Input
							type='text'
							labelKey='register_media_profile_label'
							value={formik.values.mediaProfile}
							name='mediaProfile'
							handleChange={formik.handleChange}
							touched={formik.touched.mediaProfile}
							errors={formik.errors.mediaProfile}
							formik={formik}
						/>
					</div>

					<button
						type='submit'
						disabled={!(formik.isValid && formik.dirty)}
						className={`w-full py-3 px-6 rounded-md text-white font-semibold ${
							formik.isValid && formik.dirty
								? 'bg-primary hover:bg-primary-dark'
								: 'bg-button cursor-not-allowed'
						}`}
					>
						<Translation translationKey='register_submit_button' />
					</button>
				</form>
				{error && <h1 className='text-alert'>{error}</h1>}
				<p className='text-center'>
					<Translation translationKey='registerpage_privacy_policy' />
					<span className='text-primary underline cursor-pointer hover:no-underline'>
						{' '}
						<Translation translationKey='registerpage_termsofuse_span' />{' '}
					</span>{' '}
					<Translation translationKey='registerpage_relating_privacy_policy' />{' '}
					<span className='text-primary underline cursor-pointer hover:no-underline'>
						{' '}
						<Translation translationKey='registerpage_privacy_policy_span' />
					</span>
				</p>
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
