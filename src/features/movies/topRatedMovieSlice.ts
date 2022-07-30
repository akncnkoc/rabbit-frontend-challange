import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
export type TopRatedMoviesType = {
  id: number
  poster_path?: string
  adult: boolean
  overview?: string
  title: string
}

const initialState: { movies: TopRatedMoviesType[], loading: boolean, error: string } = {
  movies: [],
  loading: false,
  error: ""
}

export const fetchTopRatedMovies = createAsyncThunk(
  'movies/top-rated-movies',
  async (content, thunkAPI) => {
    const response = await fetch(import.meta.env.VITE_API_URL+"/movie/top_rated?api_key="+import.meta.env.VITE_API_V3_KEY) 
    return (await response.json()).results || [];
  }
);

export const topRatedMovieSlice = createSlice({
  name: 'topratedmovies',
  initialState,
  reducers: {
    setLoading: (state, action) => {
      state.loading = action.payload;
    }
  },
  extraReducers: (builder) => {
    builder.addCase(fetchTopRatedMovies.pending, (state, action) => {
      state.loading = true;
      state.error = "";
    })
    builder.addCase(fetchTopRatedMovies.fulfilled, (state, action) => {
      state.movies = state.movies.concat(action.payload);
      state.loading = false;
    })
    builder.addCase(fetchTopRatedMovies.rejected, (state, action) => {
      state.loading = false;
      state.error = "Could'nt fetch top rated movies";
    })
  }
})

export default topRatedMovieSlice.reducer;
