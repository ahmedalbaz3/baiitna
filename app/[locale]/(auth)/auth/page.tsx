"use client";
import Button from "@/components/shared/Button";
import SocialModule from "@/components/ui/SocialModule";
import useLogin from "@/hooks/useLogin";
import { Eye, EyeOff } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
export const passwordRegex =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

const page = () => {
  const {
    t,
    email,
    setEmail,
    password,
    setPassword,
    validEmail,
    setValidEmail,
    validPassword,
    setValidPassword,
    passwordMessage,
    setPasswordMessage,
    emailMessage,
    setEmailMessage,
    showPassword,
    setShowPassword,
    handleEmailChange,
    handlePasswordChange,
    handleBlurPassword,
    handleBlurEmail,
    handleSubmit,
    googleLogin,
    data,
    loading,
    error,
    popUp,
    googleRegisterButton,
    setPopUp,
  } = useLogin();

  return (
    <div className="login w-full min-h-screen ">
      <div className="conatiner grid place-items-center min-h-screen w-full">
        <form
          action=""
          className="auth-screen bg-white  p-10 rounded-4xl w-full max-w-162.5"
          onSubmit={(e) => {
            e.preventDefault();

            handleSubmit(e);
          }}
        >
          <h1 className="text-[25px] font-semibold mb-3">
            {t("existingHeading")}
          </h1>
          <p className="text-base">
            {t("noAccount")}
            <Link href="/auth/sign-up" className="text-primary font-semibold">
              {" "}
              {t("joinButton")}
            </Link>
          </p>
          <div className="my-5 ">
            <label htmlFor="email" className="label-block">
              {t("emailLabel")}
            </label>
            <input
              type="email"
              id="email"
              className={`input-field  ${!validEmail ? "border-red-600 focus:border-red-600" : "focus:border-primary"}`}
              onChange={(e) => handleEmailChange(e)}
              value={email}
              onBlur={handleBlurEmail}
            />
            <p className="text-red-600 text-sm mt-1 ">{emailMessage}</p>
          </div>
          <div className="my-5 ">
            <label htmlFor="password" className="label-block">
              {t("passwordLabel")}
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                className={`input-field  ${!validPassword ? "border-red-600 focus:border-red-600" : "focus:border-primary"}`}
                onChange={(e) => handlePasswordChange(e)}
                value={password}
                onBlur={handleBlurPassword}
              />
              <Eye
                className={` absolute top-1/2 -translate-y-1/2 end-3.75 duration-200 cursor-pointer hover:text-black/50 ${showPassword ? "hidden" : "block"}`}
                onClick={() => setShowPassword(true)}
              />
              <EyeOff
                className={` absolute top-1/2 -translate-y-1/2 end-3.75 duration-200 cursor-pointer hover:text-black/50  ${showPassword ? "block" : "hidden"}`}
                onClick={() => setShowPassword(false)}
              />
            </div>
            <p className="text-red-600 text-sm mt-1">{passwordMessage}</p>
          </div>
          <Link
            href="/auth/forget-password"
            className="font-semibold text-sm cursor-pointer"
          >
            {t("forgotPassword")}
          </Link>
          <Button
            text={t("signInButton")}
            className="w-full mt-5 hover:bg-primary/50 bg-primary"
            type="submit"
          />
          <Button
            onClick={googleLogin}
            text={t("googleButton")}
            className="w-full mt-5 hover:bg-gray-200/50 bg-gray-200 text-black"
            type="button"
            svgElement={
              <svg
                viewBox="0 0 256 262"
                xmlns="http://www.w3.org/2000/svg"
                className="inline-block me-2 size-5"
                preserveAspectRatio="xMidYMid meet"
              >
                <path
                  fill="#4285F4"
                  d="M255.878 133.451c0-10.734-.871-18.567-2.756-26.69H130.55v48.448h71.947c-1.45 12.04-9.283 30.172-26.69 42.356l-.244 1.622l38.755 30.023l2.685.268c24.659-22.774 38.875-56.282 38.875-96.027"
                />
                <path
                  fill="#34A853"
                  d="M130.55 261.1c35.248 0 64.839-11.605 86.453-31.622l-41.196-31.913c-11.024 7.688-25.82 13.055-45.257 13.055c-34.523 0-63.824-22.773-74.269-54.25l-1.531.13l-40.298 31.187l-.527 1.465C35.393 231.798 79.49 261.1 130.55 261.1"
                />
                <path
                  fill="#FBBC05"
                  d="M56.281 156.37c-2.756-8.123-4.351-16.827-4.351-25.82c0-8.994 1.595-17.697 4.206-25.82l-.073-1.73L15.26 71.312l-1.335.635C5.077 89.644 0 109.517 0 130.55s5.077 40.905 13.925 58.602z"
                />
                <path
                  fill="#EB4335"
                  d="M130.55 50.479c24.514 0 41.05 10.589 50.479 19.438l36.844-35.974C195.245 12.91 165.798 0 130.55 0C79.49 0 35.393 29.301 13.925 71.947l42.211 32.783c10.59-31.477 39.891-54.251 74.414-54.251"
                />
              </svg>
            }
          />
          <Button
            text={t("appleButton")}
            className="w-full mt-5 hover:bg-gray-200/50 bg-gray-200 text-black"
            type="button"
            svgElement={
              <svg
                viewBox="0 0 384 512"
                xmlns="http://www.w3.org/2000/svg"
                className="inline-block me-2 size-6"
                fill="#000000"
              >
                <path d="M318.7 268.7c-.2-36.7 16.4-64.4 50-84.8-18.8-26.9-47.2-41.7-84.7-44.6-35.5-2.8-74.3 20.7-88.5 20.7-15 0-49.4-19.7-76.4-19.7C63.3 141.2 4 184.8 4 273.5q0 39.3 14.4 81.2c12.8 36.7 59 126.7 107.2 125.2 25.2-.6 43-17.9 75.8-17.9 31.8 0 48.3 17.9 76.4 17.9 48.6-.7 90.4-82.5 102.6-119.3-65.2-30.7-61.7-90-61.7-91.9zm-56.6-164.2c27.3-32.4 24.8-61.9 24-72.5-24.1 1.4-52 16.4-67.9 34.9-17.5 19.8-27.8 44.3-25.6 71.9 26.1 2 49.9-11.4 69.5-34.3z" />
              </svg>
            }
          />
        </form>
      </div>
      {popUp.show && (
        <SocialModule
          popUp={popUp}
          setPopUp={setPopUp}
          googleRegisterButton={googleRegisterButton}
        />
      )}
    </div>
  );
};

export default page;
