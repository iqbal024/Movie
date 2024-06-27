/* eslint-disable no-unused-vars */
import React from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Menu,
  MenuItem,
  IconButton,
  Box,
} from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import MenuIcon from "@mui/icons-material/Menu";
import { useGlobalContext } from "../context/GlobalState"; // Assuming you have a global context for authentication
import { loginWithTMDB, logout } from "../services/tmdbAuth.js"; // Adjust paths as per your project structure

const Header = () => {
  const { state, dispatch } = useGlobalContext();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const navigate = useNavigate();

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleMenuClick = (path) => {
    navigate(path);
    handleClose();
  };

  const handleLogin = async () => {
    try {
      await loginWithTMDB();
      dispatch({ type: "LOGIN_SUCCESS" });
    } catch (error) {
      console.error("TMDB Login Error:", error);
    }
  };

  const handleLogout = () => {
    dispatch({ type: "LOGOUT" });
    navigate("/");
  };

  return (
    <AppBar position="static">
      <Toolbar>
        <Typography
          variant="h4"
          component={Link}
          to="/"
          style={{ textDecoration: "none", color: "inherit", flexGrow: 1 }}
        >
          C I N E M A
        </Typography>

        <IconButton
          size="large"
          edge="start"
          color="inherit"
          aria-label="menu"
          onClick={handleMenu}
          sx={{ display: { sm: "none" } }}
        >
          <MenuIcon />
        </IconButton>
        <Menu
          id="menu-appbar"
          anchorEl={anchorEl}
          anchorOrigin={{
            vertical: "top",
            horizontal: "right",
          }}
          keepMounted
          transformOrigin={{
            vertical: "top",
            horizontal: "right",
          }}
          open={Boolean(anchorEl)}
          onClose={handleClose}
        >
          <MenuItem onClick={() => handleMenuClick("/favorites")}>
            Favorites
          </MenuItem>
          <MenuItem onClick={() => handleMenuClick("/watchlist")}>
            Watchlist
          </MenuItem>
          {state.isAuthenticated ? (
            <MenuItem onClick={handleLogout}>Logout</MenuItem>
          ) : (
            <MenuItem onClick={handleLogin}>Login</MenuItem>
          )}
        </Menu>
        {/* Show desktop buttons */}
        <Button color="inherit" component={Link} to="/favorites">
          Favorites
        </Button>
        <Button color="inherit" component={Link} to="/watchlist">
          Watchlist
        </Button>
        {state.isAuthenticated ? (
          <Button color="inherit" onClick={handleLogout}>
            Logout
          </Button>
        ) : (
          <Button color="inherit" onClick={handleLogin}>
            Login
          </Button>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Header;
