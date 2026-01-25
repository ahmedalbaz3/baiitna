"use client";
import { useTranslations } from "next-intl";
import React, { useEffect, useRef, useState } from "react";
import { emailRegex, passwordRegex } from "../page";
import Button from "@/components/shared/Button";
import { useMutation } from "@apollo/client/react";
import {
  CHANGE_PASSWORD_MUTATION,
  CODE_VERIFICATION_MUTATION,
  FORGOT_PASSWORD_MUTATION,
} from "@/graphql/queries";
import Link from "next/link";
import OTPCheck from "@/components/ui/OTP/OTPCheck";

const Page = () => {
  const t = useTranslations("Auth");

  const [formState, setFormState] = useState({
    email: { value: "", error: "", isValid: true },
    password: { value: "", error: "", isValid: true },
    confirmPassword: { value: "", error: "", isValid: true },
  });
  const [codeSent, setCodeSent] = useState(false);
  const [code, setCode] = useState(new Array(4).fill(""));
  const [codeVerified, setCodeVerified] = useState(false);
  const [remainTime, setRemainTime] = useState(0);

  // Timer Logic
  useEffect(() => {
    if (remainTime > 0 && !codeVerified) {
      const timer = setInterval(() => {
        setRemainTime((prev) => prev - 1);
      }, 1000);
      return () => clearInterval(timer);
    }
  }, [remainTime, codeVerified]);

  // Email Validation Helpers
  const validateEmail = (val: string) => {
    if (!val.length) return t("errors.emailRequired");
    if (!emailRegex.test(val)) return t("errors.emailInvalid");
    return "";
  };

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setFormState((prev) => ({
      ...prev,
      email: { ...prev.email, value: val },
    }));
    const msg = validateEmail(val);
    setFormState((prev) => ({
      ...prev,
      email: { ...prev.email, error: msg, isValid: msg === "" },
    }));
  };

  const handleBlurEmail = () => {
    if (!formState.email.value)
      setFormState((prev) => ({
        ...prev,
        email: {
          ...prev.email,
          error: t("errors.emailRequired"),
          isValid: false,
        },
      }));
  };

  // Mutations
  const [getCode, { loading: sendingCode }] = useMutation(
    FORGOT_PASSWORD_MUTATION,
    {
      variables: { email: formState.email.value },
      onCompleted: (data) => {
        const resCode = data.sendVerificationCode.code;
        if (resCode === 1204) {
          alert("Email not found in our records.");
        } else if (resCode === 200) {
          setCodeSent(true);
          setRemainTime(60);
        } else {
          alert("Unexpected error occurred.");
        }
      },
      onError: (error) => alert("Error: " + error.message),
    },
  );

  const [verifyCode] = useMutation(CODE_VERIFICATION_MUTATION, {
    variables: {
      email: formState.email.value,
      verificationCode: code.join(""),
    },
    onCompleted: (data) => {
      console.log(data);
      if (data.verifyForgetPasswordCode.code === 200) {
        setCodeVerified(true);
        alert("Code verified! You can now reset your password.");
      }
    },
  });

  // Handlers
  const handleSendCode = () => {
    const msg = validateEmail(formState.email.value);
    if (msg) {
      setFormState((prev) => ({
        ...prev,
        email: { ...prev.email, error: msg, isValid: false },
      }));
      return;
    }
    getCode();
  };

  const handleVerifyCode = () => {
    if (code.join("").length < 4) {
      alert("Please enter the complete 4-digit code.");
      return;
    }
    verifyCode();
  };

  // const handleChange = (
  //   e: React.ChangeEvent<HTMLInputElement>,
  //   index: number,
  // ) => {
  //   const val = e.target.value.replace(/[^0-9]/g, ""); // Only numbers
  //   const newValues = [...code];
  //   newValues[index] = val.slice(-1);
  //   setCode(newValues);

  //   if (val && index < 3) {
  //     inputRefs.current[index + 1]?.focus();
  //   }
  // };

  // const handleKeyDown = (
  //   e: React.KeyboardEvent<HTMLInputElement>,
  //   index: number,
  // ) => {
  //   if (e.key === "Backspace" && !code[index] && index > 0) {
  //     inputRefs.current[index - 1]?.focus();
  //   }
  // };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setFormState((prev) => ({
      ...prev,
      password: { ...prev.password, value: value },
    }));

    // 1. If empty
    if (!value.length) {
      setFormState((prev) => ({
        ...prev,
        password: {
          ...prev.password,
          error: t("errors.passwordRequired"),
          isValid: false,
        },
      }));
      return;
    }

    // 2. Check each requirement one by one
    const message = !e.target.value.length
      ? t("errors.passwordRequired")
      : passwordRegex.test(e.target.value)
        ? ""
        : t("errors.passwordInvalid");

    // 3. Update state
    if (message) {
      setFormState((prev) => ({
        ...prev,
        password: {
          ...prev.password,
          error: message,
          isValid: false,
        },
      }));
    } else {
      setFormState((prev) => ({
        ...prev,
        password: {
          ...prev.password,
          error: "",
          isValid: true,
        },
      }));
    }
  };

  const handleBlurPassword = () => {
    if (formState.password.value === "") {
      setFormState((prev) => ({
        ...prev,
        password: {
          ...prev.password,
          error: t("errors.passwordRequired"),
          isValid: false,
        },
      }));
    }
  };

  const handleConfirmPasswordChange = (
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setFormState((prev) => ({
      ...prev,
      confirmPassword: {
        ...prev.confirmPassword,
        value: e.target.value,
      },
    }));
    if (e.target.value !== formState.password.value) {
      setFormState((prev) => ({
        ...prev,
        confirmPassword: {
          ...prev.confirmPassword,
          error: "Passwords do not match.",
          isValid: false,
        },
      }));
    } else {
      setFormState((prev) => ({
        ...prev,
        confirmPassword: {
          ...prev.confirmPassword,
          error: "",
          isValid: true,
        },
      }));
    }
  };

  const handleBlurConfirmPassword = () => {
    if (formState.confirmPassword.value === "") {
      setFormState((prev) => ({
        ...prev,
        confirmPassword: {
          ...prev.confirmPassword,
          error: "Please confirm your password.",
          isValid: false,
        },
      }));
    } else if (formState.confirmPassword.value !== formState.password.value) {
      setFormState((prev) => ({
        ...prev,
        confirmPassword: {
          ...prev.confirmPassword,
          error: "Passwords do not match.",
          isValid: false,
        },
      }));
    }
  };

  // Helper for Digital Clock Format
  const formatTime = (time: number) => {
    const mins = Math.floor(time / 60)
      .toString()
      .padStart(2, "0");
    const secs = (time % 60).toString().padStart(2, "0");
    return `${mins}:${secs}`;
  };

  const [submitChangePassword] = useMutation(CHANGE_PASSWORD_MUTATION, {
    variables: {
      email: formState.email.value,
      newPassword: formState.password.value,
      confirmPassword: formState.confirmPassword.value,
      code: code.join(""),
    },
    onCompleted: (data) => {
      console.log(data);
      if (data.changePassword.code === 200) {
        alert("Password changed successfully! You can now log in.");
        // Optionally redirect to login page
      } else {
        alert("Error changing password: " + data.changePassword.message);
      }
    },
    onError: (error) => alert("Error: " + error.message),
  });

  return (
    <div className="login w-full min-h-screen ">
      <div className="conatiner grid place-items-center min-h-screen w-full">
        <form
          className="auth-screen bg-white p-10 rounded-4xl w-full max-w-162.5"
          onSubmit={(e) => {
            e.preventDefault();
            codeSent ? handleVerifyCode() : handleSendCode();
          }}
        >
          <h1 className="text-[25px] font-semibold mb-3">
            {codeSent && !codeVerified
              ? "Check your email inbox"
              : !codeVerified
                ? "Forgot your password?"
                : "Reset your password"}
          </h1>

          <p className="text-base">
            {codeSent && !codeVerified ? (
              <>
                We’ve sent an email to{" "}
                <span className="font-semibold">{formState.email.value}</span>{" "}
                containing a 4-digit code. Please check your email inbox and
                enter the verification code below.
              </>
            ) : !codeVerified ? (
              "Enter the email address you used when you signed up for baiitna. We will send a verification code to this email so you can reset your password."
            ) : (
              ""
            )}
          </p>

          <div className={`my-5 ${codeSent ? "hidden" : ""}`}>
            <label htmlFor="email" className="label-block">
              {t("emailLabel")}
            </label>
            <input
              type="email"
              id="email"
              className={`input-field ${!formState.email.isValid ? "border-red-600" : "focus:border-primary"}`}
              onChange={handleEmailChange}
              value={formState.email.value}
              onBlur={handleBlurEmail}
            />
            <p className="text-red-600 text-sm mt-1">{formState.email.error}</p>
          </div>

          {codeSent && !codeVerified && (
            <OTPCheck code={code} setCode={setCode} />
          )}

          <div className={`my-5 ${codeVerified ? "" : "hidden"}`}>
            <div className="">
              <label htmlFor="password" className="label-block">
                {"New Password"}
              </label>
              <input
                type="password"
                id="password"
                className={`input-field ${!formState.password.isValid ? "border-red-600" : "focus:border-primary"}`}
                onChange={handlePasswordChange}
                value={formState.password.value}
                onBlur={handleBlurPassword}
              />
              <p className="text-red-600 text-sm mt-1">
                {formState.password.error}
              </p>
            </div>
            <div className="">
              <label htmlFor="confirmPassword" className="label-block">
                {"Confirm Password"}
              </label>
              <input
                type="password"
                id="confirmPassword"
                className={`input-field ${!formState.confirmPassword.isValid ? "border-red-600" : "focus:border-primary"}`}
                onChange={handleConfirmPasswordChange}
                value={formState.confirmPassword.value}
                onBlur={handleBlurConfirmPassword}
              />
              <p className="text-red-600 text-sm mt-1">
                {formState.confirmPassword.error}
              </p>
            </div>
          </div>

          {codeSent && !codeVerified ? (
            <Button
              text="Continue"
              className="w-full mt-5 bg-primary hover:bg-primary/90"
              type="submit"
            />
          ) : !codeVerified ? (
            <Button
              text="Send me code"
              className="w-full mt-5 bg-primary hover:bg-primary/90"
              type="submit"
            />
          ) : (
            <Button
              onClick={() => submitChangePassword()}
              text="Save new password"
              className="w-full mt-5 bg-primary hover:bg-primary/90"
              type="submit"
            />
          )}

          <div className="flex items-center justify-center">
            {codeSent && !codeVerified && (
              <>
                <Button
                  onClick={remainTime === 0 ? handleSendCode : undefined}
                  text="Resend code"
                  className={`mt-5 bg-white ${remainTime > 0 ? "text-gray-400 cursor-default! w-fit" : "text-primary w-full"}`}
                  type="button"
                />
                {remainTime > 0 && (
                  <div className="mt-5 text-primary">
                    in {formatTime(remainTime)}
                  </div>
                )}
              </>
            )}
          </div>

          {!codeSent && (
            <Link href="/auth/">
              <Button
                text="Back to Login"
                className="w-full mt-5 bg-transparent text-black hover:bg-gray-200/50"
                type="button"
              />
            </Link>
          )}
        </form>
      </div>
    </div>
  );
};

export default Page;
