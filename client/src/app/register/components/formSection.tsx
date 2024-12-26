'use client';
import React, { useRef, useMemo, useCallback } from 'react';
import CountryFlag from 'react-country-flag';
import { Country, State, City } from 'country-state-city';
import { Input } from './input';
import { FormikProps } from 'formik';
import InputPassword from '../../components/inputPassword';
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';
import Translation from '../../components/translation';
import {
	businessTypeOptions,
	genderOptions,
	personalInfoFields,
} from '../config/formFieldsConfig';
import SelectField from './selectField';
import { RadioGroup } from './radiGroup';
import ReCAPTCHA from 'react-google-recaptcha';
import toast from 'react-hot-toast';
import classNames from 'classnames';
import SelectWrapper from './selectWraper';
import { SingleValue } from 'react-select';

interface FormSectionProps {
	formik: FormikProps<any>;
}

interface OptionType {
	label: React.ReactNode;
	value: string;
}

const getCountryOptions = (): OptionType[] => {
	return Country.getAllCountries().map((country) => ({
		label: (
			<div className='flex items-center'>
				<CountryFlag
					countryCode={country.isoCode}
					svg
					style={{ width: '1.5em', height: '1.5em', marginRight: '8px' }}
				/>
				<span>{country.name}</span>
			</div>
		),
		value: country.isoCode,
	}));
};

const getStateOptions = (countryCode: string): OptionType[] => {
	return State.getStatesOfCountry(countryCode).map((state) => ({
		label: state.name,
		value: state.isoCode,
	}));
};

const getCityOptions = (
	countryCode: string,
	stateCode: string,
): OptionType[] => {
	return City.getCitiesOfState(countryCode, stateCode).map((city) => ({
		label: city.name,
		value: city.name,
	}));
};

const FormSection: React.FC<FormSectionProps> = ({ formik }) => {
	const recaptchaRef = useRef<ReCAPTCHA>(null);

	const countryOptions = useMemo(() => getCountryOptions(), []);
	const stateOptions = useMemo(() => {
		return formik.values.country ? getStateOptions(formik.values.country) : [];
	}, [formik.values.country]);

	const cityOptions = useMemo(() => {
		return formik.values.country && formik.values.state
			? getCityOptions(formik.values.country, formik.values.state)
			: [];
	}, [formik.values.country, formik.values.state]);

	const handleRecaptchaChange = useCallback(
		(token: string | null) => {
			formik.setFieldValue('recaptcha', token);
		},
		[formik],
	);

	const handleRecaptchaExpire = useCallback(() => {
		formik.setFieldValue('recaptcha', '');
		recaptchaRef.current?.reset();
	}, [formik]);

	const handleCountryChange = useCallback(
		(option: SingleValue<OptionType>) => {
			const selectedCountry = option ? option.value : '';
			formik.setFieldValue('country', selectedCountry);
			// Reset state and city when country changes
			formik.setFieldValue('state', '');
			formik.setFieldValue('city', '');
		},
		[formik],
	);

	const handleStateChange = useCallback(
		(option: SingleValue<OptionType>) => {
			const selectedState = option ? option.value : '';
			formik.setFieldValue('state', selectedState);
			// Reset city when state changes
			formik.setFieldValue('city', '');
		},
		[formik],
	);

	const handleCityChange = useCallback(
		(option: SingleValue<OptionType>) => {
			const selectedCity = option ? option.value : '';
			formik.setFieldValue('city', selectedCity);
		},
		[formik],
	);

	return (
		<>
			<Input
				type='text'
				labelKey='register_email_label'
				value={formik.values.email}
				placeholderValue='example@mail.com'
				name='email'
				handleChange={formik.handleChange}
				touched={formik.touched.email as boolean}
				errors={formik.errors.email as string}
				formik={formik}
			/>

			<div className='flex flex-col md:flex-row gap-6'>
				<InputPassword
					labelKey='register_password_label'
					value={formik.values.password}
					name='password'
					touched={formik.touched.password as boolean}
					errors={formik.errors.password as string}
					formik={formik}
				/>

				<InputPassword
					labelKey='register_confirm_password_label'
					value={formik.values.confirmPassword}
					name='confirmPassword'
					touched={formik.touched.confirmPassword as boolean}
					errors={formik.errors.confirmPassword as string}
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
							className: classNames(
								`bg-white border pl-14 text-base py-3 rounded-md peer focus:outline-none focus:ring-0 w-full`,
								{
									'border-alert':
										formik.errors.businessNumber &&
										formik.touched.businessNumber,
									'border-button focus:border-primary': !(
										formik.errors.businessNumber &&
										formik.touched.businessNumber
									),
								},
							),
							name: 'businessNumber',
						}}
					/>
					<label
						htmlFor='businessNumber'
						className={classNames(
							`absolute left-3 bottom-10 pointer-events-none px-1 text-xs bg-white z-10 text-primary`,
							{
								'text-alert':
									formik.errors.businessNumber && formik.touched.businessNumber,
							},
						)}
					>
						<Translation translationKey='register_business_number_label' />
					</label>
				</div>

				{formik.touched.businessNumber && formik.errors.businessNumber && (
					<h1 className='pl-4 text-alert'>
						{formik.errors.businessNumber as string}
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
					touched={formik.touched.businessName as boolean}
					errors={formik.errors.businessName as string}
					formik={formik}
				/>
				<Input
					type='text'
					labelKey='register_business_trading_name_label'
					value={formik.values.tradeName}
					name='tradeName'
					handleChange={formik.handleChange}
					touched={formik.touched.tradeName as boolean}
					errors={formik.errors.tradeName as string}
					formik={formik}
				/>
			</div>

			<div className='flex flex-col md:flex-row gap-6 z-0'>
				<SelectField
					value={formik.values.businessType}
					name='businessType'
					labelKey='register_typeof_business_label'
					handleChange={formik.handleChange}
					options={businessTypeOptions}
					errors={formik.errors.businessType as string | undefined}
					touched={formik.touched.businessType as boolean | undefined}
				/>
				<Input
					type='text'
					labelKey='register_website_label'
					value={formik.values.businessWebsite}
					placeholderValue='www.website.com'
					name='businessWebsite'
					handleChange={formik.handleChange}
					touched={formik.touched.businessWebsite as boolean}
					errors={formik.errors.businessWebsite as string}
					formik={formik}
				/>
			</div>

			<div className='flex flex-col md:flex-row gap-6 justify-center items-center'>
				<SelectWrapper
					labelKey='register_business_country_label'
					options={countryOptions}
					value={
						countryOptions.find(
							(option) => option.value === formik.values.country,
						) || null
					}
					onChange={handleCountryChange}
					placeholder='Select Country'
					error={formik.errors.country as string}
					touched={formik.touched.country as boolean}
					name='country'
				/>

				<Input
					type='text'
					labelKey='register_business_streetAdress_label'
					value={formik.values.fullStreetAdress}
					name='fullStreetAdress'
					handleChange={formik.handleChange}
					touched={formik.touched.fullStreetAdress as boolean}
					errors={formik.errors.fullStreetAdress as string}
					formik={formik}
				/>
			</div>

			<div className='flex flex-col md:grid grid-cols-8 gap-6'>
				<SelectWrapper
					labelKey='register_state_label'
					options={stateOptions}
					value={
						stateOptions.find(
							(option) => option.value === formik.values.state,
						) || null
					}
					onChange={handleStateChange}
					placeholder='Select State'
					error={formik.errors.state as string}
					touched={formik.touched.state as boolean}
					name='state'
				/>

				<SelectWrapper
					labelKey='register_city_label'
					options={cityOptions}
					value={
						cityOptions.find((option) => option.value === formik.values.city) ||
						null
					}
					onChange={handleCityChange}
					placeholder='Select City'
					error={formik.errors.city as string}
					touched={formik.touched.city as boolean}
					name='city'
				/>

				<div className='col-span-2'>
					<Input
						type='text'
						labelKey='register_business_zip_label'
						value={formik.values.zipCode}
						name='zipCode'
						handleChange={formik.handleChange}
						touched={formik.touched.zipCode as boolean}
						errors={formik.errors.zipCode as string}
						formik={formik}
					/>
				</div>
			</div>

			<div className='flex flex-col md:flex-row gap-6'>
				{personalInfoFields.map((field) => (
					<Input
						key={field.name}
						labelKey={field.labelKey}
						name={field.name}
						type={field.type}
						value={formik.values[field.name]}
						handleChange={formik.handleChange}
						touched={formik.touched[field.name] as boolean}
						errors={formik.errors[field.name] as string}
						formik={formik}
					/>
				))}
			</div>

			<div className='flex flex-col md:grid md:grid-cols-2 gap-4 text-sm w-full items-center justify-center'>
				<RadioGroup
					labelKey='register_gender_label'
					options={genderOptions}
					value={formik.values.gender}
					name='gender'
					onChange={formik.setFieldValue}
					error={formik.errors.gender as string | undefined}
					touched={formik.touched.gender as boolean | undefined}
				/>

				<div className='flex flex-col w-full gap-2 place-self-start'>
					<div className='relative flex gap-2 md:gap-4 items-center'>
						<h1
							className={`absolute mb-[46px] ml-[10px] bg-white text-xs text-primary`}
						>
							<Translation translationKey='register_birthday_label' />
						</h1>
						<input
							type='date'
							name='birthday'
							id='birthday'
							value={formik.values.birthday}
							onChange={formik.handleChange}
							className={classNames(
								`border text-span w-full px-2 py-3 rounded-md peer focus:outline-none focus:ring-0`,
								{
									'border-primary': formik.values.birthday,
									'border-alert':
										formik.errors.birthday && formik.touched.birthday,
									'border-button focus:border-primary':
										!(formik.errors.birthday && formik.touched.birthday) &&
										!formik.values.birthday,
								},
							)}
						/>
					</div>

					{formik.errors.birthday && formik.touched.birthday && (
						<p className='text-alert'>{formik.errors.birthday as string}</p>
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
					touched={formik.touched.mediaProfile as boolean | undefined}
					errors={formik.errors.mediaProfile as string | undefined}
					formik={formik}
				/>
			</div>

			<div>
				<ReCAPTCHA
					sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY!}
					onChange={handleRecaptchaChange}
					onExpired={handleRecaptchaExpire}
					ref={recaptchaRef}
				/>
				{formik.touched.recaptcha && formik.errors.recaptcha && (
					<p className='text-alert'>{formik.errors.recaptcha as string}</p>
				)}
			</div>
		</>
	);
};

export default React.memo(FormSection);
