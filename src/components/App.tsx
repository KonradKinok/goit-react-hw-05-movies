import React, { lazy, Suspense } from "react";
import { Routes, Route } from "react-router-dom";
import { SharedLayout } from "./SharedLayout/SharedLayout";
import { Loader } from "./Loader/Loader";

const Home = lazy(() => import("../pages/Home/Home").then(module => ({ default: module.Home })));
const Movies = lazy(() => import("../pages/Movies/Movies").then(module => ({ default: module.Movies })));
const MovieDetails = lazy(() => import("../pages/MovieDetails/MovieDetails").then(module => ({ default: module.MovieDetails })));
const Cast = lazy(() => import("../pages/Cast/Cast"));
const Reviews = lazy(() => import("../pages/Reviews/Reviews"))
const NotFound = lazy(() => import("../pages/NotFound/NotFound"));

export default function App(): JSX.Element {
  
  return (
    <>
      {/* <Suspense fallback={<Loader />}> */}
        <Routes>
          <Route path="/" element={<SharedLayout />}>
            <Route index element={<Home />} />
            <Route path="movies" >
              <Route index element={<Movies />} />
              <Route path=":id" element={<MovieDetails />}>
                <Route path="cast" element={<Cast />} />
                <Route path="reviews" element={<Reviews />} />
              </Route>
            </Route>
            <Route path="*" element={<Home />} />
          </Route>
        </Routes>
      {/* </Suspense > */}
    </>
  );
};
