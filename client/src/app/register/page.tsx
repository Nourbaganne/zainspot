"use client";
import Image from "next/image";
import { useFormik } from "formik";
import * as Yup from "yup";

import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";

import loginImage from "./assets/login-image.svg";
import eyeOutline from "./assets/eye-outline.svg";

const Register = () => {
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
      confirmPassword: "",
      businessNumber: "",
      businessName: "",
      tradeName: "",
      businessTradingName: "",
      businessType: "",
      businessWebsite: "",
      country: "",
      city: "",
      state: "",
      interestRegion: "",
      name: "",
      middleName: "",
      lastName: "",
      gender: "",
      birthday: "",
      mediaProfile: "",
    },

    validationSchema: Yup.object({
      email: Yup.string()
        .email("Invalid email adresse")
        .required("Email is required"),
      password: Yup.string().required("Password is required"),
      confirmPassword: Yup.string()
        .oneOf([Yup.ref("password")], "Passwords must match")
        .required("Confirm password is required"),
      businessNumber: Yup.number().required("Business Number is required"),
      businessName: Yup.string().required("Business name is required"),
      tradeName: Yup.string().required("Business name is required"),
      businessType: Yup.string().required("Business type is required"),
      country: Yup.string().required("Business country is required"),
      businessWebsite: Yup.string().required("Business website is required"),
      city: Yup.string().required("City is required"),
      state: Yup.string().required(
        "State or Province or Deparment is required"
      ),
      interestRegion: Yup.string().required("Regions of interest are required"),
      name: Yup.string().required("Name is required"),
      middleName: Yup.string().required("middle name is required"),
      lastName: Yup.string().required("Last name is required"),
      gender: Yup.string().required("Gender is required"),
      birthday: Yup.string().required("Birthday is required"),
      mediaProfile: Yup.string().required("Social media is required"),
    }),
    onSubmit: async (values) => {
      console.log("register with success");
    },
  });
  return (
    <div className="grid grid-cols-5 py-14  ">
      <div className="pt-16 z-0 col-span-2">
        <Image
          className="absolute w-[1100px]  "
          src={loginImage}
          alt="login image"
        />
      </div>

      <div className="col-span-3 flex flex-col items-center gap-10 w-full px-36  bg-background z-10">
        <div className="flex text-xl gap-2 font-bold">
          <h1 className="text-text">
            Create Your Secure Account{" "}
            <span className="text-span font-normal">or</span>
          </h1>
          <button className="text-primary font-bold underline hover:no-underline">
            Login
          </button>
        </div>
        <div className="flex flex-col gap-4">
          <h1 className="text-4xl font-bold text-description  ">
            Welcome to Business Without Borders!
          </h1>
          <p className="text-description-foreground">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua.
          </p>
        </div>
        <form onSubmit={formik.handleSubmit} className="flex flex-col gap-10">
          <div className="flex flex-col gap-2">
            <div className="relative flex flex-col">
              <input
                type="text"
                name="email"
                value={formik.values.email}
                onChange={formik.handleChange}
                className={`border px-2 py-3 rounded-md peer focus:outline-none focus:ring-0  ${
                  formik.errors.email && formik.touched.email
                    ? "border-alert"
                    : "border-button focus:border-primary"
                }`}
              />
              <label
                htmlFor="email"
                className={`absolute left-3 top-1/2 transform -translate-y-1/2 text-base text-text-foreground transition-all duration-300 pointer-events-none px-1 peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-base peer-focus:top-0 peer-focus:left-3 peer-focus:text-xs peer-visited:top-0 peer-focus:bg-white peer-focus:z-10 
                ${
                  formik.errors.email && formik.touched.email
                    ? "peer-focus:text-alert "
                    : "peer-focus:text-primary"
                }
                ${
                  formik.values.email
                    ? "top-[0px] left-3 text-xs bg-white z-10"
                    : ""
                }
              `}
              >
                Your Business Email
              </label>
            </div>

            {formik.touched.email && formik.errors.email && (
              <h1 className="pl-4 text-alert">{formik.errors.email}</h1>
            )}
          </div>
          <div className="flex gap-6">
            <div className="flex flex-col gap-2 w-full">
              <div className="relative flex flex-col w-full">
                <input
                  type="password"
                  name="password"
                  id="password"
                  value={formik.values.password}
                  onChange={formik.handleChange}
                  className={`border px-2 py-3 rounded-md peer focus:outline-none focus:ring-0  
                    ${
                      formik.errors.password && formik.touched.password
                        ? "border-alert"
                        : "border-button focus:border-primary"
                    }
                  `}
                />
                <label
                  htmlFor="password"
                  className={`absolute left-3 top-1/2 transform -translate-y-1/2 text-base text-text-foreground transition-all duration-300 pointer-events-none px-1 peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-base peer-focus:top-0 peer-focus:left-3 peer-focus:text-xs peer-visited:top-0 peer-focus:bg-white peer-focus:z-10 
                    ${
                      formik.errors.password && formik.touched.password
                        ? "peer-focus:text-alert"
                        : "peer-focus:text-primary"
                    }
                    ${
                      formik.values.password
                        ? "top-[0px] left-3 text-xs bg-white z-10"
                        : ""
                    }
                  `}
                >
                  Password
                </label>
                <div className="absolute inset-y-0 right-3 flex items-center">
                  <Image
                    src={eyeOutline}
                    alt="eye-outline"
                    className="cursor-pointer"
                  />
                </div>
              </div>
              {formik.touched.password && formik.errors.password && (
                <h1 className="pl-4 text-alert">{formik.errors.password}</h1>
              )}
            </div>

            <div className="flex flex-col gap-2 w-full">
              <div className="relative flex flex-col w-full">
                <input
                  type="password"
                  name="confirmPassword"
                  id="confirmps"
                  value={formik.values.confirmPassword}
                  onChange={formik.handleChange}
                  className={`border px-2 py-3 rounded-md peer focus:outline-none focus:ring-0  ${
                    formik.errors.confirmPassword &&
                    formik.touched.confirmPassword
                      ? "border-alert"
                      : "border-button focus:border-primary"
                  }`}
                />
                <label
                  htmlFor="confirmPassword"
                  className={`absolute left-3 top-1/2 transform -translate-y-1/2 text-base text-text-foreground transition-all duration-300 pointer-events-none px-1 peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-base peer-focus:top-0 peer-focus:left-3 peer-focus:text-xs peer-visited:top-0 peer-focus:bg-white peer-focus:z-10 
                    ${
                      formik.errors.confirmPassword &&
                      formik.touched.confirmPassword
                        ? "peer-focus:text-alert text-alert"
                        : "peer-focus:text-primary"
                    }
                    ${
                      formik.values.confirmPassword
                        ? "top-[0px] left-3 text-xs bg-white z-10"
                        : ""
                    }
                  `}
                >
                  Confirm Password
                </label>
              </div>
              {formik.touched.confirmPassword &&
                formik.errors.confirmPassword && (
                  <h1 className="pl-4 text-alert">
                    {formik.errors.confirmPassword}
                  </h1>
                )}
            </div>
          </div>
          <div className="flex flex-col gap-2 ">
            <div className="relative flex flex-col">
              <PhoneInput
                country={"us"}
                value={formik.values.businessNumber}
                onChange={formik.handleChange}
                inputProps={{
                  className: `
                    border pl-14 text-base py-3 rounded-md peer focus:outline-none focus:ring-0 w-full
                  ${
                    formik.errors.businessNumber &&
                    formik.touched.businessNumber
                      ? "border-alert"
                      : "border-button focus:border-primary"
                  }
                
                  `,
                  name: "businessNumber",
                }}
              />
              <label
                htmlFor="businessNumber"
                className={`absolute left-3 top-0 transform -translate-y-1/2 text-xs bg-white text-text-foreground  px-1  
                  ${
                    formik.errors.businessNumber &&
                    formik.touched.businessNumber
                      ? "text-alert"
                      : "text-primary"
                  }`}
              >
                Your Business Mobile Number
              </label>
            </div>

            {formik.touched.businessNumber && formik.errors.businessNumber && (
              <h1 className="pl-4 text-alert">
                {formik.errors.businessNumber}
              </h1>
            )}
          </div>
          <div className="flex gap-6">
            <div className="flex flex-col gap-2 w-full">
              <div className="relative flex flex-col w-full">
                <input
                  type="text"
                  name="businessName"
                  value={formik.values.businessName}
                  onChange={formik.handleChange}
                  className={`border px-2 py-3 rounded-md peer focus:outline-none focus:ring-0  
                    ${
                      formik.errors.businessName && formik.touched.businessName
                        ? "border-alert"
                        : "border-button focus:border-primary"
                    }
                  `}
                />
                <label
                  htmlFor="businessName"
                  className={`absolute left-3 top-1/2 transform -translate-y-1/2 text-base text-text-foreground transition-all duration-300 pointer-events-none px-1 peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-base peer-focus:top-0 peer-focus:left-3 peer-focus:text-xs peer-visited:top-0 peer-focus:bg-white peer-focus:z-10 
                    ${
                      formik.errors.businessName && formik.touched.businessName
                        ? "peer-focus:text-alert"
                        : "peer-focus:text-primary"
                    }
                    ${
                      formik.values.businessName
                        ? "top-[0px] left-3 text-xs bg-white z-10"
                        : ""
                    }
                  `}
                >
                  Your Business Legal Name
                </label>
              </div>
              {formik.touched.businessName && formik.errors.businessName && (
                <h1 className="pl-4 text-alert">
                  {formik.errors.businessName}
                </h1>
              )}
            </div>

            <div className="flex flex-col gap-2 w-full">
              <div className="relative flex flex-col w-full">
                <input
                  type="text"
                  name="tradeName"
                  id="tradeName"
                  value={formik.values.tradeName}
                  onChange={formik.handleChange}
                  className={`border px-2 py-3 rounded-md peer focus:outline-none focus:ring-0  ${
                    formik.errors.tradeName && formik.touched.tradeName
                      ? "border-alert"
                      : "border-button focus:border-primary"
                  }`}
                />
                <label
                  htmlFor="tradeName"
                  className={`absolute left-3 top-1/2 transform -translate-y-1/2 text-base text-text-foreground transition-all duration-300 pointer-events-none px-1 peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-base peer-focus:top-0 peer-focus:left-3 peer-focus:text-xs peer-visited:top-0 peer-focus:bg-white peer-focus:z-10 
                    ${
                      formik.errors.tradeName && formik.touched.tradeName
                        ? "peer-focus:text-alert text-alert"
                        : "peer-focus:text-primary"
                    }
                    ${
                      formik.values.tradeName
                        ? "top-[0px] left-3 text-xs bg-white z-10"
                        : ""
                    }
                  `}
                >
                  Your Business Trading Name
                </label>
              </div>
              {formik.touched.tradeName && formik.errors.tradeName && (
                <h1 className="pl-4 text-alert">{formik.errors.tradeName}</h1>
              )}
            </div>
          </div>
          <div className="flex gap-6 ">
            <div className="flex flex-col gap-2 w-full">
              <div className="relative flex flex-col w-full">
                <select
                  name="businessType"
                  value={formik.values.businessType}
                  onChange={formik.handleChange}
                  className={`border px-2 py-3 rounded-md peer focus:outline-none focus:ring-0 ${
                    formik.errors.businessType && formik.touched.businessType
                      ? "border-alert"
                      : "border-button focus:border-primary"
                  }`}
                >
                  <option value="" disabled></option>
                  <option value="business1">Business 1</option>
                  <option value="business2">Business 2</option>
                  <option value="business3">Business 3</option>
                </select>
                <label
                  htmlFor="businessType"
                  className={`absolute left-3 top-1/2 transform -translate-y-1/2 text-base text-text-foreground transition-all duration-300 pointer-events-none px-1 peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-base peer-focus:top-0 peer-focus:left-3 peer-focus:text-xs peer-visited:top-0 peer-focus:bg-white peer-focus:z-10 ${
                    formik.errors.businessType && formik.touched.businessType
                      ? "peer-focus:text-alert text-alert"
                      : "peer-focus:text-primary"
                  } ${
                    formik.values.businessType
                      ? "top-[0px] left-3 text-xs bg-white z-10"
                      : ""
                  }`}
                >
                  Your Type of Business
                </label>
              </div>
              {formik.touched.businessType && formik.errors.businessType && (
                <h1 className="pl-4 text-alert">
                  {formik.errors.businessType}
                </h1>
              )}
            </div>

            <div className="flex flex-col gap-2 w-full">
              <div className="w-full relative flex flex-col">
                <input
                  type="text"
                  name="businessWebsite"
                  id="businessWebsite"
                  value={formik.values.businessWebsite}
                  onChange={formik.handleChange}
                  className={`border px-2 py-3 rounded-md peer focus:outline-none focus:ring-0 ${
                    formik.errors.businessWebsite &&
                    formik.touched.businessWebsite
                      ? "border-alert"
                      : "border-button focus:border-primary"
                  }`}
                />
                <label
                  htmlFor="businessWebsite"
                  className={`absolute left-3 top-1/2 transform -translate-y-1/2 text-base text-text-foreground transition-all duration-300 pointer-events-none px-1 peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-base peer-focus:top-0 peer-focus:left-3 peer-focus:text-xs peer-focus:bg-white peer-focus:z-10 ${
                    formik.errors.businessWebsite &&
                    formik.touched.businessWebsite
                      ? "peer-focus:text-alert text-alert"
                      : "peer-focus:text-primary"
                  } ${
                    formik.values.businessWebsite
                      ? "top-[0px] left-3 text-xs bg-white z-10"
                      : ""
                  }`}
                >
                  Your Business Website Address
                </label>
              </div>

              {formik.touched.businessWebsite &&
                formik.errors.businessWebsite && (
                  <h1 className="pl-4 text-alert">
                    {formik.errors.businessWebsite}
                  </h1>
                )}
            </div>
          </div>
          <div className="flex gap-6">
            <div className="flex flex-col w-full gap-2">
              <div className="relative flex flex-col">
                <input
                  type="text"
                  name="country"
                  id="country"
                  value={formik.values.country}
                  onChange={formik.handleChange}
                  className={`border px-2 py-3 rounded-md peer focus:outline-none focus:ring-0 ${
                    formik.errors.country && formik.touched.country
                      ? "border-alert"
                      : "border-button focus:border-primary"
                  }`}
                />
                <label
                  htmlFor="country"
                  className={`absolute left-3 top-1/2 transform -translate-y-1/2 text-base text-text-foreground transition-all duration-300 pointer-events-none px-1 peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-base peer-focus:top-0 peer-focus:left-3 peer-focus:text-xs peer-focus:bg-white peer-focus:z-10 ${
                    formik.errors.country && formik.touched.country
                      ? "peer-focus:text-alert text-alert"
                      : "peer-focus:text-primary"
                  } ${
                    formik.values.country
                      ? "top-[0px] left-3 text-xs bg-white z-10"
                      : ""
                  }`}
                >
                  Your Country of Business
                </label>
              </div>
              {formik.touched.country && formik.errors.country && (
                <h1 className="pl-4 text-alert">{formik.errors.country}</h1>
              )}
            </div>

            <div className="flex flex-col w-full gap-2">
              <div className="relative flex flex-col">
                <input
                  type="text"
                  name="city"
                  id="city"
                  value={formik.values.city}
                  onChange={formik.handleChange}
                  className={`border px-2 py-3 rounded-md peer focus:outline-none focus:ring-0 ${
                    formik.errors.city && formik.touched.city
                      ? "border-alert"
                      : "border-button focus:border-primary"
                  }`}
                />
                <label
                  htmlFor="city"
                  className={`absolute left-3 top-1/2 transform -translate-y-1/2 text-base text-text-foreground transition-all duration-300 pointer-events-none px-1 peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-base peer-focus:top-0 peer-focus:left-3 peer-focus:text-xs peer-focus:bg-white peer-focus:z-10 ${
                    formik.errors.city && formik.touched.city
                      ? "peer-focus:text-alert text-alert"
                      : "peer-focus:text-primary"
                  } ${
                    formik.values.city
                      ? "top-[0px] left-3 text-xs bg-white z-10"
                      : ""
                  }`}
                >
                  City
                </label>
              </div>
              {formik.touched.city && formik.errors.city && (
                <h1 className="pl-4 text-alert">{formik.errors.city}</h1>
              )}
            </div>

            <div className="flex flex-col w-full gap-2">
              <div className="relative flex flex-col">
                <input
                  type="text"
                  name="state"
                  id="state"
                  value={formik.values.state}
                  onChange={formik.handleChange}
                  className={`border px-2 py-3 rounded-md peer focus:outline-none focus:ring-0 ${
                    formik.errors.state && formik.touched.state
                      ? "border-alert"
                      : "border-button focus:border-primary"
                  }`}
                />
                <label
                  htmlFor="state"
                  className={`absolute left-3 top-1/2 transform -translate-y-1/2 text-base text-text-foreground transition-all duration-300 pointer-events-none px-1 peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-base peer-focus:top-0 peer-focus:left-3 peer-focus:text-xs peer-focus:bg-white peer-focus:z-10 ${
                    formik.errors.state && formik.touched.state
                      ? "peer-focus:text-alert text-alert"
                      : "peer-focus:text-primary"
                  } ${
                    formik.values.state
                      ? "top-[0px] left-3 text-xs bg-white z-10"
                      : ""
                  }`}
                >
                  State/Province/Department
                </label>
              </div>

              {formik.touched.state && formik.errors.state && (
                <h1 className="pl-4 text-alert">{formik.errors.state}</h1>
              )}
            </div>
          </div>
          <div className="flex flex-col gap-2 w-full">
            <div className="relative flex flex-col w-full">
              <select
                name="interestRegion"
                value={formik.values.interestRegion}
                onChange={formik.handleChange}
                className={`border px-2 py-3 rounded-md peer focus:outline-none focus:ring-0 ${
                  formik.errors.interestRegion && formik.touched.interestRegion
                    ? "border-alert"
                    : "border-button focus:border-primary"
                }`}
              >
                <option value="" disabled></option>
                <option value="region1">Region 1</option>
                <option value="region2">Region 2</option>
                <option value="region3">Region 3</option>
              </select>
              <label
                htmlFor="interestRegion"
                className={`absolute left-3 top-1/2 transform -translate-y-1/2 text-base text-text-foreground transition-all duration-300 pointer-events-none px-1 peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-base peer-focus:top-0 peer-focus:left-3 peer-focus:text-xs peer-visited:top-0 peer-focus:bg-white peer-focus:z-10 ${
                  formik.errors.interestRegion && formik.touched.interestRegion
                    ? "peer-focus:text-alert text-alert"
                    : "peer-focus:text-primary"
                } ${
                  formik.values.interestRegion
                    ? "top-[0px] left-3 text-xs bg-white z-10"
                    : ""
                }`}
              >
                Your Regions of Interest
              </label>
            </div>
            {formik.touched.interestRegion && formik.errors.interestRegion && (
              <h1 className="pl-4 text-alert">
                {formik.errors.interestRegion}
              </h1>
            )}
          </div>
          <div className="flex gap-6">
            <div className="flex flex-col w-full gap-2">
              <div className="relative flex flex-col">
                <input
                  type="text"
                  name="name"
                  id="name"
                  value={formik.values.name}
                  onChange={formik.handleChange}
                  className={`border px-2 py-3 rounded-md peer focus:outline-none focus:ring-0 ${
                    formik.errors.name && formik.touched.name
                      ? "border-alert"
                      : "border-button focus:border-primary"
                  }`}
                />
                <label
                  htmlFor="name"
                  className={`absolute left-3 top-1/2 transform -translate-y-1/2 text-base text-text-foreground transition-all duration-300 pointer-events-none px-1 peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-base peer-focus:top-0 peer-focus:left-3 peer-focus:text-xs peer-focus:bg-white peer-focus:z-10 ${
                    formik.errors.name && formik.touched.name
                      ? "peer-focus:text-alert text-alert"
                      : "peer-focus:text-primary"
                  } ${
                    formik.values.name
                      ? "top-[0px] left-3 text-xs bg-white z-10"
                      : ""
                  }`}
                >
                  Your First Name
                </label>
              </div>
              {formik.touched.name && formik.errors.name && (
                <h1 className="pl-4 text-alert">{formik.errors.name}</h1>
              )}
            </div>

            <div className="flex flex-col w-full gap-2">
              <div className="relative flex flex-col">
                <input
                  type="text"
                  name="middleName"
                  id="middleName"
                  value={formik.values.middleName}
                  onChange={formik.handleChange}
                  className={`border px-2 py-3 rounded-md peer focus:outline-none focus:ring-0 ${
                    formik.errors.middleName && formik.touched.middleName
                      ? "border-alert"
                      : "border-button focus:border-primary"
                  }`}
                />
                <label
                  htmlFor="middleName"
                  className={`absolute left-3 top-1/2 transform -translate-y-1/2 text-base text-text-foreground transition-all duration-300 pointer-events-none px-1 peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-base peer-focus:top-0 peer-focus:left-3 peer-focus:text-xs peer-focus:bg-white peer-focus:z-10 ${
                    formik.errors.middleName && formik.touched.middleName
                      ? "peer-focus:text-alert text-alert"
                      : "peer-focus:text-primary"
                  } ${
                    formik.values.middleName
                      ? "top-[0px] left-3 text-xs bg-white z-10"
                      : ""
                  }`}
                >
                  Your Middle Name
                </label>
              </div>

              {formik.touched.middleName && formik.errors.middleName && (
                <h1 className="pl-4 text-alert">{formik.errors.middleName}</h1>
              )}
            </div>

            <div className="flex flex-col gap-2">
              <div className="relative flex flex-col">
                <input
                  type="text"
                  name="lastName"
                  id="lastName"
                  value={formik.values.lastName}
                  onChange={formik.handleChange}
                  className={`border px-2 py-3 rounded-md peer focus:outline-none focus:ring-0 ${
                    formik.errors.lastName && formik.touched.lastName
                      ? "border-alert"
                      : "border-button focus:border-primary"
                  }`}
                />
                <label
                  htmlFor="lastName"
                  className={`absolute left-3 top-1/2 transform -translate-y-1/2 text-base text-text-foreground transition-all duration-300 pointer-events-none px-1 peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-base peer-focus:top-0 peer-focus:left-3 peer-focus:text-xs peer-focus:bg-white peer-focus:z-10 ${
                    formik.errors.lastName && formik.touched.lastName
                      ? "peer-focus:text-alert text-alert"
                      : "peer-focus:text-primary"
                  } ${
                    formik.values.lastName
                      ? "top-[0px] left-3 text-xs bg-white z-10"
                      : ""
                  }`}
                >
                  Your Last Name
                </label>
              </div>
              {formik.touched.lastName && formik.errors.lastName && (
                <h1 className="pl-4 text-alert">{formik.errors.lastName}</h1>
              )}
            </div>
          </div>
          <div className="flex gap-12 text-lg w-full items-center ">
            <div className="flex flex-col gap-6 ">
              <div className="flex gap-4 items-center">
                <label htmlFor="gender" className="font-bold">
                  Gender
                </label>
                <div className="flex gap-3">
                  <input
                    type="radio"
                    id="male"
                    name="gender"
                    value="male"
                    checked={formik.values.gender === "male"}
                    onChange={formik.handleChange}
                    className={`w-5 h-5 accent-primary ${
                      formik.errors.gender && formik.touched.gender
                        ? "border-alert"
                        : ""
                    }`}
                  />
                  <label htmlFor="male">Male</label>
                </div>
                <div className="flex gap-3">
                  <input
                    type="radio"
                    id="female"
                    name="gender"
                    value="female"
                    checked={formik.values.gender === "female"}
                    onChange={formik.handleChange}
                    className={`w-5 h-5 accent-primary ${
                      formik.errors.gender && formik.touched.gender
                        ? "border-alert"
                        : ""
                    }`}
                  />
                  <label htmlFor="female">Female</label>
                </div>
              </div>
              {formik.touched.gender && formik.errors.gender && (
                <p className="text-alert">{formik.errors.gender}</p>
              )}
            </div>

            <div className="flex flex-col w-full gap-2">
              <div className="flex gap-4 items-center ">
                <h1 className="font-bold">Your Birthday</h1>
                <input
                  type="date"
                  name="birthday"
                  id="birthday"
                  value={formik.values.birthday}
                  onChange={formik.handleChange}
                  className={`border px-2 py-3 rounded-md peer focus:outline-none focus:ring-0 w-2/3 ${
                    formik.errors.birthday && formik.touched.birthday
                      ? "border-alert"
                      : "border-button focus:border-primary"
                  }`}
                />
              </div>

              {formik.errors.birthday && formik.touched.birthday && (
                <p className="text-alert">{formik.errors.birthday}</p>
              )}
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <div className="relative flex flex-col">
              <input
                type="text"
                name="mediaProfile"
                id="mediaProfile"
                value={formik.values.mediaProfile}
                onChange={formik.handleChange}
                className={`border px-2 py-3 rounded-md peer focus:outline-none focus:ring-0  ${
                  formik.errors.mediaProfile && formik.touched.mediaProfile
                    ? "border-alert"
                    : "border-button focus:border-primary"
                }`}
              />
              <label
                htmlFor="mediaProfile"
                className={`absolute left-3 top-1/2 transform -translate-y-1/2 text-base text-text-foreground transition-all duration-300 pointer-events-none px-1 peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-base peer-focus:top-0 peer-focus:left-3 peer-focus:text-xs peer-visited:top-0 peer-focus:bg-white peer-focus:z-10 
                  ${
                    formik.errors.mediaProfile && formik.touched.mediaProfile
                      ? "peer-focus:text-alert "
                      : "peer-focus:text-primary"
                  }
                  ${
                    formik.values.mediaProfile
                      ? "top-[0px] left-3 text-xs bg-white z-10"
                      : ""
                  }
                `}
              >
                Your Social Media Profiles
              </label>
            </div>

            {formik.touched.mediaProfile && formik.errors.mediaProfile && (
              <h1 className="pl-4 text-alert">{formik.errors.mediaProfile}</h1>
            )}
          </div>

          <button
            type="submit"
            className="w-full bg-button py-4 rounded-md text-xl font-bold text-background hover:bg-span translation-all duration-300"
          >
            Join ZainSpot
          </button>
          <p className="text-center">
            By clicking “Join ZainSpot”, you are creating your secure ZainSpot
            Account and you agree to ZainSpot’s{" "}
            <span className="text-primary underline cursor-pointer hover:no-underline">
              {" "}
              Terms of Use{" "}
            </span>{" "}
            and{" "}
            <span className="text-primary underline cursor-pointer hover:no-underline">
              {" "}
              Privacy Policy
            </span>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Register;
