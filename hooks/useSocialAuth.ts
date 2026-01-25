import {
  CHECK_SOCIAL_ACCOUNT_MUTATION,
  GOOGLE_LOGIN_MUTATION,
  GOOGLE_REGISTER_MUTATION,
} from "@/graphql/queries";
import { useLazyQuery, useMutation } from "@apollo/client/react";
import { GoogleUser } from "@/types/googleData";
import { SocialLoginResponse } from "@/types/socialResponse";
import { auth, googleProvider } from "@/lib/firebase";
import { signInWithPopup } from "firebase/auth";
import { CheckSocialResponse } from "@/types/checkSocialResponse";
import { useState } from "react";
import { useRouter } from "next/navigation";
import useUserAuth from "@/store/useUserAuth";

const checkType = {
  register: "REGISTER",
  merge: "MERGE",
};

const useSocialAuth = ({
  email,
  password,
  deviceType,
}: {
  email: string;
  password: string;
  deviceType: string;
}) => {
  const router = useRouter();
  const { login } = useUserAuth();
  const [popUp, setPopUp] = useState({
    show: false,
    type: "",
    data: {
      firstName: "",
      lastName: "",
      email: "",
      providerId: "",
      token: "",
    },
  });

  const [triggerCheckSocial] = useLazyQuery<CheckSocialResponse>(
    CHECK_SOCIAL_ACCOUNT_MUTATION,
  );
  const [googleRegisterMutation] = useMutation<{
    socialRegister: { data: SocialLoginResponse };
  }>(GOOGLE_REGISTER_MUTATION);
  const [googleLoginMutation] = useMutation<SocialLoginResponse>(
    GOOGLE_LOGIN_MUTATION,
  );

  const handleGoogleFlow = async ({
    googleUser,
    accessToken,
  }: {
    googleUser: GoogleUser;
    accessToken: string;
  }) => {
    try {
      // STEP 1: ATTEMPT LOGIN
      const { data: loginData } = await googleLoginMutation({
        variables: {
          providerId: googleUser.providerId,
          device: deviceType,
          deviceName: "Web Browser",
        },
      });

      // User exists - Logic ends here (Backend sho
      // uld return tokens)
      console.log("check first:", loginData);

      if (loginData?.socialLogin.data) {
        console.log("Login Successful:", loginData.socialLogin.data);
        login(loginData.socialLogin.data);
        router.push("/");
        return;
      }

      // STEP 2: USER NOT FOUND, CHECK PROVIDER STATUS
      const { data: checkData } = await triggerCheckSocial({
        variables: {
          providerId: googleUser.providerId,
          email: googleUser.email,
          isManuallyEntered: false,
          token: accessToken,
        },
      });

      console.log(
        "Check Social Provider Result:",
        checkData?.checkSocialProviderStatus.data?.actionRequired,
      );

      if (
        checkData?.checkSocialProviderStatus?.data?.actionRequired ===
        checkType.register
      ) {
        console.log("Proceeding to Registration...");
        setPopUp({
          show: true,
          type: "register",
          data: {
            firstName: googleUser.given_name,
            lastName: googleUser.family_name || "",
            email: googleUser.email,
            providerId: googleUser.providerId,
            token: accessToken,
          },
        });
      } else if (
        checkData?.checkSocialProviderStatus?.data?.actionRequired ===
        checkType.merge
      ) {
        console.log("Account Merge Required - Not Implemented");
        setPopUp({
          show: true,
          type: "merge",
          data: {
            firstName: googleUser.given_name,
            lastName: googleUser.family_name || "",
            email: googleUser.email,
            providerId: googleUser.providerId,
            token: accessToken,
          },
        });
      } else {
        console.log("No action required or unrecognized response.");
      }
    } catch (error) {
      console.error("Social Auth Pipeline Failed:", error);
    }
  };

  const handleFirebaseLogin = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      const user = result.user;
      const oauthIdToken = result["_tokenResponse"].oauthIdToken;
      const providerId =
        JSON.parse(result["_tokenResponse"].rawUserInfo).id ||
        JSON.parse(result["_tokenResponse"].rawUserInfo).sub;

      // Helper to split Firebase displayName safely
      const nameParts = user.displayName?.split(" ") || ["User", ""];

      console.log(user);

      await handleGoogleFlow({
        googleUser: {
          sub: user.uid,
          name: user.displayName || "",
          given_name: nameParts[0],
          family_name: nameParts.slice(1).join(" "),
          picture: user.photoURL || "",
          email: user.email || "",
          email_verified: user.emailVerified,
          locale: "en",
          providerId,
        },
        accessToken: oauthIdToken || "",
      });
    } catch (error) {
      console.error("Firebase Auth Error:", error);
    }
  };

  const googleRegisterButton = async ({
    firstName,
    lastName,
    email,
    providerId,
    accessToken,
  }: {
    firstName: string;
    lastName: string;
    email: string;
    providerId: string;
    accessToken: string;
  }) => {
    const { data: registerData } = await googleRegisterMutation({
      variables: {
        firstName: firstName,
        lastName: lastName,
        email: email,
        providerId: providerId,
        device: deviceType,
        deviceName: "Web Browser",
        isManuallyEntered: false,
        token: accessToken,
      },
    });
    console.log("after register", registerData);
    if (registerData?.socialRegister.data) {
      console.log("Registration Successful:", registerData.socialRegister.data);
      setPopUp({
        show: false,
        type: "",
        data: {
          firstName: "",
          lastName: "",
          email: "",
          providerId: "",
          token: "",
        },
      });
      login(registerData.socialRegister.data);
      router.push("/");
    }
  };

  return {
    googleLogin: handleFirebaseLogin,
    popUp,
    googleRegisterButton,
    setPopUp,
  };
};

export default useSocialAuth;
