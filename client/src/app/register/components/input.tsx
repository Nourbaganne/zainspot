import React from 'react';
import { FormikProps } from 'formik';
import Translation from '@/app/components/translation';
import Image from 'next/image';
import checked from "@/app/assets/register/checked.svg";
import alert from "@/app/assets/register/alert.svg";

interface InputProps {
  type: string;
  labelKey: string;
  value: string | number;
  name: string;
  touched: boolean | undefined;
  errors: string | undefined;
  handleChange: (e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLTextAreaElement>) => void;
  formik: FormikProps<any>;
  placeholderValue?: string;
  rows?: number;
}

export function Input({
  type,
  labelKey,
  value,
  name,
  handleChange,
  touched,
  errors,
  placeholderValue,
  rows,
}: InputProps) {
  const showIcon = value && (errors ? alert : checked);

  return (
    <div className="relative flex flex-col gap-2 w-full">
      <div className=" flex flex-col">
        {type === "textarea" ? (
          <textarea
            name={name}
            value={value}
            placeholder={placeholderValue}
            onChange={handleChange}
            className={`text-sm border p-3 rounded-md font-light focus:outline-none focus:ring-0 autofill:bg-white resize-none ${
              errors && touched ? 'border-alert' : 'border-button focus:border-primary'
            }`}
            rows={rows} 
          />
        ) : (
          <input
            type={type}
            name={name}
            value={value}
            onChange={handleChange}
            placeholder={placeholderValue}
            className={`text-sm border p-3 rounded-md font-light outline-none focus:outline-none focus:ring-0 autofill:bg-white ${
              errors && value ? 'border-alert' : 'border-button focus:border-primary'
            }`}
          />
        )}
        <label
          htmlFor={name}
          className={`absolute top-[-7px] left-3 pointer-events-none px-1 text-xs bg-white z-10 ${
            value && errors ? 'text-alert' : 'text-primary'
          }`}
        >
          <Translation translationKey={labelKey} />
        </label>
        {showIcon && name !== 'businessWebsite' && name !== 'middleName' && name !== 'mediaProfile' && (
          <Image
            src={showIcon}
            alt={errors ? 'Alert' : 'Checked'}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5"
          />
        )}
      </div>
      {touched && errors && <p className="text-alert text-xs">{errors}</p>}
    </div>
  );
}
