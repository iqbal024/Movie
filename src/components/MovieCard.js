/* eslint-disable no-unused-vars */
import React from "react";
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  IconButton,
  Box,
} from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";
import SaveIcon from "@mui/icons-material/Save";
import { useGlobalContext } from "../context/GlobalState";
import { Link } from "react-router-dom";

const MovieCard = ({ movie }) => {
  const { state, dispatch } = useGlobalContext();

  const handleAddToFavorites = (movie) => {
    dispatch({ type: "ADD_TO_FAVORITES", payload: movie });
  };

  const handleAddToWatchlist = (movie) => {
    dispatch({ type: "ADD_TO_WATCHLIST", payload: movie });
  };

  return (
    <Box
      sx={{
        minWidth: 200,
        marginRight: 2,
        position: "relative",
        backgroundColor: "#333",
        color: "#fff",
      }}
    >
      <Card sx={{ backgroundColor: "#333" }}>
        <Link to={`/movie/${movie.id}`} style={{ textDecoration: "none" }}>
          <CardMedia
            component="img"
            height="300"
            image={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
            alt={movie.title}
          />
        </Link>
        <CardContent>
          <Typography variant="h6">{movie.title}</Typography>
          <Box
            sx={{
              position: "absolute",
              top: 0,
              right: 0,
              display: "flex",
              flexDirection: "column",
            }}
          >
            <IconButton
              color="primary"
              sx={{
                bgcolor: state.favorites.some((fav) => fav.id === movie.id)
                  ? "#ffffff"
                  : "transparent",
                "&:hover": {
                  bgcolor: state.favorites.some((fav) => fav.id === movie.id)
                    ? "#ffffff"
                    : "transparent",
                },
              }}
              onClick={() => handleAddToFavorites(movie)}
            >
              <FavoriteIcon />
            </IconButton>
            <IconButton
              color="primary"
              sx={{
                bgcolor: state.watchlist.some((wl) => wl.id === movie.id)
                  ? "#ffffff"
                  : "transparent",
                "&:hover": {
                  bgcolor: state.watchlist.some((wl) => wl.id === movie.id)
                    ? "#ffffff"
                    : "transparent",
                },
              }}
              onClick={() => handleAddToWatchlist(movie)}
            >
              <SaveIcon />
            </IconButton>
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
};

export default MovieCard;
