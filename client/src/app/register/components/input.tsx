import React, { useState } from 'react';
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

export function Input({
  type,
  labelKey,
  value,
  name,
  handleChange,
  touched,
  errors,
  placeholderValue,


}: InputProps) {
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
          className={`border px-2 py-3 rounded-md focus:outline-none focus:ring-0 autofill:bg-white ${errors && touched ? 'border-alert' : 'border-button focus:border-primary'}`}
        />
        <label
          htmlFor={name}
          className={`absolute left-3 bottom-10 pointer-events-none px-1 text-xs bg-white z-10   
            ${value && !errors ?  'text-primary' : errors && touched ? 'text-alert' : 'text-text-foreground'} `}
        >
          <Translation translationKey={labelKey} />
        </label>
        {showIcon && (name !== "businessWebsite" && name !== "middleName" && name !== "mediaProfile")  && (
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
