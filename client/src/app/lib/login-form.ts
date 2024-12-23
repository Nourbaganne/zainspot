
import { useFormik } from 'formik';
import * as Yup from 'yup';
import axios, { AxiosError } from 'axios';
import { useRouter } from 'next/navigation';
import { useAuth } from '../contexts/useAuth';
import axiosInstance from './axios/axiosInstance';
import { useLanguage } from '../contexts/LanguageContext';
import { useCurrency } from '../contexts/CurrencyContext';

export const useLoginForm = (
	setIsError: (error: string) => void,
	setIsOpenDialog: (isOpen: boolean) => void,
	setEmail: (email: string) => void
) => {
	const router = useRouter();
	const { dispatch } = useAuth();
	const { setLanguage } = useLanguage();
	const { setCurrency } = useCurrency();

	return useFormik({
		initialValues: {
			email: '',
			password: '',
		},
		validationSchema: Yup.object({
			email: Yup.string().email('Invalid email address').required('Email is required'),
			password: Yup.string().required('Password is required'),
		}),
		onSubmit: async (values, { resetForm }) => {
			try {
				const response = await axiosInstance.post('/auth', values);

				if (response.status === 201) {
					if (response.data.require2FA) {
						// Set email and open the dialog for 2FA
						setEmail(values.email);
						router.push(`/login/Two-Factor-Authentication?email=${values.email}`);
					} else {
						// User is logged in, proceed normally
						setCurrency(response.data.user.preferedCurrency);
						setLanguage(response.data.user.preferedLanguage);
						dispatch({ type: 'LOGIN', payload: response.data });
						localStorage.setItem('token', response.data.access_token);
						router.push('/zainspotter');

					}
				}
			} catch (error) {
				if (axios.isAxiosError(error)) {
					const errorMessage = error.response?.data?.message || 'An error occurred';
					setIsError(errorMessage);
				} else {
					setIsError('An unknown error occurred');
				}
			}
		},
	});
};