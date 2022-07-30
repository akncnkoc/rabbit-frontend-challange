import { FC, useEffect } from "react";
import { Outlet } from "react-router-dom";
import { setLanguage } from "../features/language/languageSlice";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import Navbar from "./Navbar";

const ViewLayout: FC = (props: any) => {
  const dispatch = useAppDispatch();
  useEffect(() => {
    if (!localStorage.getItem("lang")) dispatch(setLanguage("en"));
    else dispatch(setLanguage(localStorage.getItem("lang")));
  }, []);

  return (
    <div className="bg-gray-50 w-full h-full flex flex-col bg-gradient-to-tr from-slate-200 to-slate-300">
      <Navbar />
      <Outlet />
    </div>
  );
};

export default ViewLayout;
