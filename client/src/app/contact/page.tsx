'use client';

import { useFormik } from 'formik';
import { Input } from '../register/components/input';
import Breadcrumb from '../zainspotter/components/breadcrumb';
import * as Yup from 'yup';
import { FiMail, FiMapPin, FiPhone } from 'react-icons/fi';
import { useRouter } from 'next/navigation';
import axiosInstance from '../lib/axios/axiosInstance';
import Translation from '../components/translation';
import FaqPage from '../components/faq';

export default function ContactPage() {
	const router = useRouter();

	const formik = useFormik({
		initialValues: {
			firstName: '',
			lastName: '',
			email: '',
			subject: '',
			message: '',
		},
		validationSchema: Yup.object({
			firstName: Yup.string().required('First Name is required'),
			lastName: Yup.string().required('Last Name is required'),
			email: Yup.string().email('Invalid email').required('Email is required'),
			subject: Yup.string().required('Subject is required'),
			message: Yup.string().required('Message is required'),
		}),
		onSubmit: function () {
			axiosInstance
				.post('/contact', formik.values)
				.then(function (res) {
					if (res.status == 201) {
						alert('Form Submitted');
						router.push('/');
					}
				})
				.catch(function (err) {
					console.log(err);
					alert('Error submitting contact form');
				});
		},
	});

	return (
		<div>
			<div className='p-8 mx-auto bg-gray-50'>
				<div className='max-w-7xl mx-auto'>
					<Breadcrumb
						items={[
							{ label: 'breadcrumb_home', href: '/' },
							{ label: 'breadcrumb_contact' },
						]}
					/>
				</div>
				{/* Header */}
				<div className='mt-10 text-center'>
					<h1 className='text-3xl font-extrabold'>
						<Translation translationKey='contact_header' />
					</h1>
					<p className='mt-3 text-md text-gray-400 max-w-3xl mx-auto'>
						<Translation translationKey='contact_desc' />
					</p>
				</div>
				<div className='lg:flex items-center justify-center mt-12 gap-10 pb-8'>
					{/* Contact Form */}
					<div className='card p-8 lg:max-w-2xl w-full'>
						<form
							className='grid grid-cols-2 gap-8'
							onSubmit={formik.handleSubmit}
						>
							{/* First Name */}
							<div className='col-span-2 md:col-span-1'>
								<Input
									type='text'
									labelKey='register_first_name_label'
									value={formik.values.firstName}
									name='firstName'
									handleChange={formik.handleChange}
									touched={formik.touched.firstName}
									errors={formik.errors.firstName}
									formik={formik}
									placeholderValue='John'
								/>
							</div>
							{/* Last Name */}
							<div className='col-span-2 md:col-span-1'>
								<Input
									type='text'
									labelKey='register_last_name_label'
									value={formik.values.lastName}
									name='lastName'
									handleChange={formik.handleChange}
									touched={formik.touched.lastName}
									errors={formik.errors.lastName}
									formik={formik}
									placeholderValue='Doe'
								/>
							</div>
							{/* Email Address */}
							<div className='col-span-2'>
								<Input
									type='email'
									labelKey='contact_email_label'
									value={formik.values.email}
									name='email'
									handleChange={formik.handleChange}
									touched={formik.touched.email}
									errors={formik.errors.email}
									formik={formik}
									placeholderValue='johndoe@example.com'
								/>
							</div>
							{/* Subjct */}
							<div className='col-span-2'>
								<Input
									type='text'
									labelKey='contact_subject_label'
									value={formik.values.subject}
									name='subject'
									handleChange={formik.handleChange}
									touched={formik.touched.subject}
									errors={formik.errors.subject}
									formik={formik}
									placeholderValue='Subscriptions'
								/>
							</div>
							{/* Message */}
							<div className='col-span-2'>
								<Input
									type='textarea'
									labelKey='contact_message_label'
									value={formik.values.message}
									name='message'
									handleChange={formik.handleChange}
									touched={formik.touched.message}
									errors={formik.errors.message}
									formik={formik}
									rows={10}
									placeholderValue='Leave us a message...'
								/>
							</div>
							<div className='col-span-2'>
								<button
									className='btn w-full btn-primary font-medium'
									type='submit'
								>
									<Translation translationKey='contact_button' />
								</button>
							</div>
						</form>
					</div>
				</div>
			</div>

			<FaqPage />
		</div>
	);
}
