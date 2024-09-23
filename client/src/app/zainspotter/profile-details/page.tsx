'use client';

import { Input } from '../../register/components/input';
import Translation from '../../components/translation';
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';
import { CURRENCIES_DATA, LANGUAGES_DATA } from '../../constants/navbar';
import save from '@/app/assets/profile-details/save.svg';
import Image from 'next/image';
import Layout from '../Layout';
import { useUpdateForm } from '@/app/lib/update-form';
import Breadcrumb from '../components/breadcrumb';
import { useContext, useState } from 'react';
import { AuthContext } from '@/app/contexts/authContext';
import Dialog from '@/app/components/dialog';
import { handleEmailVerification } from '@/app/lib/email-verification';
import getUserData from '@/app/lib/getUserData';
import { useQuery } from '@tanstack/react-query';
import Loader from '@/app/components/loader';
import { WithAuth } from '@/app/lib/withAuth';

const Page = () => {
    const { user } = useContext(AuthContext);
    const [isOpenDialog, setIsOpenDialog] = useState(false);

    const { data, isLoading, isError, error } = useQuery({
        queryKey: ['users', user?.user.userId],
        queryFn: () => getUserData(user?.user.userId, user?.access_token),
        enabled: !!user?.user.userId && !!user?.access_token,
    });

    const formik = useUpdateForm(data); 

    if (isLoading) {
        return <Loader />;
    }
    
    if (isError) {
        return <div>{(error as Error).message}</div>;
    }

    const breadcrumbItems = [
        { label: 'breadcrumb_home', href: '/' },
        { label: 'breadcrumb_zainspotter', href: '/zainspotter' },
        { label: 'editProfile_ProfileDetails' },
    ];
	return (
		<div className='flex flex-col gap-4 md:gap-6 bg-background-foreground md:px-16 md:py-8 py-6 px-2  md:pb-20'>
			<Breadcrumb items={breadcrumbItems} />
			<Layout>
				<div className='flex flex-col gap-10 text-sm'>
					<div className='flex flex-col py-8  px-6 gap-3 bg-background border'>
						<h1 className='font-bold'>
							<Translation translationKey='profile_details_title' />
						</h1>
						{!data?.isEmailConfirmed && (
							<p className='flex flex-col md:flex-row gap-1 p-2 bg-alert-foreground border border-text-foreground text-span text-sm py-4'>
								<Translation translationKey='profile_details_email_alert' />
								<span
									onClick={() =>
										handleEmailVerification(data?.email, setIsOpenDialog)
									}
									className='text-secondary font-semibold cursor-pointer hover:underline'
								>
									<Translation translationKey='profile_details_email_verification' />
								</span>
							</p>
						)}
						<form onSubmit={formik.handleSubmit}>
							<div className='flex flex-col py-6 gap-8 border-b'>
								<h1 className='text-span font-semibold'>
									<Translation translationKey='profile_details_personalSection' />
								</h1>
								<div className='flex flex-col md:flex-row gap-4'>
									<Input
										type='text'
										labelKey='register_first_name_label'
										value={formik.values.name || ''}
										name='name'
										handleChange={formik.handleChange}
										touched={formik.touched.name}
										errors={formik.errors.name}
										formik={formik}
									/>
									<Input
										type='text'
										labelKey='register_middle_name_label'
										value={formik.values.middleName || ''}
										name='middleName'
										handleChange={formik.handleChange}
										touched={formik.touched.middleName}
										errors={formik.errors.middleName}
										formik={formik}
									/>
									<Input
										type='text'
										labelKey='register_last_name_label'
										value={formik.values.lastName || ''}
										name='lastName'
										handleChange={formik.handleChange}
										touched={formik.touched.lastName}
										errors={formik.errors.lastName}
										formik={formik}
									/>
								</div>
								<div className='flex flex-col md:flex-row gap-8 md:gap-12 w-full md:items-center '>
									<div className='flex flex-col gap-6 '>
										<div className='flex gap-4 items-center'>
											<label htmlFor='gender' className='text-sm'>
												<Translation translationKey='register_gender_label' />
											</label>
											<div className='flex gap-3'>
												<input
													type='radio'
													id='male'
													name='gender'
													value='male'
													checked={formik.values.gender === 'male'}
													onChange={formik.handleChange}
													className={`w-5 h-5 accent-primary ${formik.errors.gender && formik.touched.gender
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
													className={`w-5 h-5 accent-primary ${formik.errors.gender && formik.touched.gender
															? 'border-alert'
															: ''
														}`}
												/>
												<label htmlFor='female'>
													<Translation translationKey='register_gender_female_label' />
												</label>
											</div>
										</div>
										{formik.touched.gender && formik.errors.gender && (
											<p className='text-alert'>{formik.errors.gender}</p>
										)}
									</div>

									<div className='flex flex-col w-full gap-2'>
										<div className='flex gap-4 items-center '>
											<h1 className='text-sm'>
												<Translation translationKey='register_birthday_label' />
											</h1>
											<input
												type='date'
												name='birthday'
												id='birthday'
												value={formik.values.birthday}
												onChange={formik.handleChange}
												className={`border px-2 py-3 rounded-md peer focus:outline-none focus:ring-0 w-2/3 ${formik.errors.birthday && formik.touched.birthday
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
							</div>
							<div className='flex flex-col py-6 gap-8 border-b'>
								<h1 className='text-span font-semibold'>
									<Translation translationKey='profile_details_businessSection' />
								</h1>
								<div className='flex flex-col md:flex-row gap-4'>
									<Input
										type='text'
										labelKey='register_business_name_label'
										value={formik.values.businessName || ''}
										name='businessName'
										handleChange={formik.handleChange}
										touched={formik.touched.businessName}
										errors={formik.errors.businessName}
										formik={formik}
									/>
									<Input
										type='text'
										labelKey='register_business_trading_name_label'
										value={formik.values.tradeName || ''}
										name='tradeName'
										handleChange={formik.handleChange}
										touched={formik.touched.tradeName}
										errors={formik.errors.tradeName}
										formik={formik}
									/>
								</div>
								<div className='flex flex-col md:flex-row gap-6'>
									<Input
										type='text'
										labelKey='register_email_label'
										value={formik.values.email || ''}
										name='email'
										handleChange={formik.handleChange}
										touched={formik.touched.email}
										errors={formik.errors.email}
										formik={formik}
									/>
									<div className='flex flex-col gap-2 w-full'>
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
                          ${formik.errors.businessNumber &&
															formik.touched.businessNumber
															? 'border-alert'
															: 'border-button focus:border-primary'
														}
                        `,
													name: 'businessNumber',
												}}
												containerClass='bg-white'
												dropdownClass='bg-white'
											/>
											<label
												htmlFor='businessNumber'
												className={`absolute left-3 top-0 transform -translate-y-1/2 text-xs bg-white text-primary px-1  
                        ${formik.errors.businessNumber &&
														formik.touched.businessNumber
														? 'text-alert'
														: 'text-primary'
													}`}
											>
												<Translation translationKey='register_business_number_label' />
											</label>
										</div>

										{formik.touched.businessNumber &&
											formik.errors.businessNumber && (
												<h1 className='pl-4 text-alert'>
													{formik.errors.businessNumber}
												</h1>
											)}
									</div>
								</div>
								<div className='flex flex-col md:grid md:grid-cols-5 gap-6'>
									<div className=' col-span-2 flex flex-col gap-2 w-full'>
										<div className='relative flex flex-col w-full'>
											<select
												name='businessType'
												value={formik.values.businessType}
												onChange={formik.handleChange}
												className={`custom-select border px-2 py-3 rounded-md peer focus:outline-none focus:ring-0 ${formik.errors.businessType &&
														formik.touched.businessType
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
												className={`absolute left-3 top-1/2 transform -translate-y-1/2 text-base text-text-foreground transition-all duration-300 pointer-events-none px-1 peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-base peer-focus:top-0 peer-focus:left-3 peer-focus:text-xs peer-visited:top-0 peer-focus:bg-white peer-focus:z-10 ${formik.errors.businessType &&
														formik.touched.businessType
														? 'peer-focus:text-alert text-alert'
														: 'peer-focus:text-primary'
													} ${formik.values.businessType
														? 'top-[0px] left-3 text-xs bg-white z-10'
														: ''
													}`}
											>
												<Translation translationKey='register_typeof_business_label' />
											</label>
										</div>
										{formik.touched.businessType &&
											formik.errors.businessType && (
												<h1 className='pl-4 text-alert'>
													{formik.errors.businessType}
												</h1>
											)}
									</div>

									<div className='col-span-3'>
										<Input
											type='text'
											labelKey='register_website_label'
											value={formik.values.businessWebsite || ''}
											name='businessWebsite'
											handleChange={formik.handleChange}
											touched={formik.touched.businessWebsite}
											errors={formik.errors.businessWebsite}
											formik={formik}
										/>
									</div>
								</div>

								<div className='flex flex-col md:grid md:grid-cols-7 gap-4'>
									<div className='col-span-2'>
										<Input
											type='text'
											labelKey='register_business_country_label'
											value={formik.values.country || ''}
											name='country'
											handleChange={formik.handleChange}
											touched={formik.touched.country}
											errors={formik.errors.country}
											formik={formik}
										/>
									</div>
									<div className='col-span-2'>
										<Input
											type='text'
											labelKey='register_city_label'
											value={formik.values.city || ''}
											name='city'
											handleChange={formik.handleChange}
											touched={formik.touched.city}
											errors={formik.errors.city}
											formik={formik}
										/>
									</div>
									<div className='col-span-3'>
										<Input
											type='text'
											labelKey='register_state_label'
											value={formik.values.state || ''}
											name='state'
											handleChange={formik.handleChange}
											touched={formik.touched.state}
											errors={formik.errors.state}
											formik={formik}
										/>
									</div>
								</div>

								<div>
									<Input
										type='text'
										labelKey='register_media_profile_label'
										value={formik.values.mediaProfile || ''}
										name='mediaProfile'
										handleChange={formik.handleChange}
										touched={formik.touched.mediaProfile}
										errors={formik.errors.mediaProfile}
										formik={formik}
									/>
								</div>
							</div>
							<div className='flex flex-col py-6 gap-8'>
								<h1 className='text-span font-semibold'>
									<Translation translationKey='profile_details_preferencesSection' />
								</h1>
								<div className='flex flex-col md:flex-row w-full  gap-5'>
									<div className='relative flex flex-col w-full'>
										<select
											name='preferedLanguage'
											value={formik.values.preferedLanguage}
											onChange={formik.handleChange}
											className={`custom-select border px-2 py-3 rounded-md peer focus:outline-none focus:ring-0 ${formik.errors.preferedLanguage &&
													formik.touched.preferedLanguage
													? 'border-alert'
													: 'border-button focus:border-primary'
												}`}
										>
											<option value=''></option>
											{LANGUAGES_DATA.map((language, index) => (
												<option value={language.key} key={index}>
													{language.title} ({language.key})
												</option>
											))}
										</select>
										<label
											htmlFor='preferedLanguage'
											className={`absolute left-3 top-1/2 transform -translate-y-1/2 text-base text-primary transition-all duration-300 pointer-events-none px-1 peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-base peer-focus:top-0 peer-focus:left-3 peer-focus:text-xs peer-visited:top-0 peer-focus:bg-white peer-focus:z-10 ${formik.errors.businessType &&
													formik.touched.businessType
													? 'peer-focus:text-alert text-alert'
													: 'peer-focus:text-primary'
												} ${formik.values.preferedLanguage
													? 'top-[0px] left-3 text-xs bg-white z-10'
													: ''
												}`}
										>
											<Translation translationKey='prefered_language' />
										</label>
									</div>
									<div className='relative flex flex-col w-full'>
										<select
											name='preferedCurrency'
											value={formik.values.preferedCurrency}
											onChange={formik.handleChange}
											className={`custom-select border px-2 py-3 rounded-md peer focus:outline-none focus:ring-0 ${formik.errors.preferedCurrency &&
													formik.touched.preferedCurrency
													? 'border-alert'
													: 'border-button focus:border-primary'
												}`}
										>
											<option value=''></option>
											{CURRENCIES_DATA.map((currency) => (
												<option value={currency.key} key={currency.key}>
													{currency.title} ({currency.key})
												</option>
											))}
										</select>
										<label
											htmlFor='preferedCurrency'
											className={`absolute left-3 top-1/2 transform -translate-y-1/2 text-base text-primary transition-all duration-300 pointer-events-none px-1 peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-base peer-focus:top-0 peer-focus:left-3 peer-focus:text-xs peer-visited:top-0 peer-focus:bg-white peer-focus:z-10 ${formik.errors.businessType &&
													formik.touched.businessType
													? 'peer-focus:text-alert text-alert'
													: 'peer-focus:text-primary'
												} ${formik.values.preferedCurrency
													? 'top-[0px] left-3 text-xs bg-white z-10'
													: ''
												}`}
										>
											<Translation translationKey='prefered_currency' />
										</label>
									</div>
								</div>
							</div>
							<div className='flex md:justify-end'>
								<button
									type='submit'
									className='flex w-full md:w-auto justify-center gap-2 bg-primary p-4 rounded-md text-background md:justify-end hover:bg-primary-foreground transition-all duration-300'
								>
									<Image src={save} alt='save-changes' />
									<Translation translationKey='profile_details_saving_button' />
								</button>
							</div>
						</form>
					</div>
					<div className='flex flex-col bg-background gap-4 p-6 border'>
						<h1 className=' font-semibold'>
							<Translation translationKey='profile_details_deletingAccount_header' />
						</h1>
						<p className='text-span text-sm'>
							<Translation translationKey='profile_details_deletingAccount_question' />
							<span className='text-secondary'>
								{data?.name} {data?.lastName}
							</span>
							?
						</p>
						<p className='text-sm max-w-2xl'>
							<Translation translationKey='profile_details_deletingAccount_description' />
						</p>
						<button className='text-alert text-sm font-semibold text-start'>
							<Translation translationKey='profile_details_deletingAccount_button' />
						</button>
					</div>
				</div>
			</Layout>
			{isOpenDialog && (
				<Dialog
					email={data?.email}
					isOpenDialog={isOpenDialog}
					setIsOpenDialog={setIsOpenDialog}
				/>
			)}
		</div>
	);
};

export default WithAuth(Page, 'zainspotter');
