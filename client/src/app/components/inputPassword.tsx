"use client";

import React, { useState, useEffect, useRef } from 'react';
import Translation from '@/app/components/translation';
import Image from 'next/image';
import eyeOutline from "@/app/assets/register/eye-outline.svg";
import eyeOffOutline from "@/app/assets/register/eye-off-outline.svg";
import checked from "@/app/assets/register/checked.svg";
import close from "@/app/assets/register/close-outline.svg";
import alert from "@/app/assets/register/alert.svg";
import { FormikProps } from 'formik';

interface InputPasswordProps {
    type?: string;
    labelKey: string;
    value: string;
    name: string;
    touched: boolean | undefined;
    errors: string | undefined;
    formik: FormikProps<any>;
    placeholderValue?: string;
}

const InputPassword = ({
    type = "password",
    labelKey,
    value,
    name,
    touched,
    errors,
    formik,
    placeholderValue
}: InputPasswordProps) => {
    const [showPassword, setShowPassword] = useState(false);
    const [isTypingPassword, setIsTypingPassword] = useState(false);
    const [passwordRequirements, setPasswordRequirements] = useState({
        length: false,
        uppercase: false,
        lowercase: false,
        number: false,
        specialChar: false,
    });
    const [checkPasswordReq, setCheckPasswordReq] = useState(false);

    const inputRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (inputRef.current && !inputRef.current.contains(event.target as Node)) {
                setIsTypingPassword(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    useEffect(() => {
        if (isTypingPassword) {
            setCheckPasswordReq(true);
        } else if (touched && errors) {
            setCheckPasswordReq(true);
        }
    }, [isTypingPassword, touched, errors]);

    const validatePassword = (password: string) => {
        setPasswordRequirements({
            length: password.length >= 8,
            uppercase: /[A-Z]/.test(password),
            lowercase: /[a-z]/.test(password),
            number: /[0-9]/.test(password),
            specialChar: /[^\w]/.test(password),
        });
    };

    const togglePasswordVisibility = () => setShowPassword(!showPassword);
    const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        formik.handleChange(e);
        validatePassword(e.target.value);
        setIsTypingPassword(e.target.value !== "");
    };

    const PASSWORD_REQUIREMENT_MENU = [
        { title: "8 characters minimum", isCorrect: passwordRequirements.length },
        { title: "1 uppercase letter", isCorrect: passwordRequirements.uppercase },
        { title: "1 lowercase letter", isCorrect: passwordRequirements.lowercase },
        { title: "1 number", isCorrect: passwordRequirements.number },
        { title: "1 special character, e.g.: !@#%&*^°", isCorrect: passwordRequirements.specialChar },
    ];

    return (
        <div ref={inputRef} className="flex flex-col gap-2 w-full relative">
            <div className="relative flex flex-col">
                <input
                    type={showPassword ? "text" : type}
                    name={name}
                    value={value}
                    onChange={handlePasswordChange}
                    placeholder={placeholderValue}
                    className={`border px-2 py-3 rounded-md peer focus:outline-none focus:ring-0 autofill:bg-white ${errors && value ? 'border-alert' : 'border-button focus:border-primary'}`}
                />
                <label
                    htmlFor={name}
                    className={`absolute left-3 bottom-[41px] pointer-events-none px-1 text-xs bg-white z-10   
                        ${value && errors ? 'text-alert' : 'text-primary'} `}
                >
                    <Translation translationKey={labelKey} />
                </label>

                <div className="absolute inset-y-0 right-3 flex items-center">
                    {isTypingPassword ? (
                        <Image
                            src={showPassword ? eyeOffOutline : eyeOutline}
                            alt={showPassword ? 'eyeoff-outline' : "eye-outline"}
                            className="cursor-pointer"
                            onClick={togglePasswordVisibility}
                        />
                    ) : (
                        value  && (
                            <Image
                                src={errors ? alert : checked}
                                alt={errors ? 'Alert' : 'Checked'}
                            />
                        )
                    )}
                    
                </div>
            </div>
            {isTypingPassword && errors && (
                <div className='relative'>
                    <h1 className={`pl-4 text-alert ${name === 'password' && 'cursor-pointer'} `} onClick={() => setCheckPasswordReq(!checkPasswordReq)}>
                        {errors}
                    </h1>
                    {checkPasswordReq && name === "password" && (
                        <div className='absolute bg-background z-30 shadow-xl p-4 border rounded-md'>
                            {PASSWORD_REQUIREMENT_MENU.map((item, index) => (
                                <div className='flex gap-2' key={index}>
                                    {item.isCorrect ? <Image src={checked} alt={`${index}`} /> : <Image src={close} alt={`${index}`} />}
                                    <h1 className={`${item.isCorrect ? 'text-primary' : 'text-alert'}`}>{item.title}</h1>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};

export default InputPassword;
