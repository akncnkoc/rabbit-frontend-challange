import { FC } from "react";

const About: FC = () => {
  return (
    <div className="flex flex-1 items-center justify-center bg-blue-100">
      <h1>
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
