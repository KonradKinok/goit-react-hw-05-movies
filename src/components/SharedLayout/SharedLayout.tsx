import React, { Suspense } from "react";
import { Outlet, NavLink } from "react-router-dom";
import { FaFilm } from "react-icons/fa6";
import { Loader } from "../Loader/Loader";
import { useDataConfigurationTmdb } from "../TmdbConfigurationContext/TmdbConfigurationContext";
import { languageList, en_language, pl_language } from "../Constans/Constans";
import { Footer } from "../Footer/Footer";
import style from "./SharedLayout.module.scss";

export const SharedLayout: React.FC = () => {
    const { language, setLanguage } = useDataConfigurationTmdb();
    
    const changeLanguage = () => {
        const newLanguage = language.language === languageList.ENG ? pl_language : en_language;
        setLanguage(newLanguage);
    };
        
    return (
        <div className={style.bodyContainer}>
            <header className={style.header}>
                <div className={style.title}>
                    <FaFilm color={"rgb(255, 69, 0)"} size={50} />
                    <p>{language.pageName }</p>
                </div>
                <nav>
                    <p className={style["p-language"]} onClick={changeLanguage}>{language.language}</p>
                    <NavLink to="/" className={(navData) => navData.isActive ? style.active : ""}>Home</NavLink>
                    <NavLink to="movies" className={(navData) => navData.isActive ? style.active : ""}>Movies</NavLink>
                </nav>
            </header>
            <main className={style.main}>
                <Suspense fallback={<Loader />}>
                    <Outlet />
                </Suspense>
            </main>
            <Footer/>
        </div>
    );
};