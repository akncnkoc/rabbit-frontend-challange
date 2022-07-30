import { FC } from "react";
import { Link } from "react-router-dom";

const NotFound: FC = () => {
  return (
    <div className="w-full fill-in-page flex items-center justify-center">
      <h3 className="text-3xl">Page Not Found</h3>
      <Link to="/" className="text-blue-600">Go To Homepage</Link>
    </div>
  );
}

export default NotFound;