"use client";
import { GoogleOAuthProvider } from "@react-oauth/google";
import React from "react";

const GoogleProvider = ({ children }: { children: React.ReactNode }) => {
  return (
    <GoogleOAuthProvider clientId="90540072429-k8leu59qkr4lrdp4gi8nakntv906p1d8.apps.googleusercontent.com">
      {children}
    </GoogleOAuthProvider>
  );
};

export default GoogleProvider;
