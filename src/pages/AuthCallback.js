import React, { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import tmdbApi from "../api/tmbd.js";
import { useGlobalContext } from "../context/GlobalState";

const AuthCallback = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { dispatch } = useGlobalContext();

  useEffect(() => {
    const handleAuth = async () => {
      const query = new URLSearchParams(location.search);
      const requestToken = query.get("request_token");
      const approved = query.get("approved");

      if (approved === "true") {
        try {
          // Get a session ID using the approved request token
          const sessionResponse = await tmdbApi.post(
            "/authentication/session/new",
            {
              request_token: requestToken,
            }
          );

          const sessionId = sessionResponse.data.session_id;

          // Save the session ID in global state or local storage
          dispatch({ type: "SET_SESSION", payload: sessionId });
          localStorage.setItem("tmdb_session_id", sessionId);

          // Redirect to the home page or any other page
          navigate("/");
        } catch (error) {
          console.error("Error creating session:", error);
        }
      } else {
        console.error("TMDB login was not approved");
      }
    };

    handleAuth();
  }, [location, dispatch, navigate]);

  return <div>Authenticating...</div>;
};

export default AuthCallback;
