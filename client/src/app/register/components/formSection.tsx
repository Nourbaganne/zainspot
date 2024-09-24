import React from 'react'
import { Input } from './input'
import { FormikProps } from 'formik';
import InputPassword from '@/app/components/inputPassword';
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';
import Translation from '@/app/components/translation';
import { businessTypeOptions, genderOptions, interestRegionOptions, personalInfoFields } from '../config/formFieldsConfig';
import SelectField from './selectField';
import { RadioGroup } from './radiGroup';

interface FormSectionProps {
    formik: FormikProps<any>;
}

const FormSection = ({ formik }: FormSectionProps) => {
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
                            className: `border pl-14 text-base py-3 rounded-md peer focus:outline-none focus:ring-0 w-full
											${formik.errors.businessNumber &&
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
                  ${formik.values.businessNumber &&
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
            <div className='flex flex-col md:flex-row gap-6'>
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
            <div className='flex flex-col md:flex-row gap-6'>
                <Input
                    type='text'
                    labelKey='register_business_country_label'
                    value={formik.values.country}
                    name='country'
                    handleChange={formik.handleChange}
                    touched={formik.touched.country as boolean}
                    errors={formik.errors.country as string}
                    formik={formik}
                />
                <Input
                    type='text'
                    labelKey='register_city_label'
                    value={formik.values.city}
                    name='city'
                    handleChange={formik.handleChange}
                    touched={formik.touched.city as boolean}
                    errors={formik.errors.city as string}
                    formik={formik}
                />
                <Input
                    type='text'
                    labelKey='register_state_label'
                    value={formik.values.state}
                    name='state'
                    handleChange={formik.handleChange}
                    touched={formik.touched.state as boolean}
                    errors={formik.errors.state as string}
                    formik={formik}
                />
            </div>
            <div className='flex flex-col gap-2'>
                <SelectField
                    value={formik.values.interestRegion}
                    name='interestRegion'
                    labelKey='regster_interest_region_label'
                    handleChange={formik.handleChange}
                    options={interestRegionOptions}
                    errors={formik.errors.interestRegion as string | undefined}
                    touched={formik.touched.interestRegion as boolean | undefined}
                />
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
            <div className='flex flex-col md:grid md:grid-cols-2 gap-4 text-sm w-full items-center justify-center '>
                <RadioGroup
                    labelKey='register_gender_label'
                    options={genderOptions}
                    value={formik.values.gender}
                    name='gender'
                    onChange={formik.setFieldValue}
                    error={formik.errors.gender as string | undefined}
                    touched={formik.touched.gender as boolean | undefined}
                />

                <div className='flex flex-col w-full gap-2 place-self-start '>
                    <div className='flex gap-2 md:gap-4 items-center '>
                        <h1 className={`text-xs ${formik.values.birthday ? 'text-primary' : 'text-span'}`}>
                            <Translation translationKey='register_birthday_label' />
                        </h1>
                        <input
                            type='date'
                            name='birthday'
                            id='birthday'
                            value={formik.values.birthday}
                            onChange={formik.handleChange}
                            className={`border text-span  px-2 py-3 rounded-md peer focus:outline-none focus:ring-0 w-2/3 
                                ${formik.values.birthday && 'border-primary'}
                                ${formik.errors.birthday && formik.touched.birthday
                                ? 'border-alert'
                                : 'border-button focus:border-primary'
                                }`}
                        />
                    </div>

                    {formik.errors.birthday && formik.touched.birthday && (
                        <p className='text-alert'>{formik.errors.birthday as string}</p>
                    )}
                </div>
            </div>
            <div className="flex flex-col gap-2">
                <Input
                    type="text"
                    labelKey="register_media_profile_label"
                    value={formik.values.mediaProfile}
                    name="mediaProfile"
                    handleChange={formik.handleChange}
                    touched={formik.touched.mediaProfile as boolean | undefined}
                    errors={formik.errors.mediaProfile as string | undefined}
                    formik={formik}
                />
            </div>
        </>
    )
}

export default FormSection