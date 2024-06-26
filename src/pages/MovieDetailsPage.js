/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  Container,
  CircularProgress,
  Alert,
  Grid,
  Typography,
  Button,
  IconButton,
  Chip,
  Box,
} from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";
import SaveIcon from "@mui/icons-material/Save";
import tmdbApi from "../api/tmbd.js";
import moment from "moment";
import { useGlobalContext } from "../context/GlobalState.js";

const MovieDetailsPage = () => {
  const { state, dispatch } = useGlobalContext();
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchMovieDetails = async () => {
      try {
        const response = await tmdbApi.get(`/movie/${id}`);
        console.log("cek response", response);
        setMovie(response.data);
        setLoading(false);
      } catch (error) {
        setError("Failed to fetch movie details. Please try again later.");
        setLoading(false);
      }
    };

    fetchMovieDetails();
  }, [id]);

  if (loading) {
    return (
      <Container>
        <CircularProgress />
      </Container>
    );
  }

  if (error) {
    return (
      <Container>
        <Alert severity="error">{error}</Alert>
      </Container>
    );
  }

  if (!movie) {
    return (
      <Container>
        <Typography variant="h4">Movie not found</Typography>
      </Container>
    );
  }

  const formattedDate = moment(movie.release_date).format("DD/MM/YYYY");

  const handleAddToFavorites = (movie) => {
    dispatch({ type: "ADD_TO_FAVORITES", payload: movie });
  };

  const handleAddToWatchlist = (movie) => {
    dispatch({ type: "ADD_TO_WATCHLIST", payload: movie });
  };

  return (
    <Container>
      <Grid container spacing={4}>
        <Grid item xs={12} sm={6}>
          <img
            src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
            alt={movie.title}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <Typography variant="h2">{movie.title}</Typography>
          <Box sx={{ display: "flex" }}>
            <Typography variant="subtitle1">{formattedDate}</Typography>
            {movie.genres && movie.genres.length > 0 && (
              <div>
                {movie.genres.map((genre) => (
                  <Chip key={genre.id} label={genre.name} />
                ))}
              </div>
            )}
          </Box>
          <Box>
            <Button onClick={() => handleAddToFavorites(movie)}>
              <FavoriteIcon sx={{ color: "#fff" }} />
            </Button>
            <Button onClick={() => handleAddToWatchlist(movie)}>
              <SaveIcon sx={{ color: "#fff" }} />
            </Button>
          </Box>
          <Typography variant="body1">{movie.tagline}</Typography>
          <Typography variant="h5">Overview</Typography>
          <Typography variant="body1">{movie.overview}</Typography>

          <div></div>
        </Grid>
      </Grid>
    </Container>
  );
};

export default MovieDetailsPage;
