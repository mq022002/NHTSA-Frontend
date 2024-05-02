import React, { useEffect, useContext } from "react";
import { useRouter } from "next/router";
import { SessionContext } from "../context/SessionContext";

export default function Callback() {
  const router = useRouter();
  const { signIn } = useContext(SessionContext);
  const isProduction = process.env.NEXT_PUBLIC_ENVIRONMENT === "production";

  useEffect(() => {
    const { code } = router.query;

    const user = JSON.parse(localStorage.getItem("cognitoUser"));
    if (user) {
      router.push(isProduction ? "/home.html" : "/home");
      return;
    }

    if (code) {
      const details = {
        grant_type: "authorization_code",
        client_id: "2uanm16gnugk14hr8un5ohk1q5",
        client_secret: process.env.NEXT_PUBLIC_CLIENT_SECRET,
        code,
        redirect_uri: isProduction
          ? "https://maha-hosting-bucket.s3.amazonaws.com/callback.html"
          : "http://localhost:3000/callback",
      };

      const formBody = Object.keys(details)
        .map(
          (key) =>
            encodeURIComponent(key) + "=" + encodeURIComponent(details[key])
        )
        .join("&");

      fetch(
        "https://maha-user-pool.auth.us-east-1.amazoncognito.com/oauth2/token",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8",
          },
          body: formBody,
        }
      )
        .then((response) => {
          if (!response.ok) {
            return response.json().then((data) => {
              if (!isProduction) {
                console.error("Error:", data);
              }
              throw new Error("Failed to exchange code for tokens");
            });
          }
          return response.json();
        })
        .then((data) => {
          const base64Url = data.id_token.split(".")[1];
          const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
          const jsonPayload = decodeURIComponent(
            atob(base64)
              .split("")
              .map(function (c) {
                return "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2);
              })
              .join("")
          );

          const user = JSON.parse(jsonPayload);
          signIn(data.access_token, data.id_token, data.refresh_token, user);
        });
    }
  }, [isProduction, router, router.query, signIn]);

  return <div>Processing...</div>;
}
