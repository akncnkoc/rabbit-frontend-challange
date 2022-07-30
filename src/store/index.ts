import { configureStore } from "@reduxjs/toolkit";
import languageSlice from "../features/language/languageSlice";
import movieSlice from "../features/movies/movieSlice";
import popularMoviesSlice from "../features/movies/popularMoviesSlice";
import topRatedMovieSlice from "../features/movies/topRatedMovieSlice";

export const store = configureStore({
  reducer: {
    topRatedMovies: topRatedMovieSlice,
    popularMovies: popularMoviesSlice,
    movieSlice: movieSlice,
    languageSlice: languageSlice
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
