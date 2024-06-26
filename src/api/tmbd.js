import axios from "axios";

const apiKey = "586ac02b4e476ec73900539deca3d67f";

const tmdbApi = axios.create({
  baseURL: "https://api.themoviedb.org/3",
  params: {
    api_key: apiKey,
  },
});

export default tmdbApi;
