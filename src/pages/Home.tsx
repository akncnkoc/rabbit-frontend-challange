import { FC, useEffect } from "react";
import MovieSection from "../components/HomeMovieSection";
import { fetchTopRatedMovies } from "../features/movies/topRatedMovieSlice";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { fetchPopularMovies } from "../features/movies/popularMoviesSlice";
const Home: FC = () => {
  const dispatch = useAppDispatch();
  const topRatedMovieSelector = useAppSelector((store) => store.topRatedMovies);
  const popularMoviesSelector = useAppSelector((store) => store.popularMovies);

  useEffect(() => {
    dispatch(fetchTopRatedMovies());
    dispatch(fetchPopularMovies());
  }, []);

  return (
    <div className="grid grid-cols-2 fill-in-page py-8 overflow-hidden">
      <MovieSection
        title="Top Rated Movies"
        movies={topRatedMovieSelector.movies}
        loading={topRatedMovieSelector.loading && !topRatedMovieSelector.error}
      />
      <MovieSection
        title="Trend Movies"
        movies={popularMoviesSelector.movies}
        loading={popularMoviesSelector.loading && !popularMoviesSelector.error}
      />
    </div>
  );
};

export default Home;
