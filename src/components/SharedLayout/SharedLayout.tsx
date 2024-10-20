import React, { Suspense, useEffect, useState } from "react";
import { Outlet, NavLink } from "react-router-dom";
import { FaFilm } from "react-icons/fa6";
import { Loader } from "../Loader/Loader";
import { useDataConfigurationTmdb } from "../TmdbConfigurationContext/TmdbConfigurationContext";
import { languageList, en_language, pl_language } from "../Constans/Constans";
import { Footer } from "../Footer/Footer";
import style from "./SharedLayout.module.scss";
import { Navigation } from "../Navigation/Navigation";
import { MobileMenu } from "../MobileMenu/MobileMenu";
import { Toaster } from "react-hot-toast";
export const SharedLayout: React.FC = () => {
  const { language, setLanguage } = useDataConfigurationTmdb();

  const changeLanguage = () => {
    const newLanguage =
      language.language === languageList.ENG ? pl_language : en_language;
    setLanguage(newLanguage);
  };

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
    <div className={style.bodyContainer}>
      <header className={style.header}>
        <div className={style.title}>
          <FaFilm color={"rgb(255, 69, 0)"} size={50} />
          <p>{language.pageName}</p>
        </div>
        {isMobile ? (
          <Navigation classNames={style} />
        ) : (
          // <nav>
          //     <p className={style["p-language"]} onClick={changeLanguage}>{language.language}</p>
          //     <NavLink to="/" className={(navData) => navData.isActive ? style.active : ""}>Home</NavLink>
          //     <NavLink to="movies" className={(navData) => navData.isActive ? style.active : ""}>Movies</NavLink>
          // </nav>):
          <MobileMenu />
        )}
      </header>
      <main className={style.main}>
        <Suspense fallback={<Loader />}>
          <Outlet />
        </Suspense>
      </main>
      <Footer />
      <Toaster position="top-right" reverseOrder={false} />
    </div>
  );
};
