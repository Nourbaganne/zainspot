import Translation from '../../components/translation';
import { useField } from 'formik';
import React, { ChangeEvent } from 'react';

interface SelectFieldProps {
	value: string;
	name: string;
	labelKey: string;
	handleChange: (e: ChangeEvent<any>) => void;
	options: { value: string; label: string }[];
	errors: string | undefined;
	touched: boolean | undefined;
}
const SelectField: React.FC<SelectFieldProps> = ({
	value,
	name,
	labelKey,
	handleChange,
	options,
	errors,
	touched,
}) => {
	return (
		<div className='flex flex-col gap-2 w-full'>
			<div className='relative flex flex-col w-full'>
				<select
					name={name}
					value={value}
					onChange={handleChange}
					className={`custom-select border px-2 py-3 text-span font-light text-sm rounded-md peer focus:outline-none focus:ring-0 ${
						errors && touched
							? 'border-alert'
							: 'border-button focus:border-primary'
					}`}
				>
					<option value='' disabled></option>
					{options.map((option) => (
						<option key={option.value} value={option.value}>
							{option.label}
						</option>
					))}
				</select>
				<label
					htmlFor={name}
					className={`absolute left-3 bottom-10 pointer-events-none px-1 text-xs bg-white z-10   
                    ${
											value && !errors
												? 'text-primary'
												: errors && touched
												? 'text-alert'
												: 'text-primary'
										} `}
				>
					<Translation translationKey={labelKey} />
				</label>
			</div>
			{touched && errors && <h1 className='pl-4 text-alert'>{errors}</h1>}
		</div>
	);
};

export default SelectField;
