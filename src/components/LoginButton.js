import React from "react";
import { Button } from "@mui/material";
import tmdbApi from "../api/tmbd.js";

const LoginButton = () => {
  const handleLogin = async () => {
    try {
      // Get a request token from TMDB
      const response = await tmdbApi.get("/authentication/token/new");
      const requestToken = response.data.request_token;

      // Open the TMDB login page in a new window
      const width = 600;
      const height = 700;
      const left = (window.innerWidth - width) / 2;
      const top = (window.innerHeight - height) / 2;

      const loginWindow = window.open(
        `https://www.themoviedb.org/authenticate/${requestToken}?redirect_to=${encodeURIComponent(
          window.location.origin + "/auth-callback"
        )}`,
        "tmdb-login",
        `width=${width},height=${height},top=${top},left=${left}`
      );

      // Poll to check if the login window is closed
      const loginInterval = setInterval(() => {
        if (loginWindow.closed) {
          clearInterval(loginInterval);
          window.location.reload(); // Refresh the page to check if the user is logged in
        }
      }, 1000);
    } catch (error) {
      console.error("Error during TMDB login:", error);
    }
  };

  return <Button onClick={handleLogin}>Login with TMDB</Button>;
};

export default LoginButton;
