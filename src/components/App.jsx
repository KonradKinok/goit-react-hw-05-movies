import React, { lazy, Suspense } from "react";

import { Routes, Route, NavLink } from "react-router-dom";
import { SharedLayout } from "./SharedLayout/SharedLayout";

const Home = lazy(() => import("../pages/Home/Home").then(module => ({ default: module.Home })));
const Movies = lazy(() => import("../pages/Movies/Movies").then(module => ({ default: module.Movies })));
const MovieDetails = lazy(() => import("../pages/MovieDetails/MovieDetails").then(module => ({ default: module.MovieDetails })));
const NotFound = lazy(() => import("../pages/NotFound/NotFound"));
function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<SharedLayout />}>
          <Route index element={<Home />} />
          <Route path="movies" >
            <Route index element={<Movies />} />
            <Route path=":id" element={<MovieDetails />} />
          </Route>
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>

    </>
  );
}

export default App;
