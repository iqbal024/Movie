import React, { createContext, useReducer, useContext } from "react";

const initialState = {
  favorites: [],
  watchlist: [],
};

const reducer = (state, action) => {
  switch (action.type) {
    case "ADD_TO_FAVORITES":
      if (!state.favorites.some((movie) => movie.id === action.payload.id)) {
        return { ...state, favorites: [...state.favorites, action.payload] };
      }
      return state;
    case "REMOVE_FROM_FAVORITES":
      return {
        ...state,
        favorites: state.favorites.filter(
          (movie) => movie.id !== action.payload.id
        ),
      };
    case "ADD_TO_WATCHLIST":
      if (!state.watchlist.some((movie) => movie.id === action.payload.id)) {
        return { ...state, watchlist: [...state.watchlist, action.payload] };
      }
      return state;
    case "REMOVE_FROM_WATCHLIST":
      return {
        ...state,
        watchlist: state.watchlist.filter(
          (movie) => movie.id !== action.payload.id
        ),
      };
    default:
      return state;
  }
};

const GlobalContext = createContext();

export const GlobalProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <GlobalContext.Provider value={{ state, dispatch }}>
      {children}
    </GlobalContext.Provider>
  );
};

export const useGlobalContext = () => useContext(GlobalContext);
