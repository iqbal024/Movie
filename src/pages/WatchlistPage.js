import React from "react";
import {
  Container,
  Typography,
  Grid,
  Card,
  CardMedia,
  CardContent,
} from "@mui/material";
import { useGlobalContext } from "../context/GlobalState";

const WatchlistPage = () => {
  const { state } = useGlobalContext();
  const { watchlist } = state;

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Watchlist
      </Typography>
      <Grid container spacing={2}>
        {watchlist.map((movie) => (
          <Grid item xs={12} sm={6} md={4} key={movie.id}>
            <Card>
              <CardMedia
                component="img"
                height="300"
                image={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
                alt={movie.title}
              />
              <CardContent>
                <Typography variant="h6" sx={{ color: "#000" }}>
                  {movie.title}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default WatchlistPage;
