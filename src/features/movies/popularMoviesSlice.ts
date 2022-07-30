import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
export type PopularMoviesType = {
  id: number;
  poster_path?: string;
  adult: boolean;
  overview?: string;
  title: string;
};

const initialState: {
  movies: PopularMoviesType[];
  loading: boolean;
  error: string;
} = {
  movies: [],
  loading: false,
  error: "",
};

export const fetchPopularMovies = createAsyncThunk(
  "movies/popular-movies",
  async (content, thunkAPI) => {
    const response = await fetch(
      import.meta.env.VITE_API_URL +
        "/movie/popular?api_key=" +
        import.meta.env.VITE_API_V3_KEY
    );
    return (await response.json()).results || [];
  }
);

export const PopularMovieSlice = createSlice({
  name: "popular-movies",
  initialState,
  reducers: {
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchPopularMovies.pending, (state, action) => {
      state.loading = true;
      state.error = "";
    });
    builder.addCase(fetchPopularMovies.fulfilled, (state, action) => {
      state.movies = state.movies.concat(action.payload);
      state.loading = false;
    });
    builder.addCase(fetchPopularMovies.rejected, (state, action) => {
      state.loading = false;
      state.error = "Could'nt fetch popular movies";
    });
  },
});

export const {} = PopularMovieSlice.actions;

export default PopularMovieSlice.reducer;
