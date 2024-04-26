import React, { useEffect } from "react";
import { useRouter } from "next/router";

export default function Callback() {
  const router = useRouter();

  useEffect(() => {
    const { code } = router.query;

    const user = JSON.parse(localStorage.getItem("cognitoUser"));
    if (user) {
      router.push("/");
      return;
    }

    if (code) {
      const details = {
        grant_type: "authorization_code",
        client_id: "2uanm16gnugk14hr8un5ohk1q5",
        client_secret: process.env.NEXT_PUBLIC_CLIENT_SECRET,
        code,
        redirect_uri: "http://localhost:3000/callback",
      };

      const formBody = Object.keys(details)
        .map(
          (key) =>
            encodeURIComponent(key) + "=" + encodeURIComponent(details[key])
        )
        .join("&");
      console.log("Request body:", formBody);

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
              console.error("Error:", data);
              throw new Error("Failed to exchange code for tokens");
            });
          }
          return response.json();
        })
        .then((data) => {
          console.log(data);
          localStorage.setItem("accessToken", data.access_token);
          localStorage.setItem("idToken", data.id_token);
          localStorage.setItem("refreshToken", data.refresh_token);

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
          localStorage.setItem("cognitoUser", JSON.stringify(user));

          router.push("/");
        });
    }
  }, [router, router.query]);

  return <div>Processing...</div>;
}
