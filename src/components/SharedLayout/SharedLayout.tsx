import React, { Suspense, useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { FaFilm } from "react-icons/fa6";
import { useDataConfigurationTmdb } from "../TmdbConfigurationContext/TmdbConfigurationContext";
import { Loader } from "../Loader/Loader";
import { Footer } from "../Footer/Footer";
import { Navigation } from "../Navigation/Navigation";
import { MobileMenu } from "../MobileMenu/MobileMenu";
import scss from "./SharedLayout.module.scss";

export const SharedLayout: React.FC = () => {
  const { language } = useDataConfigurationTmdb();
  const [windowDimension, setWindowDimension] = useState<number>(0);

  useEffect(() => {
    setWindowDimension(window.innerWidth);
  }, []);

  useEffect(() => {
    function handleResize() {
      setWindowDimension(window.innerWidth);
    }

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const isMobile = windowDimension >= 640;

  return (
    <div className={scss["body-container"]}>
      <header className={scss["header"]}>
        <div className={scss["title"]}>
          <FaFilm color={"rgb(255, 69, 0)"} size={50} />
          <p>{language.pageName}</p>
        </div>
        {isMobile ? <Navigation classNames={scss} /> : <MobileMenu />}
      </header>
      <main className={scss["main"]}>
        <Suspense fallback={<Loader />}>
          <Outlet />
        </Suspense>
      </main>
      <Footer />
      <Toaster position="top-right" reverseOrder={false} />
    </div>
  );
};
