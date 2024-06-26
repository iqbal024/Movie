import React from "react";
import { Button } from "@mui/material";
import { loginWithTMDB } from "../services/tmdbAuth";

const LoginButton = () => {
  const handleLogin = async () => {
    try {
      await loginWithTMDB();
    } catch (error) {
      console.error("Login Error:", error);
    }
  };

  return (
    <Button color="inherit" onClick={handleLogin}>
      Login with TMDB
    </Button>
  );
};

export default LoginButton;
