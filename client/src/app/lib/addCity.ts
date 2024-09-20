import { useFormik, FormikHelpers } from 'formik';
import * as Yup from 'yup';
import { useContext } from 'react';
import { AuthContext } from '../contexts/authContext';
import axiosInstance from './axios/axiosInstance';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-hot-toast';

export interface PerMonth {
	duration?: number;
	amount: number;
	tax?: number;
	stripePriceId: string;
}

export interface CityData {
	id?: number;
	city: string;
	imageUrl: string | File | null;
	country: string;
	hidden: boolean;
	location: { title: string; locationLink: string };
	description: string;
	catchphrase: string;
	goldPrice: PerMonth;
	classicPrice: {
		perMonth: Array<PerMonth>;
	};
	createdAt?: Date;
	updatedAt?: Date;
}

const durations = [
	{ label: '1 Year', value: 12 },
	{ label: '6 Months', value: 6 },
	{ label: '3 Months', value: 3 },
	{ label: '1 Month', value: 1 },
];

const defaultClassicPrice = {
	perMonth: durations.map((duration) => ({
		duration: 0,
		amount: 0,
		tax: 0,
		stripePriceId: '',
	})),
};

export const useAddCity = ({ onClose }: { onClose: () => void }) => {
	const { user } = useContext(AuthContext);
	const queryClient = useQueryClient();

	const mutation = useMutation({
		mutationFn: async (values: CityData) => {
			console.log('Submitting form data:', values); 
			const formData = new FormData();
			formData.append('city', values.city);
			formData.append('country', values.country);
			formData.append('hidden', String(values.hidden));
			formData.append('location', JSON.stringify(values.location));
			formData.append('description', values.description);
			formData.append('catchphrase', values.catchphrase);
			formData.append('goldPrice', JSON.stringify(values.goldPrice));
			formData.append('classicPrice', JSON.stringify(values.classicPrice));

			if (values.imageUrl) {
				formData.append('imageUrl', values.imageUrl);
			}

			const response = await axiosInstance.post('/city', formData, {
				headers: {
					'Content-Type': 'multipart/form-data',
					Authorization: `Bearer ${user?.access_token}`,
				},
			});

			return response.data;
		},

		onSuccess: async () => {
			await queryClient.invalidateQueries({ queryKey: ['cities'] });
			toast.success('City created successfully!');
			onClose();
		},
		onError: (error: any) => {
			console.error('Error adding city:', error);
			toast.error('Failed to add the city. Please try again.');
		},

	});

	const formik = useFormik<CityData>({
		initialValues: {
			city: '',
			country: '',
			hidden: false,
			location: { title: '', locationLink: '' },
			description: '',
			catchphrase: '',
			goldPrice: { amount: 0, tax: 0, duration: 12, stripePriceId: '' },
			classicPrice: defaultClassicPrice,
			imageUrl: null,
		},
		validationSchema: Yup.object({
			city: Yup.string().required('City is required'),
			country: Yup.string().required('Country is required'),
			location: Yup.object({
				title: Yup.string().required('Location title is required'),
				locationLink: Yup.string().required('Map location link is required'),
			}),
			description: Yup.string().required('Description is required'),
			catchphrase: Yup.string().required('Catch phrase is required'),
			goldPrice: Yup.object({
				amount: Yup.number().required('Gold price amount is required'),
				tax: Yup.number().required('Gold price tax is required'),
				srtipePriceId: Yup.string().required('Stripe price id is required'),
			}),
			imageUrl: Yup.mixed().required('Image is required'),
		}),

		onSubmit: async (values: CityData, { resetForm }: FormikHelpers<CityData>) => {
			console.log('Submitting form values:', values);
			try {
			  await mutation.mutateAsync(values);
			  console.log('City added successfully');
			  resetForm();
			} catch (error) {
			  console.error('Error during form submission:', error);
			  toast.error('Failed to add the city. Please try again.');
			}
		  }
		  
	});

	return {
		...formik,
		isError: mutation.isError,
		error: mutation.error,
		isSuccess: mutation.isSuccess,
	};
};
