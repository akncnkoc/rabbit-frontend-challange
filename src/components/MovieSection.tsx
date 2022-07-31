import { FC } from "react";
import { TopRatedMoviesType } from "../features/movies/topRatedMovieSlice";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { CarouselCustomButtonGroup } from "./CarouselCustomButton";
import { PopularMoviesType } from "../features/movies/popularMoviesSlice";
import Loader from "./SkeletonLoader";
import { useNavigate } from "react-router-dom";
import Stars from "./Stars";
import { truncateString } from "../utils";
type MovieSectionProps = {
  movies: TopRatedMoviesType[] | PopularMoviesType[];
  loading: boolean;
};

const MovieSection: FC<MovieSectionProps & { title: string }> = (props) => {
  const responsiveOpts = {
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 1,
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 1,
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
    },
  };
  const navigate = useNavigate();

  const SingleMovie: FC<TopRatedMoviesType> = (props) => {
    return (
      <div
        className="h-full flex items-center justify-center cursor-pointer"
        onClick={() => navigate("/movie/" + props.id)}
      >
        <div className="relative h-full  rounded-xl overflow-hidden">
          <div className="w-full h-full top-0 left-0 absolute backdrop-blur-[2px]">
            <div className="text-white flex justify-end m-2">
              <Stars
                vote_average={props.vote_average}
                vote_count={props.vote_count}
                horizontal
                size="w-8 h-8"
              />
            </div>
            <div className="flex items-center text-white justify-center h-full absolute top-1/2 transform -translate-y-1/2 w-full">
              <div className="w-full h-12 text-xl text-white flex items-center justify-center bg-black/50">
                {props.title}
              </div>
            </div>
            <div className="flex text-white h-full absolute bottom-0 items-end w-full">
              <div className="w-full text-xl text-white bg-black/50 p-4">
                <p className="text-sm">{truncateString(props.overview || "", 150)}</p>
              </div>
            </div>
          </div>
          <img
            src={import.meta.env.VITE_API_IMAGE_URL + "/" + props.poster_path}
            alt={props.title}
            className="h-[800px] rounded-xl"
          />
        </div>
      </div>
    );
  };

  return (
    <div className="h-full">
      <h3 className="text-3xl text-center">{props.title}</h3>
      {(props.loading && (
        <div className="flex items-center justify-center">
          <Loader />
        </div>
      )) || (
        <Carousel
          responsive={responsiveOpts}
          className="h-full"
          draggable={false}
          showDots={false}
          arrows={false}
          customButtonGroup={<CarouselCustomButtonGroup />}
        >
          {props.movies &&
            props.movies.map((item, index) => (
              <SingleMovie key={index} {...item} />
            ))}
        </Carousel>
      )}
    </div>
  );
};

export default MovieSection;
