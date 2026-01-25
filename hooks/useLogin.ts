import { useTranslations } from "next-intl";
import { useState } from "react";
import { getDeviceType } from "@/lib/utils";
import { emailRegex, passwordRegex } from "@/app/[locale]/(auth)/auth/page";
import { LOGIN_MUTATION } from "@/graphql/queries";
import { useMutation } from "@apollo/client/react";
import useSocialAuth from "./useSocialAuth";
import { UserLoginResponse } from "@/types/loginResponse";
import useUserAuth from "@/store/useUserAuth";
import { useRouter } from "next/navigation";

const useLogin = () => {
  const router = useRouter();

  const t = useTranslations("Auth");

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [validEmail, setValidEmail] = useState(true);
  const [validPassword, setValidPassword] = useState(true);

  const [passwordMessage, setPasswordMessage] = useState("");
  const [emailMessage, setEmailMessage] = useState("");

  const [showPassword, setShowPassword] = useState(false);

  const deviceType = getDeviceType();

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

    if (!value.length) {
      setValidPassword(false);
      setPasswordMessage(t("errors.passwordRequired"));
      return;
    }

    const message = !e.target.value.length
      ? t("errors.passwordRequired")
      : passwordRegex.test(e.target.value)
        ? ""
        : t("errors.passwordInvalid");

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

  const [loginMutation, { data, loading, error }] =
    useMutation<UserLoginResponse>(LOGIN_MUTATION, {
      variables: {
        email,
        password,
        deviceType,
        deviceName: "Web Browser",
      },

      onCompleted: (response) => {
        if (response.userLogin.success) {
          console.log("Login successful:", response);
          console.log("Token:", response.userLogin.data?.token);

          const loginStore = useUserAuth.getState().login;
          loginStore(response.userLogin.data!);
          router.push("/");
        } else {
          console.log("Login failed:", response.userLogin.message);
        }
      },
      onError: (err) => {
        console.error("Login error:", err);
      },
    });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (
      validEmail &&
      validPassword &&
      email.length > 0 &&
      password.length > 0
    ) {
      loginMutation();
    }
  };

  const { googleLogin, popUp, googleRegisterButton, setPopUp } = useSocialAuth({
    email,
    password,
    deviceType,
  });

  return {
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
  };
};

export default useLogin;
