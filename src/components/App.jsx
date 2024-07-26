import React, { lazy } from "react";

import { Routes, Route, NavLink } from "react-router-dom";
import { SharedLayout } from "./SharedLayout/SharedLayout";
// import { Home } from "../pages/Home/Home";
import { Movies } from "../pages/Movies/Movies";
const Home = lazy(() => import("../pages/Home/Home"));

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<SharedLayout />}>
          <Route index element={<Home />} />
          <Route path="movies" element={<Movies />}>

          </Route>
        </Route>
      </Routes>
    </>
  );
}

export default App;
