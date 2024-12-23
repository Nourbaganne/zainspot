
import Translation from '@/app/components/translation';
import React from 'react';
import Select, { SingleValue, StylesConfig } from 'react-select';



interface OptionType {
    label: React.ReactNode;
    value: string;
}

interface SelectWrapperProps {
    labelKey: string;
    options: OptionType[];
    value: OptionType | null;
    onChange: (option: SingleValue<OptionType>) => void;
    placeholder?: string;
    error?: string;
    touched?: boolean;
    name: string;
}

const customStyles: StylesConfig<OptionType, false> = {
    control: (provided: any, state: any) => ({
        ...provided,
        borderColor: state.isFocused
            ? '#00927C' // Tailwind's blue-600
            : state.selectProps.error
                ? '#DC2626' // Tailwind's red-600
                : '#D1D5DB', // Tailwind's gray-300
        boxShadow: 'none',
        '&:hover': {
            borderColor: state.isFocused
                ? '#2563EB'
                : state.selectProps.error
                    ? '#DC2626'
                    : '#9CA3AF', // Tailwind's gray-400
        },
        paddingLeft: '0.5rem', // Match Input padding
        paddingRight: '0.5rem',
        borderRadius: '0.375rem', // Tailwind's rounded-md
        height: '3rem', // Tailwind's py-3
        fontSize: '0.875rem', // Tailwind's text-sm
        fontWeight: 300, // Tailwind's font-light
    }),
    menu: (provided: any) => ({
        ...provided,
        zIndex: 9999, // Ensure the dropdown menu is above other elements
        borderRadius: '0.375rem', // Tailwind's rounded-md
        marginTop: '0.25rem',
        boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
    }),
    placeholder: (provided: any) => ({
        ...provided,
        color: '#6B7280', // Tailwind's gray-500
    }),
    singleValue: (provided: any) => ({
        ...provided,
        color: '#111827', // Tailwind's gray-900
    }),
    dropdownIndicator: (provided: any) => ({
        ...provided,
        color: '#6B7280', // Tailwind's gray-500
        '&:hover': {
            color: '#2563EB', // Tailwind's blue-600 on hover
        },
    }),
    clearIndicator: (provided: any) => ({
        ...provided,
        color: '#6B7280', // Tailwind's gray-500
        '&:hover': {
            color: '#DC2626', // Tailwind's red-600 on hover
        },
    }),
    indicatorSeparator: () => ({
        display: 'none',
    }),
};

const SelectWrapper: React.FC<SelectWrapperProps> = ({
    labelKey,
    options,
    value,
    onChange,
    placeholder,
    error,
    touched,
    name,
}) => (
    <div className="w-full col-span-3 relative">
        <label className='absolute z-30 bg-white text-xs text-primary ml-3 bottom-10'>
            <Translation translationKey={labelKey} />
        </label>
        <Select
            styles={customStyles}
            options={options}
            value={value}
            onChange={onChange}
            placeholder={placeholder}
            isClearable
            className={`w-full ${touched && error ? 'border-alert' : 'border-button'}`}
            classNamePrefix="react-select"
        />
        {touched && error && <p className="text-alert text-sm mt-1">{error}</p>}
    </div>
);

export default React.memo(SelectWrapper);
