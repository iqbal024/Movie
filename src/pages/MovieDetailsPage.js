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
} from "@mui/material";
import tmdbApi from "../api/tmbd.js";

const MovieDetailsPage = () => {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchMovieDetails = async () => {
      try {
        const response = await tmdbApi.get(`/movie/${id}`);
        setMovie(response.data);
        setLoading(false);
      } catch (error) {
        setError("Failed to fetch movie details. Please try again later.");
        setLoading(false);
      }
    };

    fetchMovieDetails();
  }, [id]);

  const handleSave = () => {
    // Implement save functionality
  };

  const handleLike = () => {
    // Implement like functionality
  };

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
          <div>
            <Typography variant="subtitle1">
              {new Date(movie.release_date).getFullYear()}
            </Typography>
            <Typography variant="h2">{movie.title}</Typography>
          </div>
          <Typography variant="body1">{movie.overview}</Typography>
          {movie.genres && movie.genres.length > 0 && (
            <div>
              {movie.genres.map((genre) => (
                <Chip key={genre.id} label={genre.name} />
              ))}
            </div>
          )}
          <div>
            <Button variant="outlined" onClick={handleSave}>
              Save Movie
            </Button>
            <IconButton aria-label="like" onClick={handleLike}>
              {/* Add like icon here */}
            </IconButton>
          </div>
        </Grid>
      </Grid>
    </Container>
  );
};

export default MovieDetailsPage;
