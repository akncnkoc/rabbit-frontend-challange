import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

type GenreType = {
  id: number;
  name: string;
};
type ProductionCompanyType = {
  id: number;
  logo_path?: string;
  name: string;
};
export type MovieType = {
  id: number;
  poster_path?: string;
  backdrop_path?: string;
  adult: boolean;
  overview?: string;
  title: string;
  genres: Array<GenreType>;
  budget: number;
  popularity: number;
  release_date: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
  revenue: number;
  runtime: number;
  production_companies?: Array<ProductionCompanyType>;
};
type CastType = {
  gender: number;
  known_for_department: string;
  name: string;
  profile_path: string;
  character: string;
};
type CrewType = {
  gender: number;
  known_for_department: string;
  name: string;
  profile_path: string;
  character: string;
};
type MovieCreditsType = {
  cast: Array<CastType>;
  crew: Array<CrewType>;
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

    if (response.status != 200)
      return thunkAPI.rejectWithValue("Couldnt fetch movie");
    return (await response.json()) || ({} as MovieType);
  }
);
export const fetchMovieCredits = createAsyncThunk(
  "movies/fetch-movie-credits",
  async (params: any, thunkAPI) => {
    const { id, lang } = params;
    const response = await fetch(
      import.meta.env.VITE_API_URL +
        `/movie/${id}/credits?api_key=` +
        import.meta.env.VITE_API_V3_KEY +
        `&language=${lang}`
    );
    if (response.status !== 200)
      return thunkAPI.rejectWithValue("Couldnt fetch movie credits");
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
