import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./index.css";
import { store } from "./store/index";
import Home from "./pages/Home";
import ViewLayout from "./components/ViewLayout";
import About from "./pages/About";
import NotFound from "./components/NotFound";
import Movie from "./pages/Movie";
ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<ViewLayout />}>
            <Route index element={<Home />}></Route>
            <Route path="/movie/:id" element={<Movie />}></Route>
            <Route path="/about" element={<About />}></Route>
          </Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </Provider>
  </React.StrictMode>
);
