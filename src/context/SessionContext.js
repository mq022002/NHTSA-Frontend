import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";

export const SessionContext = React.createContext();

export const SessionProvider = ({ children }) => {
  const [session, setSession] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();
  const isProduction = process.env.NEXT_PUBLIC_ENVIRONMENT === "production";

  useEffect(() => {
    const accessToken = localStorage.getItem("accessToken");
    const idToken = localStorage.getItem("idToken");
    const refreshToken = localStorage.getItem("refreshToken");

    // MQ: Please keep these console.log statements for debugging purposes
    // console.log("Access Token:", accessToken);
    // console.log("ID Token:", idToken);
    // console.log("Refresh Token:", refreshToken);

    if (accessToken && idToken && refreshToken) {
      const user = JSON.parse(localStorage.getItem("cognitoUser"));
      setSession({ user });
    } else {
      setSession(null);
    }
    setIsLoading(false);
  }, []);

  const signIn = (accessToken, idToken, refreshToken, user) => {
    localStorage.setItem("accessToken", accessToken);
    localStorage.setItem("idToken", idToken);
    localStorage.setItem("refreshToken", refreshToken);
    localStorage.setItem("cognitoUser", JSON.stringify(user));
    setSession({ user });
    router.replace(isProduction ? "/home.html" : "/home");
  };

  const signOut = () => {
    localStorage.clear();
    setSession(null);
    router.push(isProduction ? "/home.html" : "/home");
  };

  return (
    <SessionContext.Provider
      value={{ session, setSession, signIn, signOut, isLoading }}
    >
      {children}
    </SessionContext.Provider>
  );
};
