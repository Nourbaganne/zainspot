import React from 'react';
import { FormikProps } from 'formik';
import Translation from '@/app/components/translation';
import checked from "@/app/assets/register/checked.svg";
import alert from "@/app/assets/register/alert.svg";
import Image from 'next/image';

interface InputProps {
  type: string;
  labelKey: string;
  value: string;
  name: string;
  touched: boolean | undefined;
  errors: string | undefined;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  formik: FormikProps<any>;
  placeholderValue?: string;
}

export function Input({ type, labelKey, value, name, handleChange, touched, errors, placeholderValue }: InputProps) {
  const showIcon = touched && (errors ? alert : checked);

  return (
    <div className="flex flex-col gap-2 w-full">
      <div className="relative flex flex-col">
        <input
          type={type}
          name={name}
          value={value}
          onChange={handleChange}
          placeholder={placeholderValue}
          className={`border px-2 py-3 rounded-md peer focus:outline-none focus:ring-0 autofill:bg-white ${
            errors && touched ? 'border-alert' : 'border-button focus:border-primary'
          }`}
        />
        <label
          htmlFor={name}
          className={`absolute left-3 top-1/2 transform -translate-y-1/2 text-sm transition-all duration-300 pointer-events-none px-1 peer-focus:left-3 peer-focus:text-xs peer-visited:top-0 peer-focus:bg-white peer-focus:z-10 ${
            placeholderValue ? 'top-[0px] left-3 text-xs bg-white z-10' : 'peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-base peer-focus:top-0'
          } ${
            errors && touched ? 'peer-focus:text-alert' : 'peer-focus:text-primary'
          } ${value ? 'top-[0px] left-3 text-xs bg-white z-10 text-primary' : 'text-text-foreground'}`}
        >
          <Translation translationKey={labelKey} />
        </label>
        {showIcon && (
          <Image
            src={showIcon}
            alt={errors ? 'Alert' : 'Checked'}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5"
          />
        )}
      </div>
      {touched && errors && (
        <h1 className="pl-4 text-alert">{errors}</h1>
      )}
    </div>
  );
}
