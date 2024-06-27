import React, { useEffect, useState } from "react";
import {
  Container,
  Typography,
  Card,
  CardContent,
  CardMedia,
  Box,
  IconButton,
  Alert,
  TextField,
  InputAdornment,
  Button,
} from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";
import SaveIcon from "@mui/icons-material/Save";
import SearchIcon from "@mui/icons-material/Search";
import { Link } from "react-router-dom";
import tmdbApi from "../api/tmbd.js";
import { useGlobalContext } from "../context/GlobalState";
import LoginButton from "../components/LoginButton"; // Import the login button

const HomePage = () => {
  const { state, dispatch } = useGlobalContext();
  const [nowPlaying, setNowPlaying] = useState([]);
  const [topRated, setTopRated] = useState([]);
  const [searchResults, setSearchResults] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const nowPlayingResponse = await tmdbApi.get("/movie/now_playing");
        setNowPlaying(nowPlayingResponse.data.results);

        const topRatedResponse = await tmdbApi.get("/movie/top_rated");
        setTopRated(topRatedResponse.data.results);
      } catch (error) {
        setError(
          "Failed to fetch movies. Please check your API key and try again."
        );
        console.error("Error fetching movies:", error);
      }
    };
    fetchMovies();
  }, []);

  const handleAddToFavorites = (movie) => {
    dispatch({ type: "ADD_TO_FAVORITES", payload: movie });
  };

  const handleAddToWatchlist = (movie) => {
    dispatch({ type: "ADD_TO_WATCHLIST", payload: movie });
  };

  const handleSearch = async (event) => {
    if (event.key === "Enter") {
      try {
        const searchResponse = await tmdbApi.get("/search/movie", {
          params: {
            query: searchQuery,
          },
        });
        setSearchResults(searchResponse.data.results);
      } catch (error) {
        setError("Failed to fetch search results. Please try again later.");
        console.error("Error fetching search results:", error);
      }
    }
  };

  return (
    <Container>
      {error && <Alert severity="error">{error}</Alert>}
      <LoginButton /> {/* Add the login button here */}
      <TextField
        label="Search Movies"
        variant="outlined"
        fullWidth
        sx={{ marginBottom: 4 }}
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        onKeyPress={handleSearch}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <SearchIcon />
            </InputAdornment>
          ),
        }}
      />
      {searchResults.length > 0 && (
        <>
          <Typography variant="h4" gutterBottom>
            Search Results
          </Typography>
          <Box sx={{ overflowX: "scroll", display: "flex" }}>
            {searchResults.map((movie) => (
              <Link
                key={movie.id}
                to={`/movie/${movie.id}`}
                style={{ textDecoration: "none" }}
              >
                <Box
                  sx={{
                    minWidth: 200,
                    marginRight: 2,
                    position: "relative",
                    backgroundColor: "#333",
                  }}
                >
                  <Card sx={{ backgroundColor: "#333" }}>
                    <CardMedia
                      component="img"
                      height="300"
                      image={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
                      alt={movie.title}
                    />
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
                            bgcolor: state.favorites.some(
                              (fav) => fav.id === movie.id
                            )
                              ? "#ffffff"
                              : "transparent",
                            "&:hover": {
                              bgcolor: state.favorites.some(
                                (fav) => fav.id === movie.id
                              )
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
                            bgcolor: state.watchlist.some(
                              (wl) => wl.id === movie.id
                            )
                              ? "#ffffff"
                              : "transparent",
                            "&:hover": {
                              bgcolor: state.watchlist.some(
                                (wl) => wl.id === movie.id
                              )
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
              </Link>
            ))}
          </Box>
        </>
      )}
      <Typography variant="h4" gutterBottom>
        Now Playing
      </Typography>
      <Box sx={{ overflowX: "scroll", display: "flex" }}>
        {nowPlaying.map((movie) => (
          <Link
            key={movie.id}
            to={`/movie/${movie.id}`}
            style={{ textDecoration: "none" }}
          >
            <Box sx={{ minWidth: 200, marginRight: 2, position: "relative" }}>
              <Card sx={{ backgroundColor: "#333" }}>
                <CardMedia
                  component="img"
                  height="300"
                  image={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
                  alt={movie.title}
                />
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
                        bgcolor: state.favorites.some(
                          (fav) => fav.id === movie.id
                        )
                          ? "#ffffff"
                          : "transparent",
                        "&:hover": {
                          bgcolor: state.favorites.some(
                            (fav) => fav.id === movie.id
                          )
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
                        bgcolor: state.watchlist.some(
                          (wl) => wl.id === movie.id
                        )
                          ? "#ffffff"
                          : "transparent",
                        "&:hover": {
                          bgcolor: state.watchlist.some(
                            (wl) => wl.id === movie.id
                          )
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
          </Link>
        ))}
      </Box>
      <Typography variant="h4" gutterBottom>
        Top Rated
      </Typography>
      <Box sx={{ overflowX: "scroll", display: "flex" }}>
        {topRated.map((movie) => (
          <Link
            key={movie.id}
            to={`/movie/${movie.id}`}
            style={{ textDecoration: "none" }}
          >
            <Box sx={{ minWidth: 200, marginRight: 2, position: "relative" }}>
              <Card sx={{ backgroundColor: "#333" }}>
                <CardMedia
                  component="img"
                  height="300"
                  image={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
                  alt={movie.title}
                />
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
                        bgcolor: state.favorites.some(
                          (fav) => fav.id === movie.id
                        )
                          ? "#ffffff"
                          : "transparent",
                        "&:hover": {
                          bgcolor: state.favorites.some(
                            (fav) => fav.id === movie.id
                          )
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
                        bgcolor: state.watchlist.some(
                          (wl) => wl.id === movie.id
                        )
                          ? "#ffffff"
                          : "transparent",
                        "&:hover": {
                          bgcolor: state.watchlist.some(
                            (wl) => wl.id === movie.id
                          )
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
          </Link>
        ))}
      </Box>
    </Container>
  );
};

export default HomePage;
