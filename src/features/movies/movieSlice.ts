import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "../../store";

export type MovieType = {
  id: number;
  poster_path?: string;
  backdrop_path?: string;
  adult: boolean;
  overview?: string;
  title: string;
  genres: Array<{
    id: number;
    name: string;
  }>;
  budget: number;
  popularity: number;
  release_date: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
  revenue: number;
  runtime: number;
  production_companies?: Array<{
    id: number;
    logo_path?: string;
    name: string;
  }>;
};
type MovieCreditsType = {
  cast: Array<{
    gender: number;
    known_for_department: string;
    name: string;
    profile_path: string;
    character: string;
  }>;
  crew: Array<{
    gender: number;
    known_for_department: string;
    name: string;
    profile_path: string;
    character: string;
  }>;
};
const initialState: {
  movie: MovieType | null;
  movieCredits: MovieCreditsType | null;
  loading: boolean;
  error: string;
} = {
  movie: null,
  movieCredits: null,
  loading: false,
  error: "",
};

export const fetchMovie = createAsyncThunk(
  "movies/fetch-movie",
  async (params: any, thunkAPI) => {
    const { id, lang } = params;
    const response = await fetch(
      import.meta.env.VITE_API_URL +
        `/movie/${id}?api_key=` +
        import.meta.env.VITE_API_V3_KEY +
        `&language=${lang}`
    );
    return (await response.json()) || ({} as MovieType);
  }
);
export const fetchMovieCredits = createAsyncThunk(
  "movies/fetch-credits",
  async (params: any, thunkAPI) => {
    const { id, lang } = params;
    const response = await fetch(
      import.meta.env.VITE_API_URL +
        `/movie/${id}/credits?api_key=` +
        import.meta.env.VITE_API_V3_KEY +
        `&language=${lang}`
    );
    return (await response.json()) || ({} as MovieType);
  }
);

export const MovieSlice = createSlice({
  name: "movie",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchMovie.pending, (state, action) => {
      state.loading = true;
      state.error = "";
    });
    builder.addCase(fetchMovie.fulfilled, (state, action) => {
      state.movie = action.payload;
      state.loading = false;
    });
    builder.addCase(fetchMovie.rejected, (state, action) => {
      state.loading = false;
      state.error = "Could'nt fetch movie";
    });
    builder.addCase(fetchMovieCredits.pending, (state, action) => {
      state.loading = true;
      state.error = "";
    });
    builder.addCase(fetchMovieCredits.fulfilled, (state, action) => {
      state.movieCredits = action.payload;
      state.loading = false;
    });
    builder.addCase(fetchMovieCredits.rejected, (state, action) => {
      state.loading = false;
      state.error = "Could'nt fetch movie credits";
    });
  },
});

export default MovieSlice.reducer;
