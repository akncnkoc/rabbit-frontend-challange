import { FC } from "react";

const FullPageLoader: FC = () => {
  return (
    <div className="flex flex-1 items-center justify-center">
      <svg
        version="1.1"
        id="L3"
        xmlns="http://www.w3.org/2000/svg"
        x="0px"
        y="0px"
        viewBox="0 0 100 100"
        enableBackground="new 0 0 0 0"
        style={{ width: "100px", height: "100px" }}
      >
        <circle
          className="stroke-black"
          fill="none"
          strokeWidth="3"
          cx="50"
          cy="50"
          r="44"
          style={{ opacity: "0.5" }}
        />
        <circle
          fill="#fff"
          className="stroke-gray-500"
          strokeWidth="3"
          cx="8"
          cy="54"
          r="6"
        >
          <animateTransform
            attributeName="transform"
            dur="1s"
            type="rotate"
            from="0 50 48"
            to="360 50 52"
            repeatCount="indefinite"
          />
        </circle>
      </svg>
    </div>
  );
};
export default FullPageLoader;
