import "react-multi-carousel/lib/styles.css";
import { FC,  useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import FullPageLoader from "../components/FullPageLoader";
import { fetchMovie, fetchMovieCredits } from "../features/movies/movieSlice";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { convertMinsToHrsMins, numberFormat } from "../utils";
import { BsMouse } from "react-icons/bs";

const Movie: FC = () => {
  const params = useParams();
  const dispatch = useAppDispatch();
  const movieSelector = useAppSelector((selector) => selector.movieSlice);
  const languageSelector = useAppSelector((selector) => selector.languageSlice);
  const [creditSection, setCreditSecton] = useState<boolean>(false);
  useEffect(() => {
    if (params.id) {
      dispatch(fetchMovie({ id: params.id, lang: languageSelector.language }));
      dispatch(
        fetchMovieCredits({ id: params.id, lang: languageSelector.language })
      );
    }
  }, [languageSelector.language]);

  useEffect(() => {
    const scrollEvent = function (e: WheelEvent) {
      e.cancelable && e.preventDefault();
      if (e.deltaY !== 0) {
        if (e.deltaY < 0) {
          // wheeled up
          setCreditSecton(false);
        } else {
          // wheeled down
          setCreditSecton(true);
        }
      }
    };
    window.addEventListener("wheel", scrollEvent, { passive: true });
    return () => {
      window.removeEventListener("wheel", scrollEvent);
    };
  }, []);

  const Genre: FC<{ title: string }> = (props) => {
    return (
      <div className="px-3 py-1.5 bg-orange-200 rounded text-xs hover:bg-orange-400 hover:text-white cursor-pointer transition-colors ">
        {props.title}
      </div>
    );
  };
  const MovieBackdrop: FC<{ backdrop_path?: string }> = (props) => {
    return (
      <div
        className="absolute top-0 left-0 w-full h-full"
        style={{
          backgroundImage: `url(${
            import.meta.env.VITE_API_IMAGE_URL +
            "/" +
            (props?.backdrop_path || "")
          })`,
          backgroundSize: "100% 100%",
        }}
      >
        <div className="bg-black/20 backdrop-blur-md h-full w-full"></div>
      </div>
    );
  };

  const MoviePoster: FC<{ title: string; poster_path?: string }> = (props) => {
    return (
      <img
        src={import.meta.env.VITE_API_IMAGE_URL + "/" + props.poster_path}
        alt={props.title}
        className="h-[500px]  shadow-2xl rounded-lg"
      />
    );
  };

  const MovieStars: FC<{ vote_average: number; vote_count: number }> = (
    props
  ) => {
    const [starCount, setStarCount] = useState(1);
    useEffect(() => {
      setStarCount(Math.floor(props.vote_average / 2));
    }, []);
    return (
      <div className="flex items-center">
        {starCount >= 1 &&
          Array.from(Array(starCount).keys()).map((star, index) => (
            <svg
              key={index}
              className="w-5 h-5 text-yellow-400"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
            </svg>
          ))}
        {starCount < 5 &&
          Array.from(Array(5 - starCount).keys()).map((star, index) => (
            <svg
              key={index}
              className="w-5 h-5 text-gray-300 dark:text-gray-500"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
            </svg>
          ))}
      </div>
    );
  };

  if (movieSelector.loading && !movieSelector.error) return <FullPageLoader />;

  return (
    <div className="grid grid-cols-3 flex-1">
      <div className="flex flex-1 justify-center relative">
        {movieSelector.movie?.backdrop_path && (
          <MovieBackdrop backdrop_path={movieSelector.movie?.backdrop_path} />
        )}
        <div className="z-10 flex items-center">
          <div className="relative overflow-hidden">
            {movieSelector.movie?.adult && (
              <div className="absolute text-white top-3 -left-10 bg-red-500 px-4 py-2 transform rotate-[-45deg] w-32 text-center">
                Adult
              </div>
            )}
            {movieSelector.movie?.vote_average && (
              <div className="absolute text-white top-3 -right-10 bg-green-500 px-4 py-2 transform rotate-[45deg] w-32 text-center">
                {movieSelector.movie?.vote_average.toFixed(2)}
              </div>
            )}
            {movieSelector.movie?.release_date && (
              <div className="absolute text-white top-1/2 left-1/2 -translate-x-1/2 -tranlate-y-1/2 bg-black/70 px-4 py-2 transform w-full text-center">
                {movieSelector.movie?.release_date}
              </div>
            )}
            {movieSelector.movie?.poster_path && (
              <MoviePoster
                title={movieSelector.movie.title}
                poster_path={movieSelector.movie.poster_path}
              />
            )}
          </div>
        </div>
      </div>
      {(!creditSection && (
        <div className="col-span-2 flex flex-col justify-center px-16 relative">
          <div className="h-16 w-full">
            <div className="flex items-center justify-between">
              <h3 className="font-medium text-2xl my-8 flex space-x-3">
                <span className="underline underline-offset-1 mr-4">
                  {movieSelector.movie?.title}
                </span>
                ({convertMinsToHrsMins(movieSelector.movie?.runtime || 0)})
                <MovieStars
                  vote_average={movieSelector.movie?.vote_average || 0}
                  vote_count={movieSelector.movie?.vote_count || 0}
                />
              </h3>
              <div className="px-3 py-1.5 bg-green-300 flex space-x-2 items-center rounded">
                <h3 className="font-bold text-sm">{`${numberFormat(
                  movieSelector.movie?.revenue || 0
                )} $`}</h3>
              </div>
            </div>
          </div>
          <div className="flex space-x-2 w-full my-8">
            {(movieSelector.movie?.genres &&
              movieSelector.movie?.genres.map((genre, index) => (
                <Genre key={index} title={genre.name}></Genre>
              ))) || <Genre title={"No Genre"}></Genre>}
          </div>
          <div className="text-lg my-8">{movieSelector.movie?.overview}</div>
          <div className="flex space-x-4">
            {movieSelector.movie?.production_companies &&
              movieSelector.movie?.production_companies.map(
                (company, index) => (
                  <div key={index} className="flex">
                    <div className="flex flex-col items-center space-y-4">
                      <div className="p-2 border-gray-700 shadow-lg w-16 h-16 rounded-full flex items-center justify-center">
                        {(company.logo_path && (
                          <img
                            src={
                              import.meta.env.VITE_API_IMAGE_URL +
                              company.logo_path
                            }
                          />
                        )) || <img src={import.meta.env.VITE_NO_IMAGE} />}
                      </div>
                      <h3 className="font-semibold text-xl">{company.name}</h3>
                    </div>
                  </div>
                )
              )}
          </div>
          <div className="absolute bottom-8 left-0 w-full">
            <div className="w-full flex items-center justify-center animate-bounce">
              <BsMouse size="30" />
            </div>
          </div>
        </div>
      )) || <CreditSection />}
    </div>
  );
};

const CreditSection: FC<{}> = () => {
  const movieSelector = useAppSelector((selector) => selector.movieSlice);
  useEffect(() => {}, []);
  return (
    <div className="col-span-2 flex items-center flex-col p-16 overflow-y-scroll bg-gray-100">
      <h3 className="font-bold text-3xl text-center mb-4 underline underline-offset-1">
        Cast
      </h3>
      <div className="grid grid-cols-4 gap-2">
        {movieSelector.movieCredits?.cast &&
          movieSelector.movieCredits.cast.slice(0, 20).map((cast, index) => (
            <div key={index} className="flex mr-4">
              <div className="w-16 mr-4">
                {(cast.profile_path && (
                  <img
                    src={import.meta.env.VITE_API_IMAGE_URL + cast.profile_path}
                    alt={cast.name}
                    className="h-16 w-16 object-cover rounded-full"
                  />
                )) || (
                  <img
                    src={import.meta.env.VITE_NO_IMAGE}
                    alt={cast.name}
                    className="h-16 w-16 object-cover rounded-full"
                  />
                )}
              </div>
              <div className="flex flex-col space-y-2">
                <h3 className="text-lg font-medium">{cast.name}</h3>
                <span className="text-sm">({cast.character})</span>
              </div>
            </div>
          ))}
      </div>

      <h3 className="font-bold text-3xl text-center mb-4 mt-16 underline underline-offset-1">
        Crew
      </h3>
      <div className="grid grid-cols-4 gap-2 w-full">
        {movieSelector.movieCredits?.crew &&
          movieSelector.movieCredits.crew.slice(0, 20).map((crew, index) => (
            <div key={index} className="flex mr-4">
              <div className="w-16 mr-4">
                {(crew.profile_path && (
                  <img
                    src={import.meta.env.VITE_API_IMAGE_URL + crew.profile_path}
                    alt={crew.name}
                    className="h-16 w-16 object-cover rounded-full"
                  />
                )) || (
                  <img
                    src={import.meta.env.VITE_NO_IMAGE}
                    alt={crew.name}
                    className="h-16 w-16 object-cover rounded-full"
                  />
                )}
              </div>
              <div className="flex flex-col space-y-2">
                <h3 className="text-lg font-medium">{crew.name}</h3>
                <span className="text-sm">({crew.known_for_department})</span>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};
export default Movie;
