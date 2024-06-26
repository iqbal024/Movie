import axios from "axios";

const apiKey = "586ac02b4e476ec73900539deca3d67f"; // Replace with your TMDB API key

const tmdbAuthApi = axios.create({
  baseURL: "https://www.themoviedb.org/authenticate",
  headers: {
    "Content-Type": "application/json",
  },
});

export const loginWithTMDB = async () => {
  try {
    const response = await tmdbAuthApi.get(
      `/authenticate?api_key=${apiKey}&redirect_to=YOUR_REDIRECT_URI`
      // Replace YOUR_REDIRECT_URI with your application's redirect URI
    );
    return response.data; // Example: handle response as needed
  } catch (error) {
    console.error("TMDB Login Error:", error);
    throw error; // Example: handle error or throw to handle in components
  }
};

export const logout = async () => {
  try {
    // Perform logout actions, e.g., clearing session or tokens
    // Example: clear local storage or session storage
    localStorage.removeItem("accessToken"); // Example: remove stored access token
    return true; // Example: indicate successful logout
  } catch (error) {
    console.error("Logout Error:", error);
    throw error; // Example: handle error or throw to handle in components
  }
};
