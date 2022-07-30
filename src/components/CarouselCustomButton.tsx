import { FC } from "react";
import {
  MdOutlineArrowBackIos,
  MdOutlineArrowForwardIos,
} from "react-icons/md";
export const CarouselCustomButton: FC<
  React.DetailedHTMLProps<
    React.ButtonHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
  >
> = (props) => {
  return <button {...props}>{props.children}</button>;
};

export const CarouselCustomButtonGroup = ({ next, previous }: any) => {
  return (
    <div className="carousel-button-group">
      <CarouselCustomButton
        onClick={() => previous()}
        className="absolute left-8 bg-gray-200 w-16 h-16 rounded-full flex items-center justify-center hover:bg-gray-300 transition-colors"
      >
        <MdOutlineArrowBackIos size="18" className="relative" />
      </CarouselCustomButton>
      <CarouselCustomButton
        onClick={() => next()}
        className="absolute right-8 bg-gray-200 w-16 h-16 rounded-full flex items-center justify-center hover:bg-gray-300 transition-colors"
      >
        <MdOutlineArrowForwardIos size="18" className="relative" />
      </CarouselCustomButton>
    </div>
  );
};
