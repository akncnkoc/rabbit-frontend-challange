import { FC } from "react";
import { TopRatedMoviesType } from "../features/movies/topRatedMovieSlice";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { CarouselCustomButtonGroup } from "./CarouselCustomButton";
import { PopularMoviesType } from "../features/movies/popularMoviesSlice";
import Loader from "./SkeletonLoader";
import { useNavigate } from "react-router-dom";
type HomeMovieSectionProps = {
  movies: TopRatedMoviesType[] | PopularMoviesType[];
  loading: boolean;
};

const HomeMovieSection: FC<HomeMovieSectionProps & { title: string }> = (
  props
) => {
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
        <img
          src={import.meta.env.VITE_API_IMAGE_URL + "/" + props.poster_path}
          alt={props.title}
          className="h-[800px] rounded-xl"
        />
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

export default HomeMovieSection;
