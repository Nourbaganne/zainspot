import { useFormik, FormikHelpers } from 'formik';
import * as Yup from 'yup';
import { useContext } from 'react';
import { AuthContext } from '../contexts/authContext';
import axiosInstance from './axios/axiosInstance';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-hot-toast';
import City from '../interfaces/City';

export interface PerMonth {
	duration: number | null;
	amount: number | null;
	tax: number | null;
}

const durations = [
	{ label: '1 Year', value: 12 },
	{ label: '6 Months', value: 6 },
	{ label: '3 Months', value: 3 },
	{ label: '1 Month', value: 1 },
];

const defaultClassicPrice = {
	perMonth: durations.map((duration) => ({
		duration: duration.value,
		amount: 0,
		tax: null,
		stripePirceId: '',
	})),
};

export const useAddCity = ({ onClose }: { onClose: () => void }) => {
	const { user } = useContext(AuthContext);
	const queryClient = useQueryClient();

	const mutation = useMutation({
		mutationFn: async (values: City) => {
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
				formData.append('imageUrl', values?.imageUrl);
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
		},
	});

	const formik = useFormik<City>({
		initialValues: {
			city: '',
			country: '',
			hidden: false,
			location: { title: '', locationLink: '' },
			description: '',
			catchphrase: '',
			goldPrice: {
				amount: 0,
				tax: undefined,
				duration: 12,
				stripePriceId: '',
			},
			classicPrice: defaultClassicPrice,
			imageUrl: '',
		},
		validationSchema: Yup.object({
			city: Yup.string().required('City is required'),
			country: Yup.string().required('Country is required'),
			location: Yup.object({
				title: Yup.string().required('Location Title is required'),
				locationLink: Yup.string().required('Map Location Link is required'),
			}),
			description: Yup.string().required('Description is required'),
			catchphrase: Yup.string().required('Catch Phrase is required'),
			goldPrice: Yup.object({
				amount: Yup.number().required('Gold Price amount is required'),
				tax: Yup.number().required('Gold Price Tax is required'),
				srtipePriceId: Yup.string().required(
					'Gold Stripe Price ID is required',
				),
			}),
			imageUrl: Yup.mixed().required('Image is required'),
		}),
		onSubmit: async (values: City, { resetForm }: FormikHelpers<City>) => {
			try {
				await mutation.mutateAsync(values);
				resetForm();
			} catch (error) {
				console.error('Error adding city:', error);
			}
		},
	});

	return {
		...formik,
		isError: mutation.isError,
		error: mutation.error,
		isSuccess: mutation.isSuccess,
	};
};
