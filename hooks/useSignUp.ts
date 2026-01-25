import { emailRegex, passwordRegex } from "@/app/[locale]/(auth)/auth/page";
import { REGISTER_MUTATION } from "@/graphql/queries";
import useUserAuth from "@/store/useUserAuth";
import { RegisterResponse, UserLoginResponse } from "@/types/loginResponse";
import { useMutation } from "@apollo/client/react";
import { useTranslations } from "next-intl";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import useSocialAuth from "./useSocialAuth";
import { getDeviceType } from "@/lib/utils";

const useSignUp = () => {
  const t = useTranslations("Auth");

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [validEmail, setValidEmail] = useState(true);
  const [validPassword, setValidPassword] = useState(true);

  const [passwordMessage, setPasswordMessage] = useState("");
  const [emailMessage, setEmailMessage] = useState("");

  const [showPassword, setShowPassword] = useState(false);

  const deviceType = getDeviceType();

  const login = useUserAuth((state) => state.login);
  const router = useRouter();

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
    const message = !e.target.value.length
      ? t("errors.emailRequired")
      : emailRegex.test(e.target.value)
        ? ""
        : t("errors.emailInvalid");

    setEmailMessage(message);
    setValidEmail(emailRegex.test(e.target.value));
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setPassword(value);

    // 1. If empty
    if (!value.length) {
      setValidPassword(false);
      setPasswordMessage(t("errors.passwordRequired"));
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
      setValidPassword(false);
      setPasswordMessage(message);
    } else {
      setValidPassword(true);
      setPasswordMessage("");
    }
  };

  const handleBlurPassword = () => {
    if (password === "") {
      setPasswordMessage(t("errors.passwordRequired"));
    }
  };
  const handleBlurEmail = () => {
    if (email === "") {
      setEmailMessage(t("errors.emailRequired"));
    }
  };

  const [signUpMutation, { data, loading, error }] =
    useMutation<RegisterResponse>(
      REGISTER_MUTATION,

      {
        variables: {
          firstName,
          lastName,
          email,
          password,
          deviceName: "Web Browser",
          device: "DESKTOP",
        },
        onCompleted: (response) => {
          if (response.register.success) {
            setFirstName("");
            setLastName("");
            setEmail("");
            setPassword("");
            console.log("Registration Successful", response);

            login(response.register.data!);
            router.push("/");
          } else {
            console.log("Registration Failed", response.register.message);
          }
        },
        onError: () => console.log("Registration Failed"),
      },
    );

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (
      validEmail &&
      validPassword &&
      password.length &&
      email.length &&
      firstName.length &&
      lastName.length
    ) {
      {
        signUpMutation();
      }
    }
  };

  const { googleLogin, popUp, googleRegisterButton, setPopUp } = useSocialAuth({
    email,
    password,
    deviceType,
  });

  return {
    t,
    firstName,
    setFirstName,
    lastName,
    setLastName,
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
    data,
    loading,
    error,
    googleLogin,
    popUp,
    googleRegisterButton,
    setPopUp,
  };
};

export default useSignUp;
