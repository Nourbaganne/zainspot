import Image from "next/image";

import loginImage from "./assets/login-image.svg";
import eyeOutline from "./assets/eye-outline.svg";

const Register = () => {
  return (
    <div className="flex grid-cols-3 py-14 ">
      <Image className="pt-10 w-[700px] " src={loginImage} alt="login image" />

      <div className="flex flex-col items-center gap-10 w-full px-28">
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
        <form action="" className="w-full flex flex-col gap-12">
          <div className="relative flex flex-col  w-full">
            <input
              type="text"
              name="email"
              id="email"
              className="border border-button px-2 py-3 rounded-md peer"
            />
            <label
              htmlFor="email"
              className="absolute left-3 top-1/2 transform -translate-y-1/2 text-base text-gray-500 transition-all duration-300 pointer-events-none bg-white px-1 peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-500 peer-focus:top-0 peer-focus:left-3 peer-focus:text-xs peer-focus:text-gray-700 peer-focus:bg-white peer-focus:z-10"
            >
              Your Business Email
            </label>
          </div>
          <div className="flex gap-6 w-full">
            <div className="w-full">
              <div className="relative flex flex-col w-full">
                <input
                  type="password"
                  name="password"
                  id="password"
                  className="border border-button px-2 py-3 rounded-md peer"
                  placeholder=" "
                />
                <label
                  htmlFor="password"
                  className="absolute left-3 top-1/2 transform -translate-y-1/2 text-base text-gray-500 transition-all duration-300 pointer-events-none bg-white px-1 peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-500 peer-focus:top-0 peer-focus:left-3 peer-focus:text-xs peer-focus:text-gray-700 peer-focus:bg-white peer-focus:z-10"
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
            </div>
            <div className="w-full">
              <div className="relative flex flex-col  w-full">
                <input
                  type="password"
                  name="confirmps"
                  id="confirmps"
                  className="border border-button px-2 py-3 rounded-md peer"
                />
                <label
                  htmlFor="confirmps"
                  className="absolute left-3 top-1/2 transform -translate-y-1/2 text-base text-gray-500 transition-all duration-300 pointer-events-none bg-white px-1 peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-500 peer-focus:top-0 peer-focus:left-3 peer-focus:text-xs peer-focus:text-gray-700 peer-focus:bg-white peer-focus:z-10"
                >
                  Confirm Password
                </label>
              </div>
            </div>
          </div>
          <div className="relative flex flex-col  w-full">
            <input
              type="number"
              name="businessNum"
              id="businessNum"
              className="border border-button px-2 py-3 rounded-md peer"
            />
            <label
              htmlFor="businessNum"
              className="absolute left-3 top-1/2 transform -translate-y-1/2 text-base text-gray-500 transition-all duration-300 pointer-events-none bg-white px-1 peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-500 peer-focus:top-0 peer-focus:left-3 peer-focus:text-xs peer-focus:text-gray-700 peer-focus:bg-white peer-focus:z-10"
            >
              Your Business Mobile Number
            </label>
          </div>
          <div className="flex gap-6 w-full">
            <div className="w-full">
              <div className="relative flex flex-col w-full">
                <input
                  type="text"
                  name="businessName"
                  id="businessName"
                  className="border border-button px-2 py-3 rounded-md peer"
                />
                <label
                  htmlFor="businessName"
                  className="absolute left-3 top-1/2 transform -translate-y-1/2 text-base text-gray-500 transition-all duration-300 pointer-events-none bg-white px-1 peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-500 peer-focus:top-0 peer-focus:left-3 peer-focus:text-xs peer-focus:text-gray-700 peer-focus:bg-white peer-focus:z-10"
                >
                  Your Business Legal Name
                </label>
              </div>
            </div>
            <div className="w-full">
              <div className="relative flex flex-col w-full">
                <input
                  type="text"
                  name="tradeName"
                  id="tradeName"
                  className="border border-button px-2 py-3 rounded-md peer"
                />
                <label
                  htmlFor="tradeName"
                  className="absolute left-3 top-1/2 transform -translate-y-1/2 text-base text-gray-500 transition-all duration-300 pointer-events-none bg-white px-1 peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-500 peer-focus:top-0 peer-focus:left-3 peer-focus:text-xs peer-focus:text-gray-700 peer-focus:bg-white peer-focus:z-10"
                >
                  Your Business Trading Name
                </label>
              </div>
            </div>
          </div>
          <div className="flex gap-6 w-full">
            <div className="relative flex flex-col  w-full">
              <select
                className="border border-button px-2 py-3 rounded-md peer "
              >
                <option value="" disabled selected></option>
                <option value="business1">Business 1</option>
                <option value="business2">Business 2</option>
                <option value="business3">Business 3</option>
              </select>
              <label
                htmlFor="businessName"
                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-base text-gray-500 transition-all duration-300 pointer-events-none bg-white px-1 peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-500 peer-focus:top-0 peer-focus:left-3 peer-focus:text-xs peer-focus:text-gray-700 peer-focus:bg-white peer-focus:z-10"
              >
                PasswoYour Type of Businessrd
              </label>
            </div>
            <div className="w-full">
              <div className="relative flex flex-col w-full">
                <input
                  type="text"
                  name="website"
                  id="website"
                  className="border border-button px-2 py-3 rounded-md peer"
                />
                <label
                  htmlFor="website"
                  className="absolute left-3 top-1/2 transform -translate-y-1/2 text-base text-gray-500 transition-all duration-300 pointer-events-none bg-white px-1 peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-500 peer-focus:top-0 peer-focus:left-3 peer-focus:text-xs peer-focus:text-gray-700 peer-focus:bg-white peer-focus:z-10"
                >
                  Your Business Website Address
                </label>
              </div>
            </div>
          </div>
          <div className="flex gap-6 w-full">
            <div className="w-full">
              <div className="relative flex flex-col w-full">
                <input
                  type="text"
                  name="country"
                  id="country"
                  className="border border-button px-2 py-3 rounded-md peer"
                />
                <label
                  htmlFor="country"
                  className="absolute left-3 top-1/2 transform -translate-y-1/2 text-base text-gray-500 transition-all duration-300 pointer-events-none bg-white px-1 peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-500 peer-focus:top-0 peer-focus:left-3 peer-focus:text-xs peer-focus:text-gray-700 peer-focus:bg-white peer-focus:z-10"
                >
                  Your Country of Business
                </label>
              </div>
            </div>
            <div className="w-full">
              <div className="relative flex flex-col w-full">
                <input
                  type="text"
                  name="city"
                  id="city"
                  className="border border-button px-2 py-3 rounded-md peer"
                />
                <label
                  htmlFor="city"
                  className="absolute left-3 top-1/2 transform -translate-y-1/2 text-base text-gray-500 transition-all duration-300 pointer-events-none bg-white px-1 peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-500 peer-focus:top-0 peer-focus:left-3 peer-focus:text-xs peer-focus:text-gray-700 peer-focus:bg-white peer-focus:z-10"
                >
                  City
                </label>
              </div>
            </div>
            <div className="w-full">
              <div className="relative flex flex-col w-full">
                <input
                  type="text"
                  name="state"
                  id="state"
                  className="border border-button px-2 py-3 rounded-md peer"
                />
                <label
                  htmlFor="state"
                  className="absolute left-3 top-1/2 transform -translate-y-1/2 text-base text-gray-500 transition-all duration-300 pointer-events-none bg-white px-1 peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-500 peer-focus:top-0 peer-focus:left-3 peer-focus:text-xs peer-focus:text-gray-700 peer-focus:bg-white peer-focus:z-10"
                >
                  State/Province/Department
                </label>
              </div>
            </div>
          </div>
          <div className="relative flex flex-col  w-full">
              <select
                className="border border-button px-2 py-3 rounded-md peer "
              >
                <option value="" disabled selected></option>
                <option value="region1">region 1</option>
                <option value="region2">region 2</option>
                <option value="region">region 3</option>
              </select>
              <label
                htmlFor="businessName"
                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-base text-gray-500 transition-all duration-300 pointer-events-none bg-white px-1 peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-500 peer-focus:top-0 peer-focus:left-3 peer-focus:text-xs peer-focus:text-gray-700 peer-focus:bg-white peer-focus:z-10"
              >
                Your Regions of Interest
              </label>
            </div>
        </form>
      </div>
    </div>
  );
};

export default Register;
