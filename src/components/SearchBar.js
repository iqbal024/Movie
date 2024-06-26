import React, { useState } from "react";
import {
  TextField,
  Button,
  Container,
  Grid,
  Card,
  CardContent,
  CardMedia,
  Typography,
} from "@mui/material";
import tmdbApi from "../api/tmbd.js";

const SearchBar = () => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);

  const handleSearch = async (e) => {
    e.preventDefault();
    const response = await tmdbApi.get("/search/movie", {
      params: { query },
    });
    setResults(response.data.results);
  };

  return (
    <Container>
      <form onSubmit={handleSearch}>
        <TextField
          label="Search for a movie..."
          variant="outlined"
          fullWidth
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <Button
          type="submit"
          variant="contained"
          color="primary"
          style={{ marginTop: "10px" }}
        >
          Search
        </Button>
      </form>
      <Grid container spacing={2} style={{ marginTop: "20px" }}>
        {results.map((movie) => (
          <Grid item xs={12} sm={6} md={4} key={movie.id}>
            <Card>
              <CardMedia
                component="img"
                height="140"
                image={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
                alt={movie.title}
              />
              <CardContent>
                <Typography variant="h6">{movie.title}</Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default SearchBar;
