import { FC } from "react";

const About: FC = () => {
  return (
    <div className="flex flex-1 items-center justify-center bg-blue-100 flex-col space-y-8">
      <div className="text-xl">
        This project using
        <a href="https://www.themoviedb.org/" target="_blank" className="text-blue-600 italic text-lg">
          THE MOVIE DATABASE API
        </a>, when using app feel free to change language
      </div>
      <h1 className="text-xl">
        This movie project created by{" "}
        <a
          href="https://portfolio-indol-eight-75.vercel.app/"
          className="text-blue-600"
          target="_blank"
        >
          Akın Can Koç 👨‍💻
        </a>
      </h1>
    </div>
  );
};

export default About;
